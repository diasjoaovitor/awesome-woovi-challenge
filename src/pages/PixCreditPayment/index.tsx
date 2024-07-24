import { Layout, PaymentInfo, QrCode } from '@/components'
import { formatCurrency } from '@/utils'
import { currentDate } from '@/states'
import { usePixCreditPayment } from '@/hooks'
import { pixSteps } from './pix-steps'

export const PixCreditPayment = () => {
  const {
    firstName,
    installment,
    installmentValue,
    installments,
    alert,
    open,
    handleCopy
  } = usePixCreditPayment()

  return (
    <Layout
      title={`${firstName}, pague a entrada de ${formatCurrency(installmentValue)} pelo Pix`}
      isError={false}
      loader={{ open, description: 'Simulando resposta do pagamento...' }}
      alert={alert}
    >
      <QrCode handleCopy={handleCopy} />
      <PaymentInfo
        date={currentDate}
        cet={0.005}
        total={installment.total}
        stepperProps={{
          installments,
          activeStep: 0,
          completedSteps: []
        }}
        helpSteps={pixSteps}
      />
    </Layout>
  )
}
