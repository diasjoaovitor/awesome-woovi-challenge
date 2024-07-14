import { TBestInstallmentOption, TCashback } from '@/types'

export const getBestInstallmentOption = () => {
  const bestInstallmentOption: TBestInstallmentOption = {
    amortizedInterestPercentage: 0.03,
    installmentId: '4'
  }
  return bestInstallmentOption
}

export const getCashback = () => {
  const cashback: TCashback = {
    immediateCashbackValue: 300,
    percentage: 0.03
  }
  return cashback
}
