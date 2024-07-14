import { useEffect, useState } from 'react'
import { TAlertProps, TAlertAttributes } from '@/components'

type TUseAlert = {
  isSuccess: boolean
  isError: boolean
  errorMessage: {
    title: string
    description: string
  }
  successMessage?: {
    title: string
    description: string
  }
}

export const useAlert = (props?: TUseAlert) => {
  const { errorMessage, isError, isSuccess, successMessage } = props || {}

  const [alert, setAlert] = useState({} as TAlertProps)

  useEffect(() => {
    if (!isSuccess || !successMessage) return
    handleOpenAlert({
      severity: 'success',
      title: successMessage.title,
      description: successMessage.description
    })
  }, [isSuccess])

  useEffect(() => {
    if (!isError || !errorMessage) return
    handleOpenAlert({
      severity: 'error',
      title: errorMessage.title,
      description: errorMessage.description
    })
  }, [isError])

  const handleCloseAlert = () => setAlert({} as TAlertProps)

  const handleOpenAlert = (props: TAlertAttributes) => {
    setAlert({ ...props, open: true, handleClose: handleCloseAlert })
  }

  return { alert, handleOpenAlert, handleCloseAlert }
}
