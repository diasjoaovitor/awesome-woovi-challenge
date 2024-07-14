import { Box, Typography } from '@mui/material'
import { VerifiedUserOutlined } from '@mui/icons-material'
import { FooterLogo } from '../Logo'
import * as S from './styles'

export const Footer = () => {
  return (
    <Box component="footer" sx={S.Wrapper}>
      <VerifiedUserOutlined fontSize="small" />
      <Typography variant="caption" component="p" mr={0.5} lineHeight={0}>
        Pagamento 100% seguro via:
      </Typography>
      <FooterLogo />
    </Box>
  )
}
