import React, { useState, useContext } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { useShoppingCart } from "use-shopping-cart"
import CartItem from "./CartItem"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"
import { LanguageContext } from "../../components/layout"

const useStyles = makeStyles(theme => ({
  btnWrapper: {
    textAlign: "center",
    margin: 20,
  },
}))

export default function Cart(props) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { actLanguage } = useContext(LanguageContext)

  const {
    incrementItem,
    decrementItem,
    removeItem,
    cartCount,
    cartDetails,
    // totalPrice,
    formattedTotalPrice,
    redirectToCheckout,
  } = useShoppingCart()

  console.log("cartDetails:", cartDetails)

  return (
    <div>
      <CssBaseline />
      <div>
        {Object.keys(cartDetails).map((item, idx) => {
          const cartItem = cartDetails[item]
          return (
            <CartItem
              onClose={props.onClose}
              open={props.open}
              key={idx}
              sku={cartItem}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
              removeItem={removeItem}
            />
          )
        })}
      </div>

      {!cartCount ? (
        <Slide in={props.open} timeout={1000} direction="up">
          <div>
            <Fade in={props.open} timeout={2000}>
              <Typography variant="body2" align="center" color="textSecondary">
                {actLanguage === "DEU"
                  ? "Einkaufswagen ist leer..."
                  : actLanguage === "RUS"
                  ? "Корзина пуста ..."
                  : actLanguage === "ENG"
                  ? " Cart is empty..."
                  : " Cart is empty..."}
              </Typography>
            </Fade>
          </div>
        </Slide>
      ) : (
        <>
          <Slide in={props.open} timeout={1000} direction="up">
            <div>
              <Fade in={props.open} timeout={2000}>
                <Typography
                  variant="body2"
                  align="right"
                  color="textPrimary"
                  style={{ marginRight: 10 }}
                >
                  {actLanguage === "DEU"
                    ? "Zwischensumme"
                    : actLanguage === "RUS"
                    ? "Предварительная сумма"
                    : actLanguage === "ENG"
                    ? "Subtotal"
                    : "Subtotal"}
                  : {formattedTotalPrice}
                </Typography>
              </Fade>
            </div>
          </Slide>

          <div className={classes.btnWrapper}>
            <Slide in={props.open} timeout={1000} direction="up">
              <div>
                <Fade in={props.open} timeout={2000}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      console.log(cartDetails)
                      setLoading(true)
                      redirectToCheckout()
                    }}
                  >
                    {loading
                      ? actLanguage === "DEU"
                        ? "Wird geladen..."
                        : actLanguage === "RUS"
                        ? "Загрузка ..."
                        : actLanguage === "ENG"
                        ? "Loading..."
                        : "Loading..."
                      : actLanguage === "DEU"
                      ? "Zur Kasse"
                      : actLanguage === "RUS"
                      ? "Оформить заказ"
                      : actLanguage === "ENG"
                      ? "Checkout"
                      : "Checkout"}
                  </Button>
                </Fade>
              </div>
            </Slide>
          </div>
        </>
      )}
    </div>
  )
}
