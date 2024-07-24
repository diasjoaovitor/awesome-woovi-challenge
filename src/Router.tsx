import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  ApprovedPayment,
  CreditPayment,
  PaymentMethod,
  PixCreditPayment
} from './pages'

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaymentMethod />} />
      <Route path="/pix-credit-payment" element={<PixCreditPayment />} />
      <Route path="/credit-payment" element={<CreditPayment />} />
      <Route path="/approved-payment" element={<ApprovedPayment />} />
    </Routes>
  </BrowserRouter>
)
