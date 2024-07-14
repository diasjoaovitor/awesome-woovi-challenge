import { PropsWithChildren } from 'react'
import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material'
import { ThemeContext } from '@/contexts'
import { lightTheme } from '@/themes'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeContext.Provider value={{ theme: lightTheme }}>
      <MUIThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}
