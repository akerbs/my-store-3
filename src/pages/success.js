import React, { useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
// import Link from "gatsby-plugin-transition-link"
import { Link } from "gatsby"
import SEO from "../components/seo"
import { useShoppingCart } from "use-shopping-cart"

export default function () {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    clearCart()
  })

  return (
    <>
      <SEO title="Page success" />
      <CssBaseline />
      <h1>Hi from the success page</h1>
      <p>Successful!!!</p>
      <Link to="/">Go back to the homepage</Link>
    </>
  )
}
