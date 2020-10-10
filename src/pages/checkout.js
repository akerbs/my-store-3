import React, { useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Link, navigate } from "gatsby"
import "./checkout.css"
import CardForm from "../components/Checkout/CardForm"
import FpxBankForm from "../components/Checkout/FpxBankForm"
import IbanForm from "../components/Checkout/IbanForm"
import IdealBankForm from "../components/Checkout/IdealBankForm"
import PaymentRequestForm from "../components/Checkout/PaymentRequestForm"
import SplitForm from "../components/Checkout/SplitForm"
import { CartContext } from "../context/CartContext"

const PUBLIC_KEY =
  "pk_test_51HGUuRHwITO0GSJr0YK6FwbE17LUTst9UCvm2uH0RdjBtAnQJqgPmDn0BSunRc8FIEXRW3HatsFd1uDHkfaGJtUm00IA2780Iw"
const stripePromise = loadStripe(PUBLIC_KEY)

const Stripe = () => {
  const { cart } = useContext(CartContext)

  return (
    <Elements stripe={stripePromise}>
      <div>
        <SplitForm cart={cart} />
      </div>
    </Elements>
  )
}

export default Stripe
