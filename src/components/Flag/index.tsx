import { PropsWithChildren } from 'react'
import { Box, Typography } from '@mui/material'
import * as S from './styles'

export const Flag = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={S.Wrapper}>
      <Typography variant="caption" sx={S.Typography}>
        {children}
      </Typography>
    </Box>
  )
}
