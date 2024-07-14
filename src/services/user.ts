import { userFirstName } from '@/repositories'
import { delay } from '@/utils'

export const getUser = async () => {
  await delay()
  return { firstName: userFirstName }
}
