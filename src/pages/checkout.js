import React, { useContext, useState } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { Link, navigate } from "gatsby"
// import CardForm from "../components/Checkout/CardForm"
// import FpxBankForm from "../components/Checkout/FpxBankForm"
// import IbanForm from "../components/Checkout/IbanForm"
// import IdealBankForm from "../components/Checkout/IdealBankForm"
// import PaymentRequestForm from "../components/Checkout/PaymentRequestForm"
// import SplitForm from "../components/Checkout/SplitForm"
import { CartContext } from "../context/CartContext"
// import CheckoutMainComponent from "../components/Checkout/CheckoutMainComponent"
import MyCheckoutForm from "../components/Checkout/MyCheckoutForm"
import { makeStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"
import Hidden from "@material-ui/core/Hidden"
import CssBaseline from "@material-ui/core/CssBaseline"
import PropTypes from "prop-types"
import getStripe from "../utils/stripejs"

import CheckoutCartOverview from "../components/Checkout/CheckoutCartOverview"

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    margin: 0,
    padding: 0,
    width: "100vw",
  },
  boxLeft: {
    boxShadow: " 1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50vw",
    // minWidth: "50vw",
    // maxWidth: "50vw",
    margin: 0,
    padding: "9% 4% 0 17%",
    float: "left",
    overflowY: "scroll",
  },
  boxRight: {
    boxShadow: " -1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50vw",
    // minWidth: "50vw",
    // maxWidth: "50vw",
    margin: 0,
    padding: "10% 5% 5% 5%",
    float: "right",
    overflowY: "scroll",
  },
}))

function Checkout() {
  const classes = useStyles()

  return (
    <Elements stripe={getStripe()}>
      <CssBaseline />
      <>
        {/* <Container className={classes.contentWrapper} id="wrapper"> */}
        <Hidden smDown>
          <div className={classes.contentWrapper}>
            <div className={classes.boxLeft}>
              <CheckoutCartOverview />
            </div>

            <div className={classes.boxRight}>
              {/* <SplitForm /> */}
              <MyCheckoutForm />
            </div>
          </div>
        </Hidden>
        {/* Middle up hide - but show for little viewport */}
        <Hidden mdUp>test mini display</Hidden>
        {/* </Container> */}
      </>
    </Elements>
  )
}

Checkout.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
}
export default withWidth()(Checkout)
