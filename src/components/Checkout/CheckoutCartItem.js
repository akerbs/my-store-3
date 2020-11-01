import React, { useContext, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import Counter from "../CounterLittle"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import Divider from "@material-ui/core/Divider"
import { navigate } from "gatsby"
import Slide from "@material-ui/core/Slide"
import Fade from "@material-ui/core/Fade"
import { LanguageContext } from "../layout"
import { CurrencyContext } from "../layout"
const window = require("global/window")

const CheckoutCartItemPadding =
  window.innerWidth <= 599 ? "0 4% 1% 5%" : "0 2% 3% 2%"

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "auto",
    padding: CheckoutCartItemPadding,
    backgroundColor: "inherit",
  },
  img: {
    margin: "auto",
    display: "block",
    width: 47,
    height: 47,
  },
}))

export default function CheckoutCartItem(props) {
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { actCurrency } = useContext(CurrencyContext)

  function getItemFormTotalPrice() {
    let itemTtlPrice =
      actCurrency === "EUR"
        ? props.cartItem.priceEur * props.cartItem.quantity
        : actCurrency === "RUB"
        ? props.cartItem.priceRub * props.cartItem.quantity
        : actCurrency === "USD"
        ? props.cartItem.priceUsd * props.cartItem.quantity
        : null

    let priceF = itemTtlPrice.toString()
    let beforeDot = priceF.slice(0, -2)
    let afterDot = priceF.slice(-2)
    let corrPrice = `${beforeDot}.${afterDot}`
    let formPrice = Number(corrPrice)
    let formPriceCorr = formPrice.toFixed(2)
    return formPriceCorr
  }
  function getItemFormPrice() {
    let itemPrice =
      actCurrency === "EUR"
        ? props.cartItem.priceEur
        : actCurrency === "RUB"
        ? props.cartItem.priceRub
        : actCurrency === "USD"
        ? props.cartItem.priceUsd
        : null

    let priceForm = itemPrice.toString()
    let beforeDot = priceForm.slice(0, -2)
    let afterDot = priceForm.slice(-2)
    let correctPrice = `${beforeDot}.${afterDot}`
    let formatPrice = Number(correctPrice)
    let formatPriceCorr = formatPrice.toFixed(2)
    return formatPriceCorr
  }

  return (
    <>
      <CssBaseline />

      <div className={classes.root}>
        <Paper className={classes.paper} elevation="0">
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <img
                className={classes.img}
                src={props.cartItem.firstImg}
                alt={
                  // props.cartItem.name
                  actLanguage === "DEU"
                    ? props.cartItem.nameDeu
                    : actLanguage === "RUS"
                    ? props.cartItem.nameRus
                    : actLanguage === "ENG"
                    ? props.cartItem.nameEng
                    : null
                }
              />
            </Grid>
            <Grid
              item
              xs={7}
              direction="column"
              spacing={1}
              // style={{ paddingLeft: "8px", paddingRight: 0 }}
            >
              <Typography
                style={{ fontWeight: 600, fontSize: 14, lineHeight: 2 }}
              >
                {actLanguage === "DEU"
                  ? props.cartItem.nameDeu
                  : actLanguage === "RUS"
                  ? props.cartItem.nameRus
                  : actLanguage === "ENG"
                  ? props.cartItem.nameEng
                  : null}
              </Typography>
              <Typography style={{ fontSize: 11, color: "#767676" }}>
                Qty: {props.cartItem.quantity},{" "}
                {actLanguage === "DEU"
                  ? props.cartItem.descriptionDeu
                  : actLanguage === "RUS"
                  ? props.cartItem.descriptionRus
                  : actLanguage === "ENG"
                  ? props.cartItem.descriptionEng
                  : null}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              direction="column"
              spacing={1}
              style={{ textAlign: "end" }}
            >
              <Typography
                color="textPrimary"
                style={{ fontWeight: 600, fontSize: 14, lineHeight: 2 }}
              >
                {actCurrency === "EUR"
                  ? props.cartItem.currencySignEur
                  : actCurrency === "RUB"
                  ? props.cartItem.currencySignRub
                  : actCurrency === "USD"
                  ? props.cartItem.currencySignUsd
                  : null}
                {getItemFormTotalPrice()}
              </Typography>
              <Typography style={{ fontSize: 11, color: "#767676" }}>
                {props.cartItem.quantity > 1 && actCurrency === "EUR"
                  ? props.cartItem.currencySignEur
                  : actCurrency === "RUB"
                  ? props.cartItem.currencySignRub
                  : actCurrency === "USD"
                  ? props.cartItem.currencySignUsd
                  : null}
                {props.cartItem.quantity > 1 && getItemFormPrice()}
                {props.cartItem.quantity > 1 && "/pc."}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        {/* <Divider variant="middle" light={true} /> */}
      </div>
    </>
  )
}
