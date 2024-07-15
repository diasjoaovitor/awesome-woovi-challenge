import { useNavigate } from 'react-router-dom'
import { Layout, PaymentList, TPaymentListProps } from '@/components'
import { TInstallment } from '@/types'
import { usePaymentMethod } from '@/hooks'
import { getBestInstallmentOption, getCashback } from '@/utils'
import * as S from './styles'

export const PaymentMethod = () => {
  const navigate = useNavigate()

  const { alert, installments, isError, isLoading, user } = usePaymentMethod()

  const bestInstallmentOption = getBestInstallmentOption()
  const cashback = getCashback()

  const handleNext = (installment: TInstallment) => {
    navigate('/pix-credit-payment', { state: { installment, user } })
  }

  const paymentListProps: TPaymentListProps = {
    installments,
    bestInstallmentOption,
    cashback,
    handleNext
  }

  return installments.length > 0 ? (
    <Layout
      title={`${user.firstName}, como você quer pagar?`}
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
