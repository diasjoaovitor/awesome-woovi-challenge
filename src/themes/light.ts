import { createTheme, getContrastRatio } from '@mui/material'
import { grey } from '@mui/material/colors'

const primary = '#03D69D'
const secondary = '#133A6F'

const getContrastText = (color: string) =>
  getContrastRatio(color, '#fff') >= 4.5 ? '#fff' : '#111'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#35deb0',
      main: primary,
      dark: '#02956d',
      contrastText: getContrastText(primary)
    },
    secondary: {
      light: '#42618b',
      main: secondary,
      dark: '#0d284d',
      contrastText: getContrastText(secondary)
    },
    text: {
      secondary: grey[500]
    }
  }
})
