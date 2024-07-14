import { TInstallment } from '@/types'
import { useLocation } from 'react-router-dom'

export const QRCodePageMock = () => {
  const { state } = useLocation()
  const installment = state?.installment as TInstallment
  return (
    <div>
      <p>id: {installment.id}</p>
      <p>quantity: {installment.quantity}</p>
      <p>total: {installment.total}</p>
    </div>
  )
}
