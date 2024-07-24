import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { HeaderLogo } from '@/components'
import { delay } from '@/utils'
import * as S from './styles'

export const ApprovedPayment = () => {
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      await delay(3000)
      navigate('/')
    })()
  }, [])

  return (
    <Box sx={S.Wrapper}>
      <HeaderLogo />
      <Typography component="h1" variant="h5">
        Parabéns! Você realizou o pagamento de todas as parcelas.
      </Typography>
    </Box>
  )
}
