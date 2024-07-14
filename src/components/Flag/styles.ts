import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  width: '100%',
  borderTop: 12,
  borderBottom: 12,
  borderColor: 'secondary.main',
  borderRight: 12,
  borderRightColor: 'transparent',
  px: 1,
  borderRadius: 1,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  position: 'relative'
}

export const Typography: SxProps<Theme> = {
  position: 'absolute',
  color: 'secondary.contrastText',
  top: -10
}
