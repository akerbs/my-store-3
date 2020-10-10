import React, { useState, useContext } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
// import { useShoppingCart } from "use-shopping-cart"
import CartItem from "./CartItem"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"
import { LanguageContext } from "../../components/layout"
import { CurrencyContext } from "../../components/layout"
import { CartContext } from "../../context/CartContext"
import { navigate } from "gatsby"

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
  const { actCurrency } = useContext(CurrencyContext)

  // const {
  //   incrementItem,
  //   decrementItem,
  //   removeItem,
  //   cartCount,
  //   cartDetails,
  //   // totalPrice,
  //   formattedTotalPrice,
  //   redirectToCheckout,
  // } = useShoppingCart()

  const {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    incrCartItem,
    decrCartItem,
    ttlPriceFormatted,
  } = useContext(CartContext)

  // console.log("cartDetails:", cartDetails)

  return (
    <div>
      <CssBaseline />
      <div>
        {Object.keys(cart).map((item, idx) => {
          const cartItem = cart[item]
          return (
            <CartItem
              onClose={props.onClose}
              open={props.open}
              key={idx}
              cartItem={cartItem}
              incrementItem={incrCartItem}
              decrementItem={decrCartItem}
              removeItem={removeFromCart}
            />
          )
        })}
      </div>

      {!cart.length ? (
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
                  : {ttlPriceFormatted}{" "}
                  {actCurrency === "EUR"
                    ? "€"
                    : actCurrency === "RUB"
                    ? "₽"
                    : actCurrency === "USD"
                    ? "$"
                    : null}
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
                      // console.log(cart)
                      setLoading(true)
                      navigate("/checkout")
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
