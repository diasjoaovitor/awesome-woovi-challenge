import { ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Radio,
  Typography
} from '@mui/material'
import { ArrowForward, CheckCircle } from '@mui/icons-material'
import { formatCurrency } from '@/utils'
import { TBestInstallmentOption, TCashback, TInstallment } from '@/types'
import { Flag } from '../Flag'
import * as S from './styles'

export type TPaymentListProps = {
  installments: TInstallment[]
  bestInstallmentOption: TBestInstallmentOption
  cashback: TCashback
  handleNext(installment: TInstallment): void
}

const MainContent = ({
  installment: { id, quantity },
  installmentValue,
  secondary,
  secondaryColor,
  isChecked
}: {
  installment: TInstallment
  installmentValue: number
  isChecked: boolean
  secondary: ReactNode
  secondaryColor: string
}) => {
  return (
    <Box sx={S.MainContent}>
      <ListItemText
        primary={
          <>
            <strong>{quantity}x</strong> {formatCurrency(installmentValue)}
          </>
        }
        secondary={secondary}
        secondaryTypographyProps={{ color: secondaryColor }}
      />
      <Radio
        edge="end"
        value={id}
        checked={isChecked}
        checkedIcon={<CheckCircle />}
      />
    </Box>
  )
}

export const PaymentList = ({
  installments,
  bestInstallmentOption,
  cashback,
  handleNext
}: TPaymentListProps) => {
  installments.sort((a, b) => a.quantity - b.quantity)
  const defaultChecked =
    installments.length > 0
      ? installments.find(
          ({ id }) => bestInstallmentOption.installmentId === id
        )?.id || installments[0].id
      : ''
  const [checked, setChecked] = useState(defaultChecked)

  useEffect(() => {
    if (!defaultChecked) return
    setChecked(defaultChecked)
  }, [defaultChecked])

  const handleCheck = (id: string) => {
    setChecked(id)
  }

  return (
    <>
      <List sx={S.Wrapper}>
        {installments.map((installment, index) => {
          const { id, quantity, total } = installment
          const installmentValue = total / quantity

          const nextElementIsChecked =
            checked === installments[index + 1]?.id && index !== 0
          const isChecked = checked === id

          const isCashbackOption = index === 0
          const secondaryColor = !isCashbackOption
            ? 'text.secondary'
            : 'primary.main'

          const isBestInstallmentOption =
            bestInstallmentOption.installmentId === id

          return (
            <ListItem
              key={id}
              sx={S.GetListItem({ isChecked, nextElementIsChecked })}
              onClick={() => handleCheck(id)}
            >
              {index < 2 && (
                <Typography sx={S.ListItemTitle} variant="caption">
                  {index === 0 ? 'Pix' : 'Pix Parcelado'}
                </Typography>
              )}
              <MainContent
                {...{
                  installment,
                  installmentValue,
                  isChecked,
                  secondaryColor
                }}
                secondary={
                  !isCashbackOption ? (
                    `Total: ${formatCurrency(total)}`
                  ) : (
                    <>
                      Ganhe <strong>{cashback.percentage * 100}%</strong> de
                      Cashback
                    </>
                  )
                }
              />
              {index === 0 && (
                <Flag>
                  🤑{' '}
                  <strong>
                    {formatCurrency(cashback.immediateCashbackValue)}
                  </strong>{' '}
                  de volta no seu Pix na hora
                </Flag>
              )}
              {isBestInstallmentOption && (
                <Flag>
                  <strong>
                    -{bestInstallmentOption.amortizedInterestPercentage * 100}%
                    de juros
                  </strong>
                  : Melhor opção de parcelamento
                </Flag>
              )}
            </ListItem>
          )
        })}
      </List>
      <Button
        variant="outlined"
        endIcon={<ArrowForward />}
        onClick={() =>
          handleNext(installments.find(({ id }) => checked === id)!)
        }
      >
        avançar
      </Button>
    </>
  )
}
