import { installments } from '@/repositories'
import { delay } from '@/utils'

export const getInstallments = async () => {
  await delay()
  return installments
}
