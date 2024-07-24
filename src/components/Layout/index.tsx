import { Box, CSSObject, SxProps, Theme } from '@mui/material'
import {
  Alert,
  ErrorCard,
  Footer,
  Header,
  Loader,
  TAlertProps,
  TLoaderProps
} from '..'
import * as S from './styles'

type TLayoutProps = {
  title: string
  children: React.ReactNode
  isError: boolean
  loader: TLoaderProps & { transparent?: boolean }
  alert: TAlertProps
  sx?: SxProps<Theme>
}

export const Layout = ({
  title,
  children,
  loader,
  isError,
  alert,
  sx
}: TLayoutProps) => {
  if (isError)
    return (
      <>
        <ErrorCard />
        <Alert {...alert} />
      </>
    )

  if (loader.open && !loader.transparent)
    return (
      <>
        <Loader {...loader} />
        <Alert {...alert} />
      </>
    )

  return (
    <Box sx={{ ...(sx as CSSObject), ...(S.Wrapper as CSSObject) }}>
      <Header>{title}</Header>
      <main>{children}</main>
      <Footer />
      <Loader {...loader} />
      <Alert {...alert} />
    </Box>
  )
}
