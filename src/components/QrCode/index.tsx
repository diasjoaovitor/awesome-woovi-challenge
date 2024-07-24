import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { FileCopy } from '@mui/icons-material'
import { pixCode } from '@/repositories'
import QrCodeImage from '@/assets/qr-code.svg'
import * as S from './styles'

type TQrCodeProps = {
  handleCopy(pixCode: string): void
}

export const QrCode = ({ handleCopy }: TQrCodeProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyButtonClick = (pixCode: string) => {
    handleCopy(pixCode)
    setIsCopied(true)
  }

  return (
    <Box textAlign="center">
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
    </Box>
  )
}
