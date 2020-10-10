import React, { useContext } from "react"
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
import { LanguageContext } from "../../components/layout"
import { CurrencyContext } from "../../components/layout"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "auto",
    padding: 8,
  },
  imgBtn: {
    width: 100,
    height: 100,
    display: " inline-block",
    overflow: "hidden",
    transform: "translateZ(0)",
    borderRadius: "5%",
    // maskImage: "radial-gradient(white, black)",
    // borderRadius: "100%",
  },
  img: {
    margin: "auto",
    display: "block",
    width: 100,
    height: 100,
  },
}))

export default function CartItem(props) {
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { actCurrency } = useContext(CurrencyContext)

  const LinkToProductPage =
    props.cartItem.productId === "prod_HqQT1Nni7ovIFj"
      ? "funny-bunny"
      : props.cartItem.productId === "prod_HqorCSiih5dZWu"
      ? "cat-clock"
      : props.cartItem.productId === "prod_HrDKbPKHBo6qPK"
      ? "magic-hat"
      : null

  function formatPrice(price) {
    const priceF = price.toString()
    const beforeDot = priceF.slice(0, -2)
    const afterDot = priceF.slice(-2)
    const corrPrice = `${beforeDot}.${afterDot}`
    const formPrice = Number(corrPrice)

    return formPrice
  }

  return (
    <>
      <CssBaseline />
      <div style={{ overflow: "hidden" }}>
        <Slide in={props.open} timeout={1000} direction="up">
          <div className={classes.root}>
            <Paper className={classes.paper} elevation="0">
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <ButtonBase
                    onClick={() => {
                      navigate(`/products/${LinkToProductPage}`)
                      props.onClose()
                    }}
                    className={classes.imgBtn}
                  >
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
                  </ButtonBase>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm
                  container
                  style={{ paddingLeft: "8px", paddingRight: 0 }}
                >
                  <Grid item xs container direction="column" spacing={1}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        {
                          // props.cartItem.name

                          actLanguage === "DEU"
                            ? props.cartItem.nameDeu
                            : actLanguage === "RUS"
                            ? props.cartItem.nameRus
                            : actLanguage === "ENG"
                            ? props.cartItem.nameEng
                            : null
                        }
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {
                          // props.cartItem.description
                          actLanguage === "DEU"
                            ? props.cartItem.descriptionDeu
                            : actLanguage === "RUS"
                            ? props.cartItem.descriptionRus
                            : actLanguage === "ENG"
                            ? props.cartItem.descriptionEng
                            : null
                        }
                      </Typography>
                      <Typography variant="body2" color="textPrimary">
                        <Counter
                          incrementItem={props.incrementItem}
                          decrementItem={props.decrementItem}
                          removeItem={props.removeItem}
                          quantity={props.cartItem.quantity}
                          sku={
                            // props.cartItem.sku
                            actCurrency === "EUR"
                              ? props.cartItem.skuEur
                              : actCurrency === "RUB"
                              ? props.cartItem.skuRub
                              : actCurrency === "USD"
                              ? props.cartItem.skuUsd
                              : null
                          }
                        />{" "}
                        {/* {(props.item.currency = "eur" ? "€" : props.item.currency)}{" "} */}
                        {/* {corrPrice} */}
                        {
                          // props.cartItem.price
                          formatPrice(
                            actCurrency === "EUR"
                              ? props.cartItem.priceEur
                              : actCurrency === "RUB"
                              ? props.cartItem.priceRub
                              : actCurrency === "USD"
                              ? props.cartItem.priceUsd
                              : null
                          ) * props.cartItem.quantity
                        }{" "}
                        {actCurrency === "EUR"
                          ? props.cartItem.currencySignEur
                          : actCurrency === "RUB"
                          ? props.cartItem.currencySignRub
                          : actCurrency === "USD"
                          ? props.cartItem.currencySignUsd
                          : null}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginRight: "5%" }}>
                    <Typography variant="subtitle1">
                      <IconButton
                        size="small"
                        onClick={() =>
                          props.removeItem(
                            // props.cartItem.sku
                            actCurrency === "EUR"
                              ? props.cartItem.skuEur
                              : actCurrency === "RUB"
                              ? props.cartItem.skuRub
                              : actCurrency === "USD"
                              ? props.cartItem.skuUsd
                              : null
                          )
                        }
                        style={{ padding: 0 }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Divider variant="middle" light={true} />
          </div>
        </Slide>
      </div>
    </>
  )
}
