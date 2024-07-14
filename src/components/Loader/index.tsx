import { Backdrop, Box } from '@mui/material'
import { HeaderLogo } from '../Logo'
import * as S from './styles'

export type TLoaderProps = {
  open: boolean
}

export const Loader = ({ open }: TLoaderProps) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      open={Boolean(open)}
    >
      <Box sx={S.Animation}>
        <HeaderLogo />
      </Box>
    </Backdrop>
  )
}
