import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PaymentMethod } from '@/pages'
import { ThemeProvider } from '@/providers'
import { getInstallments, getUser } from '@/services'
import { lightTheme } from '@/themes'
import { memoryRouter } from '../utils'
import { mockedInstallments, mockedUser, PageMock } from '../mocks'

const timeout = 2100

vi.mock('@/services/installment')
vi.mock('@/services/user')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})

const setup = () => {
  const { Component, router } = memoryRouter(
    [
      {
        path: '/',
        element: <PaymentMethod />
      },
      {
        path: '/pix-credit-payment',
        element: <PageMock />
      }
    ],
    {
      initialEntries: ['/']
    }
  )
  return {
    router,
    Component: () => (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Component />
        </QueryClientProvider>
      </ThemeProvider>
    )
  }
}

const getListItem = (radioInput: HTMLInputElement) =>
  radioInput.parentElement?.parentElement?.parentElement

describe('<PaymentMethod />', () => {
  beforeEach(() => {
    vi.mocked(getUser).mockResolvedValue(mockedUser)
  })

  test('should render message when no data exists', async () => {
    vi.mocked(getInstallments).mockResolvedValueOnce(mockedInstallments)
    const { Component } = setup()
    render(<Component />)
    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', {
            name: 'Não existe nenhum dado para ser exibido',
            level: 1
          })
        ).toBeInTheDocument()
      },
      { timeout }
    )
  })

  test('should render the message when there is an error', async () => {
    vi.mocked(getInstallments).mockRejectedValueOnce(new Error('Error'))
    const { Component } = setup()
    render(<Component />)
    await waitFor(
      () => {
        expect(screen.getByText('Erro ao buscar dados')).toBeInTheDocument()
      },
      { timeout }
    )
    expect(
      screen.getByText('Não foi possível renderizar a tela corretamente')
    ).toBeInTheDocument()
  })

  test('should render page correctly', async () => {
    vi.mocked(getInstallments).mockResolvedValueOnce(mockedInstallments)
    const { Component } = setup()
    render(<Component />)
    await waitFor(
      () => {
        expect(
          screen.getByRole('heading', {
            name: 'Vitor, como você quer pagar?',
            level: 1
          })
        ).toBeInTheDocument()
      },
      { timeout }
    )
    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(mockedInstallments.length)
  })

  test('should select the option and navigate to the next page correctly', async () => {
    vi.mocked(getInstallments).mockResolvedValueOnce(mockedInstallments)
    const { Component, router } = setup()
    render(<Component />)
    let radio: HTMLInputElement | null = null

    await waitFor(
      () => {
        radio = screen.getByRole('radio', { checked: true }) as HTMLInputElement
        // default selected option
        expect(radio.value).toBe('4')
      },
      { timeout }
    )

    const listItem = getListItem(radio!) as HTMLLIElement

    // default selected option with border green
    expect(listItem).toHaveStyle(
      `borderColor: ${lightTheme.palette.primary.main}`
    )

    const listItems = screen.getAllByRole('listitem')
    fireEvent.click(listItems[1])
    radio = screen.getByRole('radio', { checked: true }) as HTMLInputElement

    // new selected option
    expect(radio.value).toBe('2')

    fireEvent.click(screen.getByRole('button', { name: 'avançar' }))

    // navigate to the next page
    expect(router.state.location.pathname).toBe('/pix-credit-payment')
    expect(screen.getByText('id: 2')).toBeInTheDocument()
    expect(screen.getByText('quantity: 2')).toBeInTheDocument()
    expect(screen.getByText('total: 1100')).toBeInTheDocument()
  })
})
