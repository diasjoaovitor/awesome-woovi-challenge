import { Backdrop, Box, Typography } from '@mui/material'
import { HeaderLogo } from '../Logo'
import * as S from './styles'

export type TLoaderProps = {
  open: boolean
  description?: string
}

export const Loader = ({ open, description }: TLoaderProps) => {
  return (
    <Backdrop sx={S.Wrapper} open={Boolean(open)}>
      <Box sx={S.Animation}>
        <HeaderLogo />
      </Box>
      <Typography variant="h5" component="p" color="primary.main">
        {description}
      </Typography>
    </Backdrop>
  )
}
