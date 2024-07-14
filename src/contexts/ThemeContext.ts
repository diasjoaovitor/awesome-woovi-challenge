import { createContext } from 'react'
import { Theme } from '@mui/material'

type TThemeContext = {
  theme: Theme
}

export const ThemeContext = createContext({} as TThemeContext)
