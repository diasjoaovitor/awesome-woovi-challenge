import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  Typography
} from '@mui/material'
import { FileCopy } from '@mui/icons-material'
import { pixCode } from '@/repositories'
import { formatCurrency } from '@/utils'
import { ExpandMore, Stepper, TStepperProps } from '..'
import { pixSteps } from './pix-steps'
import QrCodeImage from '@/assets/qr-code.svg'
import * as S from './styles'

type TQrCodeProps = {
  date: string
  cet: number
  stepperProps: TStepperProps
  handleCopy(pixCode: string): void
}

export const QrCode = ({
  date,
  cet,
  stepperProps,
  handleCopy
}: TQrCodeProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyButtonClick = (pixCode: string) => {
    handleCopy(pixCode)
    setIsCopied(true)
  }

  return (
    <>
      <Box component="figure" sx={S.Figure}>
        <img src={QrCodeImage} alt="QRCode Image" />
      </Box>
      {!isCopied ? (
        <Button
          endIcon={<FileCopy />}
          variant="contained"
          color="secondary"
          onClick={() => handleCopyButtonClick(pixCode)}
        >
          Clique para copiar QR CODE
        </Button>
      ) : (
        <Typography color="primary">Pix copiado com sucesso!</Typography>
      )}
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
          <strong>
            Total: {formatCurrency(stepperProps.installment.total)}
          </strong>
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <ExpandMore title="Como funciona?">
        <List sx={S.List}>
          {pixSteps.map((step, index) => (
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
    </>
  )
}
