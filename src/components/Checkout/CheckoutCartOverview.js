import React, { useState, useContext } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
// import { useShoppingCart } from "use-shopping-cart"
import CheckoutCartItem from "./CheckoutCartItem"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { LanguageContext } from "../layout"
import { CurrencyContext } from "../layout"
import { CartContext } from "../../context/CartContext"
import { navigate } from "gatsby"

const useStyles = makeStyles(theme => ({}))

export default function Cart(props) {
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { actCurrency } = useContext(CurrencyContext)

  const { cart, ttlPriceFormatted } = useContext(CartContext)

  return (
    <>
      <CssBaseline />
      {Object.keys(cart).map((item, idx) => {
        const cartItem = cart[item]
        return <CheckoutCartItem key={idx} cartItem={cartItem} />
      })}
    </>
  )
}

// export function CheckoutCartItem(props) {
//   return <>{props.cartItem.nameEng}</>
// }
