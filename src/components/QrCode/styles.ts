import { SxProps, Theme } from '@mui/material'

export const Figure: SxProps<Theme> = {
  border: 2,
  borderColor: 'primary.main',
  borderRadius: 2,
  p: 1,
  display: 'flex',
  img: {
    width: '100%'
  }
}

export const Flex: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1
}

export const List: SxProps<Theme> = {
  textAlign: 'left'
}
