import { Box, CSSObject, SxProps, Theme } from '@mui/material'
import { Alert, ErrorCard, Footer, Header, Loader, TAlertProps } from '..'
import * as S from './styles'

type TLayoutProps = {
  title: string
  children: React.ReactNode
  isLoading: boolean
  isError: boolean
  alert: TAlertProps
  sx?: SxProps<Theme>
}

export const Layout = ({
  title,
  children,
  isLoading,
  isError,
  alert,
  sx
}: TLayoutProps) => {
  return (
    <>
      {!isLoading && (
        <>
          {!isError ? (
            <Box sx={{ ...(sx as CSSObject), ...(S.Wrapper as CSSObject) }}>
              <Header>{title}</Header>
              <main>{children}</main>
              <Footer />
            </Box>
          ) : (
            <ErrorCard />
          )}
        </>
      )}
      <Loader open={isLoading} />
      <Alert {...alert} />
    </>
  )
}
