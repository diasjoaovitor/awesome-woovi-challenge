export type TInstallment = {
  id: string
  quantity: number
  total: number
}

export type TBestInstallmentOption = {
  installmentId: string
  amortizedInterestPercentage: number
}

export type TCashback = {
  percentage: number
  immediateCashbackValue: number
}

export type TCreditCardPayment = {
  fullName: string
  cpf: string
  cardNumber: string
  cardExpiration: string
  cvv: string
}
