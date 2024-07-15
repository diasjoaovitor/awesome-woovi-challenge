import { TInstallment, TUser } from '@/types'
import { useLocation } from 'react-router-dom'

export const PageMock = () => {
  const { state } = useLocation()
  const installment = state?.installment as TInstallment
  const user = state?.user as TUser
  return (
    <div>
      <p>id: {installment.id}</p>
      <p>quantity: {installment.quantity}</p>
      <p>total: {installment.total}</p>
      <p>user: {user.firstName}</p>
    </div>
  )
}
