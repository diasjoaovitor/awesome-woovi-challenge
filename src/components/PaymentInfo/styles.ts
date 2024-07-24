import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  textAlign: 'center'
}

export const Flex: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 1
}

export const List: SxProps<Theme> = {
  textAlign: 'left'
}
