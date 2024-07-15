import { Layout, Loader, TAlertProps } from '@/components'
import * as S from './styles'

export const CreditPayment = () => {
  return (
    <Layout
      title={'credit payment'}
      isError={false}
      isLoading={false}
      alert={{} as TAlertProps}
      sx={S.Wrapper}
    >
      ...
      <Loader open={false} description="Simulando resposta do pagamento..." />
    </Layout>
  )
}
