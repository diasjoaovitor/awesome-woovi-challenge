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
