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
import StorefrontIcon from "@material-ui/icons/Storefront"
import IconButton from "@material-ui/core/IconButton"
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  iconBtnMain: {
    transition: "1s linear",
    "&:hover": {
      backgroundColor: "transparent",
      left: "-1%",
    },
  },
  arrowBtn: {
    transition: "1s linear",
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
