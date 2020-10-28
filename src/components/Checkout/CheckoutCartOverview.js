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
import { navigate, Link } from "gatsby"
import StorefrontIcon from "@material-ui/icons/Storefront"
import IconButton from "@material-ui/core/IconButton"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  iconBtnMain: {
    transition: "0.3s linear",
    "&:hover": {
      backgroundColor: "transparent",
      left: "-1%",
    },
  },
  arrowBtn: {
    color: "#b1b1b1",
    transition: "0.3s linear",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#303030",
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

export default function Cart(props) {
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { actCurrency } = useContext(CurrencyContext)
  const { cart, ttlPriceFormatted, currentCurrencySign } = useContext(
    CartContext
  )
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <CssBaseline />
      <div style={{ marginLeft: "-8%" }}>
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
              <Typography
                variant="body2"
                style={{ color: "#303030", fontWeight: 600 }}
              >
                Back
              </Typography>
            ) : (
              <StorefrontIcon fontSize="small" />
            )}
          </IconButton>
          {!hovered && (
            <Typography
              variant="body2"
              style={{ display: "inline", fontWeight: 600 }}
            >
              MyStore
            </Typography>
          )}
        </IconButton>
      </div>
      <br />

      <div style={{ marginLeft: "2%" }}>
        {" "}
        Pay
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          {currentCurrencySign}
          {ttlPriceFormatted}
        </Typography>
        <br />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          justifyContent: "space-between",
          // alignContent: "space-between",
        }}
      >
        <div>
          {Object.keys(cart).map((item, idx) => {
            const cartItem = cart[item]
            return <CheckoutCartItem key={idx} cartItem={cartItem} />
          })}
        </div>
        <div style={{ color: "#8c8c8c" }}>
          <a
            href="https://stripe.com"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="capture" gutterBottom>
              Powered by{" "}
            </Typography>
            <Typography
              gutterBottom
              variant="capture"
              style={{
                display: "inline",
                fontWeight: 600,
                fontFamily: "Bebas",
              }}
            >
              STRIPE
            </Typography>
          </a>
          <Typography
            gutterBottom
            variant="capture"
            style={{
              display: "inline",
              marginRight: "3%",
              marginLeft: "3%",
              color: "#e7e7e7",
            }}
          >
            {" "}
            |{" "}
          </Typography>
          <a
            href="https://stripe.com/checkout/terms"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              gutterBottom
              variant="capture"
              style={{ display: "inline", marginRight: "2%" }}
            >
              Terms{" "}
            </Typography>
          </a>
          <a
            href="https://stripe.com/privacy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              gutterBottom
              variant="capture"
              style={{ display: "inline" }}
            >
              Privacy
            </Typography>
          </a>
        </div>
      </div>
    </>
  )
}

// export function CheckoutCartItem(props) {
//   return <>{props.cartItem.nameEng}</>
// }
