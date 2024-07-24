import { Box, Divider, List, ListItemText, Typography } from '@mui/material'
import { formatCurrency } from '@/utils'
import { ExpandMore, Stepper, TStepperProps } from '..'
import * as S from './styles'

type TPaymentInfoProps = {
  date: string
  cet: number
  total: number
  stepperProps: TStepperProps
  helpSteps: string[]
}

export const PaymentInfo = ({
  cet,
  date,
  total,
  stepperProps,
  helpSteps
}: TPaymentInfoProps) => {
  return (
    <Box sx={S.Wrapper}>
      <Box my={2}>
        <Typography variant="caption" component="p" color="text.secondary">
          Prazo de pagamento
        </Typography>
        <Typography variant="body2" component="p" fontWeight="bold">
          {date} - 23:59
        </Typography>
      </Box>
      <Stepper {...stepperProps} />
      <Divider sx={{ my: 2 }} />
      <Box sx={S.Flex}>
        <Typography variant="body2" component="p" color="text.secondary">
          CET: {cet * 100}%
        </Typography>
        <Typography component="p" color="text.secondary">
          <strong>Total: {formatCurrency(total)}</strong>
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <ExpandMore title="Como funciona?">
        <List sx={S.List}>
          {helpSteps.map((step, index) => (
            <ListItemText
              key={index}
              primary={`${index + 1}. ${step}`}
              primaryTypographyProps={{ color: 'text.secondary' }}
            />
          ))}
        </List>
      </ExpandMore>
      <Divider sx={{ my: 2 }} />
      <div>
        <Typography variant="caption" component="p" color="text.secondary">
          Identificador
        </Typography>
        <Typography variant="body2" component="p" fontWeight="bold">
          2c1b951f356c4680b13ba1c9fc889c47
        </Typography>
      </div>
    </Box>
  )
}
