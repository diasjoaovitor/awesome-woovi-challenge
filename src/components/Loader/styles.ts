import { keyframes, SxProps, Theme } from '@mui/material'

export const Wrapper: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.drawer + 1,
  flexDirection: 'column',
  gap: 2,
  p: 2
}

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
  `
export const Animation: SxProps<Theme> = {
  animation: `${blink} 1s steps(10, end) infinite`
}

export const Paper: SxProps<Theme> = {
  p: 2,
  borderRadius: 2
}
