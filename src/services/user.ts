import { userFirstName } from '@/repositories'
import { TUser } from '@/types'
import { delay } from '@/utils'

export const getUser = async () => {
  await delay()
  const user: TUser = { firstName: userFirstName }
  return user
}
