export const getHelperText = ({
  isError,
  isValid,
  errorMessage,
  successMessage
}: {
  isError: boolean
  isValid: boolean
  errorMessage: string | undefined
  successMessage: string
}) => {
  if (!isError) return ''
  return !isValid ? errorMessage : successMessage
}
