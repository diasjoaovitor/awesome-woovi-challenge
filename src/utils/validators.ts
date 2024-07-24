// methods generated with copilot

export const cpfIsValid = (cpf: string | undefined) => {
  if (!cpf) return false
  const cpfClean = cpf.replace(/\D/g, '')
  if (cpfClean.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpfClean)) return false
  let sum = 0
  let rest
  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(cpfClean.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpfClean.substring(9, 10))) return false
  sum = 0
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpfClean.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpfClean.substring(10, 11))) return false
  return true
}

export const cardNumberIsValid = (cardNumber: string | undefined) => {
  if (!cardNumber) return false
  const cardNumberClean = cardNumber.replace(/\D/g, '')
  if (cardNumberClean.length !== 16) return false
  return true
}

export const cardExpirationIsValid = (cardExpiration: string | undefined) => {
  if (!cardExpiration) return false
  const cardExpirationClean = cardExpiration.replace(/\D/g, '')
  if (cardExpirationClean.length !== 4) return false
  return true
}

export const cvvIsValid = (cvv: string | number | undefined) => {
  if (!cvv) return false
  const cvvClean = cvv.toString().replace(/\D/g, '')
  if (cvvClean.length !== 3) return false
  return true
}
