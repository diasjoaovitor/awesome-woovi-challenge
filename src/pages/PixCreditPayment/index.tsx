import { Layout, Loader, QrCode } from '@/components'
import { formatCurrency } from '@/utils'
import { currentDate } from '@/states'
import { usePixCreditPayment } from '@/hooks'
import * as S from './styles'

export const PixCreditPayment = () => {
  const { firstName, installment, installmentValue, alert, open, handleCopy } =
    usePixCreditPayment()

  return (
    <Layout
      title={`${firstName}, pague a entrada de ${formatCurrency(installmentValue)} pelo Pix`}
      isError={false}
      isLoading={false}
      alert={alert}
      sx={S.Wrapper}
    >
      <QrCode
        date={currentDate}
        cet={0.005}
        stepperProps={{ installment, installmentValue, activeStep: 0 }}
        handleCopy={handleCopy}
      />
      <Loader open={open} description="Simulando resposta do pagamento..." />
    </Layout>
  )
}
