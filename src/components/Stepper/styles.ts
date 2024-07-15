import { SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  '& .MuiStepLabel-label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  '& .MuiStepLabel-root': {
    p: 0
  },
  '& .MuiStepConnector-line': {
    minHeight: 10
  },
  '& .MuiStepConnector-root': {
    ml: 1.2
  }
}
