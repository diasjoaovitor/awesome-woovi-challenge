import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SelectChangeEvent } from '@mui/material'
import { TCreditCardPayment, TInstallment, TUser } from '@/types'
import { useAlert, useOpen } from '@/hooks'
import { delay } from '@/utils'

export const useCreditPayment = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const user = state?.user as TUser
  const { firstName } = user
  const installment = state?.installment as TInstallment
  const { total } = installment

  const [formData, setFormData] = useState<TCreditCardPayment>({
    fullName: '',
    cpf: '',
    cardNumber: '',
    cardExpiration: '',
    cvv: ''
  })
  const [installments, setInstallments] = useState<number[]>(
    new Array(installment.quantity).fill(total / installment.quantity)
  )
  const [installmentIndex, setInstallmentIndex] = useState(
    installment.quantity - 2
  )
  const [payedInstallments, setPayedInstallments] = useState<number[]>([
    total / installment.quantity
  ])
  const [remainingInstallments, setRemainingInstallments] = useState<number>(
    installment.quantity - 1
  )

  const totalOnCreditCard =
    total - payedInstallments.reduce((acc, curr) => acc + curr, 0)
  const activeStep = payedInstallments.length

  const { alert, handleOpenAlert } = useAlert()
  const { open, setOpen } = useOpen()

  useEffect(() => {
    if (!open) return
    ;(async () => {
      await delay(1000)
      if (installmentIndex === 0) {
        navigate('/approved-payment')
        return
      }
      setRemainingInstallments(installmentIndex)
      setPayedInstallments((prev) => [
        ...prev,
        totalOnCreditCard / (installmentIndex + 1)
      ])
      setInstallmentIndex((prev) => prev - 1)
      handleOpenAlert({
        title: 'Pagamento aprovado',
        severity: 'success'
      })
      setOpen(false)
    })()
  }, [open])

  const handleInstallmentChange = (e: SelectChangeEvent) => {
    const installmentIndex = Number(e.target.value)
    const quantity = installmentIndex + 1
    setInstallmentIndex(installmentIndex)
    setInstallments([
      ...payedInstallments,
      ...new Array(quantity).fill(totalOnCreditCard / quantity)
    ])
  }

  const handleSubmit = (data: TCreditCardPayment) => {
    setFormData(data)
    setOpen(true)
  }

  return {
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
  }
}
