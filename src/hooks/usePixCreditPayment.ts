import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TInstallment, TUser } from '@/types'
import { useAlert, useOpen } from '@/hooks'
import { delay } from '@/utils'

export const usePixCreditPayment = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [paymentSituation, setPaymentSituation] = useState(false)

  const { alert, handleOpenAlert } = useAlert()
  const { open, setOpen } = useOpen()

  const installment = state?.installment as TInstallment
  const user = state?.user as TUser

  const { quantity, total } = installment
  const { firstName } = user
  const installmentValue = total / quantity
  const installments = new Array(quantity).fill(installmentValue)

  useEffect(() => {
    if (!paymentSituation) return
    ;(async () => {
      await delay(3000)
      setOpen(true)
      await delay(3000)
      handleNavigate()
    })()
  }, [paymentSituation])

  const handleCopy = (pixCode: string) => {
    navigator.clipboard.writeText(pixCode)
    handleOpenAlert({
      title: 'Código copiado com sucesso',
      description: 'Agora é só colar no app do seu banco',
      severity: 'success'
    })
    setPaymentSituation(true)
  }

  const handleNavigate = () => {
    installment.quantity !== 1
      ? navigate('/credit-payment', { state: { installment, user } })
      : navigate('/approved-payment')
  }

  return {
    firstName,
    installment,
    installmentValue,
    installments,
    alert,
    open,
    handleCopy
  }
}
