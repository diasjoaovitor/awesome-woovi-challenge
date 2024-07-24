import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  '& .MuiTextField-root': {
    mb: 2
  },
  button: {
    mt: 2
  }
}

export const Grid: SxProps<Theme> = {
  display: 'grid',
  gap: 2,
  gridTemplateColumns: '1fr 1fr'
}
