import { PropsWithChildren } from 'react'
import { Box, Typography } from '@mui/material'
import { HeaderLogo } from '../Logo'
import * as S from './styles'

export const Header = ({ children }: PropsWithChildren) => {
  return (
    <Box component="header" sx={S.Wrapper}>
      <HeaderLogo />
      <Typography component="h1" variant="h6">
        {children}
      </Typography>
    </Box>
  )
}
