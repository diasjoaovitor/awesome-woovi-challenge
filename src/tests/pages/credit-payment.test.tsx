import { describe, expect, test, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApprovedPayment, CreditPayment } from '@/pages'
import { ThemeProvider } from '@/providers'
import { lightTheme } from '@/themes'
import { memoryRouter } from '../utils'
import { mockedInstallments, mockedUser } from '../mocks'

const timeout = 1000

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object
  return {
    ...actual,
    useLocation: () => ({
      state: {
        installment: mockedInstallments[3],
        user: mockedUser
      }
    })
  }
})

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn()
  }
})

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/credit-payment',
        element: <CreditPayment />
      },
      {
        path: '/approved-payment',
        element: <ApprovedPayment />
      },
      {
        path: '/',
        element: <></>
      }
    ],
    {
      initialEntries: ['/credit-payment']
    }
  )
  return {
    router,
    Component: () => (
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
  }
}

const getStep = (textContent: string) =>
  within(
    screen.getByText(textContent).parentElement?.parentElement as HTMLElement
  )

const fillForm = async () => {
  await userEvent.type(screen.getByLabelText('Nome Completo'), 'Vitor Santos')
  // valid CPF
  await userEvent.type(screen.getByLabelText('CPF'), '488.832.940-09')
  await userEvent.type(
    screen.getByLabelText('Número do Cartão'),
    '1234 5678 9101 1121'
  )
  await userEvent.type(screen.getByLabelText('Vencimento'), '12/34')
  await userEvent.type(screen.getByLabelText('CVV'), '123')
}

const selectInstallmentOption = ({
  currentOption,
  newOption
}: {
  currentOption: string
  newOption: string
}) => {
  const container = within(screen.getByTestId('installment-select'))

  const option = container.getByText(currentOption)
  fireEvent.mouseDown(option)

  const options = within(screen.getByRole('listbox'))
  fireEvent.click(options.getByText(newOption))
}

describe('<CreditPayment />', () => {
  test('should render the component in its default state', () => {
    const { Component } = setup()
    render(<Component />)
    expect(
      screen.getByRole('heading', {
        name: 'Vitor, pague o restante em 3x no cartão',
        level: 1
      })
    ).toBeInTheDocument()
    const installmentOptionSelected = screen.getByRole('combobox')
    expect(installmentOptionSelected.textContent).toBe('3x de R$ 325,00')

    // completed step
    const pixStep = getStep('1ª entrada no Pix')
    expect(pixStep.getByTestId('CheckCircleIcon')).toBeInTheDocument()

    // active step
    const firstInstallmentStep = getStep('2ª no cartão')
    expect(firstInstallmentStep.getByTestId('CircleOutlinedIcon')).toHaveStyle(
      `color: ${lightTheme.palette.primary.main}`
    )

    // not completed step
    const secondInstallmentStep = getStep('3ª no cartão')
    expect(secondInstallmentStep.getByTestId('CircleOutlinedIcon')).toHaveStyle(
      'color: rgba(0, 0, 0, 0.26)'
    )
  })

  test('should validade the form', async () => {
    vi.setConfig({ testTimeout: 10000 })
    const { Component } = setup()
    render(<Component />)

    const button = screen.getByRole('button', { name: 'Pagar' })

    await userEvent.click(button)
    expect(screen.getByText('Nome completo é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('CPF é obrigatório')).toBeInTheDocument()

    await userEvent.type(
      screen.getByLabelText('Nome Completo'),
      'João Vitor Dias'
    )
    await userEvent.type(screen.getByLabelText('CPF'), '123.456.789-10')
    await userEvent.type(
      screen.getByLabelText('Número do Cartão'),
      '1234 5678 9101 1121'
    )
    await userEvent.type(screen.getByLabelText('Vencimento'), '12/34')
    await userEvent.type(screen.getByLabelText('CVV'), '123')
    await userEvent.click(button)
    expect(screen.getByText('CPF inválido')).toBeInTheDocument()
    expect(
      screen.queryByText('Nome completo é obrigatório')
    ).not.toBeInTheDocument()
  })

  test('should select the installment option and submits the form', async () => {
    const { Component, router } = setup()
    render(<Component />)
    const button = screen.getByRole('button', { name: 'Pagar' })

    // default number of installments
    expect(screen.getAllByTestId('step')).toHaveLength(4)

    await fillForm()
    selectInstallmentOption({
      currentOption: '3x de R$ 325,00',
      newOption: '2x de R$ 487,50'
    })

    expect(screen.getAllByTestId('step')).toHaveLength(3)

    await userEvent.click(button)

    await waitFor(
      () => {
        expect(screen.getByText('1x de R$ 487,50')).toBeInTheDocument()
      },
      { timeout }
    )
    const firstInstallmentStep = getStep('2ª no cartão')
    expect(
      firstInstallmentStep.getByTestId('CheckCircleIcon')
    ).toBeInTheDocument()

    await userEvent.click(button)

    await waitFor(
      () => {
        expect(router.state.location.pathname).toBe('/approved-payment')
      },
      { timeout }
    )
    expect(
      screen.getByRole('heading', {
        name: 'Parabéns! Você realizou o pagamento de todas as parcelas.',
        level: 1
      })
    ).toBeInTheDocument()

    await waitFor(
      () => {
        expect(router.state.location.pathname).toBe('/')
      },
      { timeout: timeout * 3 }
    )
  }, 10000)
})
