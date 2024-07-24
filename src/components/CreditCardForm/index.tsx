import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import {
  cardExpirationIsValid as cardExpirationIsValidFn,
  cardExpirationMask,
  cardNumberIsValid as cardNumberIsValidFn,
  cardNumberMask,
  cpfIsValid as cpfIsValidFn,
  cpfMask,
  cvvIsValid as cvvIsValidFn,
  CVVMask,
  formatCurrency,
  getHelperTextColor
} from '@/utils'
import { TCreditCardPayment } from '@/types'
import { schema } from './form-schema'
import { getHelperText } from './utils'
import * as S from './styles'

export type TCreditCardFormProps = {
  installmentIndex: number
  totalOnCreditCard: number
  remainingInstallments: number
  formData: TCreditCardPayment
  handleInstallmentChange(e: SelectChangeEvent): void
  handleSubmit(data: TCreditCardPayment): void
}

export const CreditCardForm = ({
  handleInstallmentChange,
  handleSubmit: onSubmit,
  formData,
  remainingInstallments,
  installmentIndex,
  totalOnCreditCard
}: TCreditCardFormProps) => {
  const [fullName, setFullName] = useState(formData.fullName)
  const [cpf, setCpf] = useState(formData.cpf)
  const [cardNumber, setCardNumber] = useState(formData.cardNumber)
  const [cardExpiration, setCardExpiration] = useState(formData.cardExpiration)
  const [cvv, setCvv] = useState(formData.cvv)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    values: {
      fullName,
      cpf,
      cardNumber,
      cardExpiration,
      cvv
    }
  })

  const cpfIsValid = cpfIsValidFn(cpf)
  const isCpfError = !cpfIsValid && !!errors.cpf

  const cardNumberIsValid = cardNumberIsValidFn(cardNumber)
  const isCardNumberError = !cardNumberIsValid && !!errors.cardNumber

  const cardExpirationIsValid = cardExpirationIsValidFn(cardExpiration)
  const isCardExpirationError =
    !cardExpirationIsValid && !!errors.cardExpiration

  const cvvIsValid = cvvIsValidFn(cvv)
  const isCvvError = !cvvIsValid && !!errors.cvv

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value)
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(cpfMask(e.target.value))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(cardNumberMask(e.target.value))
  }

  const handleCardExpirationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCardExpiration(cardExpirationMask(e.target.value))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(CVVMask(e.target.value))
  }

  return (
    <FormControl
      component="form"
      role="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={S.Wrapper}
      fullWidth
    >
      <TextField
        {...register('fullName')}
        type="text"
        label="Nome Completo"
        onChange={handleFullNameChange}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
      />
      <TextField
        {...register('cpf')}
        type="text"
        label="CPF"
        onChange={handleCpfChange}
        error={isCpfError}
        FormHelperTextProps={{
          sx: { color: getHelperTextColor(!cpfIsValid) }
        }}
        helperText={getHelperText({
          errorMessage: errors.cpf?.message,
          isError: !!errors.cpf,
          isValid: cpfIsValid,
          successMessage: 'CPF válido'
        })}
        inputProps={{ maxLength: 14 }}
      />
      <TextField
        {...register('cardNumber')}
        type="text"
        label="Número do Cartão"
        onChange={handleCardNumberChange}
        error={isCardNumberError}
        FormHelperTextProps={{
          sx: {
            color: getHelperTextColor(!cardNumberIsValid)
          }
        }}
        helperText={getHelperText({
          errorMessage: errors.cardNumber?.message,
          isError: !!errors.cardNumber,
          isValid: cardNumberIsValid,
          successMessage: 'Número do cartão válido'
        })}
        inputProps={{ maxLength: 19 }}
      />
      <Box sx={S.Grid}>
        <TextField
          {...register('cardExpiration')}
          type="text"
          label="Vencimento"
          onChange={handleCardExpirationChange}
          error={isCardExpirationError}
          FormHelperTextProps={{
            sx: {
              color: getHelperTextColor(!cardExpirationIsValid)
            }
          }}
          helperText={getHelperText({
            errorMessage: errors.cardExpiration?.message,
            isError: !!errors.cardExpiration,
            isValid: cardExpirationIsValid,
            successMessage: 'Data de vencimento válida'
          })}
          inputProps={{ maxLength: 5 }}
        />
        <TextField
          {...register('cvv')}
          type="number"
          label="CVV"
          onChange={handleCvvChange}
          value={cvv}
          error={isCvvError}
          FormHelperTextProps={{
            sx: { color: getHelperTextColor(!cvvIsValid) }
          }}
          helperText={getHelperText({
            errorMessage: errors.cvv?.message,
            isError: !!errors.cvv,
            isValid: cvvIsValid,
            successMessage: 'cvv válido'
          })}
          inputProps={{ maxLength: 3 }}
        />
      </Box>
      <Select
        value={installmentIndex.toString()}
        onChange={handleInstallmentChange}
        data-testid="installment-select"
      >
        {Array.from({ length: remainingInstallments }).map((_, index) => (
          <MenuItem key={index} value={index}>
            {index + 1}x de {formatCurrency(totalOnCreditCard / (index + 1))}
          </MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="secondary">
        Pagar
      </Button>
    </FormControl>
  )
}
