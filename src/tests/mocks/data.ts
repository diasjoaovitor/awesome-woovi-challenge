import { TInstallment, TUser } from '@/types'

export const mockedUser: TUser = {
  firstName: 'Vitor'
}

export const mockedInstallments: TInstallment[] = [
  {
    id: '1',
    quantity: 1,
    total: 1000
  },
  {
    id: '2',
    quantity: 2,
    total: 1100
  },
  {
    id: '3',
    quantity: 3,
    total: 1200
  },
  {
    id: '4',
    quantity: 4,
    total: 1300
  }
]
