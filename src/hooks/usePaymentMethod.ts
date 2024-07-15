import { useEffect, useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import { getInstallments, getUser } from '@/services'
import { TInstallment } from '@/types'
import { useAlert } from './useAlert'

export const usePaymentMethod = () => {
  const [user, setUser] = useState({ firstName: '' })
  const [installments, setInstallments] = useState<TInstallment[]>([])

  const [
    { data: userData, isLoading: isUserLoading, isError: isUserError },
    {
      data: installmentsData,
      isLoading: isInstallmentsLoading,
      isError: isInstallmentsError
    }
  ] = useQueries({
    queries: [
      {
        queryKey: ['getUser'],
        queryFn: getUser
      },
      {
        queryKey: ['getInstallments'],
        queryFn: getInstallments
      }
    ]
  })

  const isError = isUserError || isInstallmentsError
  const isLoading = isUserLoading || isInstallmentsLoading
  const isSuccess = !!userData && !!installmentsData

  const { alert } = useAlert({
    isError,
    isSuccess,
    errorMessage: {
      title: 'Erro ao buscar dados',
      description: 'Ocorreu um erro ao buscar os dados, tente novamente.'
    }
  })

  useEffect(() => {
    if (!isSuccess) return
    setUser(userData)
    setInstallments(installmentsData)
  }, [isSuccess])

  return {
    alert,
    user,
    installments,
    isLoading,
    isError
  }
}
