import {
  CreditCardForm,
  Layout,
  PaymentInfo,
  TCreditCardFormProps
} from '@/components'
import { useCreditPayment } from '@/hooks'
import { currentDate } from '@/states'
import { creditSteps } from './credit-steps'

export const CreditPayment = () => {
  const {
    firstName,
    remainingInstallments,
    formData,
    installments,
    total,
    installmentIndex,
    payedInstallments,
    totalOnCreditCard,
    activeStep,
    handleInstallmentChange,
    handleSubmit,
    alert,
    open
  } = useCreditPayment()

  const creditCardFormProps: TCreditCardFormProps = {
    installmentIndex,
    handleInstallmentChange,
    remainingInstallments,
    totalOnCreditCard,
    formData,
    handleSubmit
  }

  return (
    <Layout
      title={`${firstName}, pague o restante em ${remainingInstallments}x no cartão`}
      isError={false}
      loader={{ open, transparent: true }}
      alert={alert}
    >
      <CreditCardForm {...creditCardFormProps} />
      <PaymentInfo
        date={currentDate}
        cet={0.005}
        total={total}
        stepperProps={{
          installments,
          activeStep,
          completedSteps: payedInstallments
        }}
        helpSteps={creditSteps}
      />
    </Layout>
  )
}
