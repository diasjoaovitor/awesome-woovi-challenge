import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CreditPayment, PaymentMethod, PixCreditPayment } from './pages'

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PaymentMethod />} />
      <Route path="/pix-credit-payment" element={<PixCreditPayment />} />
      <Route path="/credit-payment" element={<CreditPayment />} />
    </Routes>
  </BrowserRouter>
)
