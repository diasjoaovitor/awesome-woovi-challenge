import { describe, expect, test, vi } from 'vitest'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { PixCreditPayment } from '@/pages'
import { ThemeProvider } from '@/providers'
import { lightTheme } from '@/themes'
import { memoryRouter } from '../utils'
import { mockedInstallments, mockedUser, PageMock } from '../mocks'

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as object
  return {
    ...actual,
    useLocation: () => ({
      state: {
        installment: mockedInstallments[2],
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
        path: '/pix-credit-payment',
        element: <PixCreditPayment />
      },
      {
        path: '/credit-payment',
        element: <PageMock />
      }
    ],
    {
      initialEntries: ['/pix-credit-payment']
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

describe('<PixCreditPayment />', () => {
  test('should render page correctly', () => {
    const { Component } = setup()
    render(<Component />)
    expect(
      screen.getByRole('heading', {
        name: 'Vitor, pague a entrada de R$ 400,00 pelo Pix',
        level: 1
      })
    ).toBeInTheDocument()
    expect(screen.getByAltText('QRCode Image')).toBeInTheDocument()
    const firstInstallment = screen.getByText('1ª entrada no Pix')
    const stepIcon = within(
      firstInstallment.parentElement?.parentElement as HTMLElement
    ).getByTestId('CircleOutlinedIcon')

    // active step
    expect(stepIcon).toHaveStyle(`color: ${lightTheme.palette.primary.main}`)

    expect(screen.getByText('2ª no cartão')).toBeInTheDocument()
    expect(screen.getByText('3ª no cartão')).toBeInTheDocument()
    expect(screen.getByText('Total: R$ 1.200,00')).toBeInTheDocument()
  })

  test('should select the option and navigate to the next page correctly', async () => {
    const { Component, router } = setup()
    render(<Component />)
    const button = screen.getByRole('button', {
      name: 'Clique para copiar QR CODE'
    })
    fireEvent.click(button)
    expect(screen.getByText('Pix copiado com sucesso!')).toBeInTheDocument()

    // navigate to the next page
    await waitFor(
      () => {
        expect(router.state.location.pathname).toBe('/credit-payment')
      },
      { timeout: 6000 }
    )
    expect(screen.getByText('id: 3')).toBeInTheDocument()
    expect(screen.getByText('quantity: 3')).toBeInTheDocument()
    expect(screen.getByText('total: 1200')).toBeInTheDocument()
  }, 60000)
})
