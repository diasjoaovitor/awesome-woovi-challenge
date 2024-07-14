import { Box, Typography } from '@mui/material'
import { HeaderLogo } from '../Logo'
import * as S from './styles'

export const ErrorCard = () => {
  return (
    <Box sx={S.Wrapper}>
      <HeaderLogo />
      <Typography variant="h6">
        Não foi possível renderizar a tela corretamente
      </Typography>
    </Box>
  )
}
