import { Stepper as MuiStepper, Step, StepLabel } from '@mui/material'
import { CheckCircle, CircleOutlined } from '@mui/icons-material'
import { formatCurrency } from '@/utils'
import * as S from './styles'

const CustomStepIcon = ({
  active,
  completed
}: {
  active: boolean
  completed: boolean
}) =>
  !completed ? (
    <CircleOutlined fontSize="small" color={!active ? 'disabled' : 'primary'} />
  ) : (
    <CheckCircle fontSize="small" color="primary" />
  )

export type TStepperProps = {
  installments: number[]
  activeStep: number
  completedSteps: number[]
}

export const Stepper = ({
  installments,
  activeStep,
  completedSteps
}: TStepperProps) => {
  return (
    <MuiStepper activeStep={activeStep} orientation="vertical" sx={S.Wrapper}>
      {installments.length > 1 ? (
        installments.map((value, index) => {
          const isActive = activeStep === index
          const isCompleted = !!completedSteps[index]
          return (
            <Step key={index} data-testid="step">
              {index !== 0 ? (
                <StepLabel
                  StepIconComponent={() => (
                    <CustomStepIcon active={isActive} completed={isCompleted} />
                  )}
                >
                  {index + 1}ª no cartão
                  <strong>{formatCurrency(value)}</strong>
                </StepLabel>
              ) : (
                <StepLabel
                  StepIconComponent={() => (
                    <CustomStepIcon active={isActive} completed={isCompleted} />
                  )}
                >
                  1ª entrada no Pix
                  <strong>{formatCurrency(value)}</strong>
                </StepLabel>
              )}
            </Step>
          )
        })
      ) : (
        <StepLabel
          StepIconComponent={() => (
            <CustomStepIcon active={true} completed={false} />
          )}
        >
          1x no Pix
          <strong>{formatCurrency(installments[0])}</strong>
        </StepLabel>
      )}
    </MuiStepper>
  )
}
