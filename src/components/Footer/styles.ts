import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'text.secondary',
  img: {
    position: 'relative',
    bottom: 1
  }
}
