import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext(null);

const emptyShipping = { name: "", email: "", address: "", city: "", postal: "", country: "Canada" };
const emptyPayment = { cardName: "", cardNumber: "", expiry: "", cvc: "" };

export function CheckoutProvider({ children }) {
  const [shipping, setShipping] = useState(emptyShipping);
  const [payment, setPayment] = useState(emptyPayment);
  const [orderNumber, setOrderNumber] = useState(null);

  function completeOrder() {
    const num = `RZV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(num);
    return num;
  }

  function resetCheckout() {
    setShipping(emptyShipping);
    setPayment(emptyPayment);
    setOrderNumber(null);
  }

  return (
    <CheckoutContext.Provider
      value={{ shipping, setShipping, payment, setPayment, orderNumber, completeOrder, resetCheckout }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout must be used within CheckoutProvider");
  return ctx;
}
