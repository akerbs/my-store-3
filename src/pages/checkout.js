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
import StorefrontIcon from "@material-ui/icons/Storefront"
import IconButton from "@material-ui/core/IconButton"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import Typography from "@material-ui/core/Typography"
import clsx from "clsx"
import CheckoutCartOverview from "../components/Checkout/CheckoutCartOverview"

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    margin: 0,
    padding: 0,
  },
  boxLeft: {
    boxShadow: " 1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50%",
    minWidth: "50%",
    maxWidth: "50%",
    margin: 0,
    padding: "5%",
    float: "left",
  },
  boxRight: {
    boxShadow: " -1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50%",
    minWidth: "50%",
    maxWidth: "50%",
    margin: 0,
    padding: "5%",
    float: "right",
  },
  iconBtnMain: {
    transition: "0.3s linear",
    "&:hover": {
      backgroundColor: "transparent",
      left: "-1%",
    },
  },
  arrowBtn: {
    "&:hover": {
      backgroundColor: "transparent",
      color: "black",
    },
  },
  arrowBtnHovered: {
    color: "black",
  },
  storeBtn: {
    padding: "5%",
    margin: "0 2% 0 2%",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  storeBtnNoHovered: {
    boxShadow: " -3px 2px 10px -1px rgba(0, 0, 0, 0.3)",
  },
}))

function Checkout() {
  const classes = useStyles()
  const [hovered, setHovered] = useState(false)
  const {
    cart,
    ttlPrice,
    currentCurrency,
    ttlPriceFormatted,
    currentCurrencySign,
  } = useContext(CartContext)

  return (
    <Elements stripe={getStripe()}>
      <CssBaseline />
      <>
        {/* <Container className={classes.contentWrapper} id="wrapper"> */}
        <Hidden smDown>
          <div className={classes.contentWrapper}>
            <div className={classes.boxLeft}>
              <IconButton
                color="secondary"
                disableRipple={true}
                className={classes.iconBtnMain}
                onClick={() => {
                  navigate("/")
                }}
                onMouseOver={() => setHovered(true)}
                onMouseOut={() => setHovered(false)}
              >
                <IconButton
                  color="secondary"
                  edge="end"
                  disableRipple={true}
                  className={clsx(
                    classes.arrowBtn,
                    hovered && classes.arrowBtnHovered
                  )}
                >
                  <KeyboardBackspaceIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="secondary"
                  disableRipple={true}
                  className={clsx(
                    classes.storeBtn,
                    !hovered && classes.storeBtnNoHovered
                  )}
                >
                  {hovered ? (
                    <Typography variant="body2" style={{ color: "black" }}>
                      Back
                    </Typography>
                  ) : (
                    <StorefrontIcon fontSize="small" />
                  )}
                </IconButton>
                {!hovered && (
                  <Typography variant="body2" style={{ display: "inline" }}>
                    MyStore
                  </Typography>
                )}
              </IconButton>
              <br />
              <div>
                Pay <br />
                {ttlPriceFormatted} {currentCurrencySign}
              </div>
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
