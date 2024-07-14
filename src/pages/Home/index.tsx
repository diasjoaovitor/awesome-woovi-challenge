import { useNavigate } from 'react-router-dom'
import { Layout, PaymentList, TPaymentListProps } from '@/components'
import { TInstallment } from '@/types'
import { useHome } from '@/hooks'
import { getBestInstallmentOption, getCashback } from '@/utils'
import * as S from './styles'

export const Home = () => {
  const navigate = useNavigate()

  const {
    alert,
    installments,
    isError,
    isLoading,
    user: { firstName }
  } = useHome()

  const bestInstallmentOption = getBestInstallmentOption()
  const cashback = getCashback()

  const handleNext = (installment: TInstallment) => {
    navigate('/qr-code', { state: { installment } })
  }

  const paymentListProps: TPaymentListProps = {
    installments,
    bestInstallmentOption,
    cashback,
    handleNext
  }

  return installments.length > 0 ? (
    <Layout
      title={`${firstName}, como você quer pagar?`}
      isError={isError}
      isLoading={isLoading}
      alert={alert}
      sx={S.Wrapper}
    >
      <PaymentList {...paymentListProps} />
    </Layout>
  ) : (
    <Layout
      title={'Não existe nenhum dado para ser exibido'}
      isError={isError}
      isLoading={isLoading}
      alert={alert}
      sx={{ textAlign: 'center' }}
    >
      ...
    </Layout>
  )
}
