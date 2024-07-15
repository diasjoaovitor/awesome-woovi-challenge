import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material'
import { CircleOutlined } from '@mui/icons-material'
import { TInstallment } from '@/types'
import { formatCurrency } from '@/utils'
import * as S from './styles'

const CustomStepIcon = ({ active }: { active: boolean }) => (
  <CircleOutlined fontSize="small" color={!active ? 'disabled' : 'primary'} />
)

export type TStepperProps = {
  installment: TInstallment
  installmentValue: number
  activeStep: number
}

export const Stepper = ({
  installment,
  installmentValue,
  activeStep
}: TStepperProps) => {
  return (
    <MuiStepper activeStep={activeStep} orientation="vertical" sx={S.Wrapper}>
      {Array.from({ length: installment.quantity }).map((_, index) => {
        const isActive = activeStep === index
        const formattedInstallmentValue = formatCurrency(installmentValue)
        return (
          <Step key={index}>
            {index !== 0 ? (
              <StepLabel
                StepIconComponent={() => <CustomStepIcon active={isActive} />}
              >
                {index + 1}ª no cartão
                <strong>{formattedInstallmentValue}</strong>
              </StepLabel>
            ) : (
              <StepLabel
                StepIconComponent={() => <CustomStepIcon active={isActive} />}
              >
                1ª entrada no Pix
                <strong>{formattedInstallmentValue}</strong>
              </StepLabel>
            )}
          </Step>
        )
      })}
    </MuiStepper>
  )
}
