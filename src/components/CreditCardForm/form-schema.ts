import * as yup from 'yup'
import {
  cardExpirationIsValid,
  cardNumberIsValid,
  cpfIsValid,
  cvvIsValid
} from '@/utils'

export const schema = yup
  .object()
  .shape({
    fullName: yup.string().trim().required('Nome completo é obrigatório'),
    cpf: yup
      .string()
      .required('CPF é obrigatório')
      .test('cpf', 'CPF inválido', (cpf) => cpfIsValid(cpf)),
    cardNumber: yup
      .string()
      .required('Número do cartão é obrigatório')
      .test('cardNumber', 'Número do cartão inválido', (cardNumber) =>
        cardNumberIsValid(cardNumber)
      ),
    cardExpiration: yup
      .string()
      .required('Data de vencimento é obrigatória')
      .test('cardExpiration', 'Data de vencimento inválida', (cardExpiration) =>
        cardExpirationIsValid(cardExpiration)
      ),
    cvv: yup
      .string()
      .required('CVV é obrigatório')
      .test('cvv', 'CVV inválido', (cvv) => cvvIsValid(cvv))
  })
  .required()
