import React, { useState, useContext, useEffect, useRef } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles, fade } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import withWidth from "@material-ui/core/withWidth"
import Hidden from "@material-ui/core/Hidden"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { CurrencyContext } from "../layout"
import { LanguageContext } from "../layout"
import { CartContext } from "../../context/CartContext"
import Typography from "@material-ui/core/Typography"
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers"
import TextField from "@material-ui/core/TextField"
import clsx from "clsx"
import InputAdornment from "@material-ui/core/InputAdornment"
import payCard1 from "../../images/payCards/dark/1.png"
import payCard2 from "../../images/payCards/dark/2.png"
import payCard22 from "../../images/payCards/dark/22.png"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js"
import StripeInput from "./StripeInput"
import LockIcon from "@material-ui/icons/Lock"
import { navigate } from "gatsby"
import LinkToStripeInfo from "./linkToStripeInfo"
import { DrawerCartContext } from "../../context/DrawerCartContext"

const window = require("global/window")

const foolWidth = window.innerWidth <= 599 ? 288 : 380
const halfFoolWidth = foolWidth / 2
const selectMenuWidth = window.innerWidth <= 599 ? 288 : 348
const rootMarginLeft = window.innerWidth <= 599 ? "5%" : 0
const lockIconMarginLeft = window.innerWidth <= 599 ? "350%" : "470%"
const paymentCardsMarginRight = window.innerWidth <= 599 ? "11%" : "8%"

const useStyles = makeStyles(theme => ({
  root: {
    width: foolWidth,
    marginLeft: rootMarginLeft,
    minHeight: "100vh",
  },

  textfield: {
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: "8px 12px",
      margin: 0,

      maxHeight: 36,
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: 1,
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 4px`,
      },
    },

    // padding: "8px 12px",
  },

  textfieldFullWidth: {
    width: foolWidth,
  },
  textfieldFullWidthPartTop: {
    // paddingBottom: "-0.25%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `4px 4px 0 0 `,
        // borderWidth: "1px 1px  0 1px ",
        borderBottomColor: "transparent",
      },
      "&:hover fieldset": {
        borderBottomColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderBottomColor: theme.palette.primary.main,
      },
    },
  },
  textfieldFullWidthBetween: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 0,
        borderBottomColor: "transparent",
        // borderWidth: "0 1px 1px 1px",
      },
      "&:hover fieldset": {
        borderBottomColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderBottomColor: theme.palette.primary.main,
      },
    },
  },
  textfieldHalfLeft: {
    width: halfFoolWidth,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0 0 0 4px`,
        // borderTopColor: "transparent",
        borderRightColor: "transparent",
        // borderWidth: "0 0 1px 1px",
      },
      "&:hover fieldset": {
        borderRightColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderRightColor: theme.palette.primary.main,
      },
    },
  },
  textfieldHalfRight: {
    width: halfFoolWidth,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0 0 4px 0`,
        // borderTopColor: "transparent",
        // borderWidth: "0 1px 1px 1px",
      },
    },
  },

  textfieldError: {
    "& .MuiOutlinedInput-root": {
      color: "rgb(220,39,39)",

      "& fieldset": {
        borderWidth: 1,
        borderColor: "rgb(220,39,39)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(220,39,39)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .Mui-focused": {
      color: "black",
    },
  },
  textFieldLeftError: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRightColor: "transparent",
      },
      "&:hover fieldset": {
        borderRightColor: "transparent",
      },
    },
  },
  textFieldLeftErrorReset: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRightColor: "rgb(220,39,39)",
      },
      "&:hover fieldset": {
        borderRightColor: "rgb(220,39,39)",
      },
    },
  },

  textFieldBetweenError: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderBottomColor: "transparent",
      },
      "&:hover fieldset": {
        borderBottomColor: "transparent",
      },
    },
  },
  textFieldBetweenErrorReset: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderBottomColor: "rgb(220,39,39)",
      },
      "&:hover fieldset": {
        borderBottomColor: "rgb(220,39,39)",
      },
    },
  },
  errorMsg: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgb(220,39,39)",
  },

  selectRoot: {},
  select: {},
  selectMenu: {
    width: selectMenuWidth,
    padding: "2.109% 0 2.109% 3%",
    margin: 0,
    marginBottom: "-0.25%",
    fontSize: 16,
  },
  selectX: {
    "& li": {
      fontSize: 16,
    },
  },
}))

export default function MyCheckoutForm(props) {
  const classes = useStyles()
  const { actCurrency, countryCode } = useContext(CurrencyContext)
  const { handleDrawerCartClose } = useContext(DrawerCartContext)

  const { actLanguage } = useContext(LanguageContext)
  const {
    cart,
    clearCart,
    ttlPrice,
    currentCurrency,
    ttlPriceFormatted,
    currentCurrencySign,
  } = useContext(CartContext)
  const stripe = useStripe()
  const elements = useElements()

  // const { register, handleSubmit, errors, control } = useForm()
  const [stripeErrorMsg, setStripeErrorMsg] = useState(null)
  const [form, setForm] = useState({
    email: null,
    name: null,
    country: countryCode,
    line1: null,
    line2: null,
    postal_code: null,
    city: null,
  })
  const [error, setError] = useState({
    email: false,
    name: false,
    country: false,
    line1: false,
    line2: false,
    postal_code: false,
    city: false,
  })
  const [errorMsg, setErrorMsg] = useState({
    email: false,
    name: false,
    country: false,
    line1: false,
    line2: false,
    postal_code: false,
    city: false,
  })
  const [loading, setLoading] = useState(false)

  function handleLoadingOn() {
    setLoading(true)
  }
  function handleLoadingOff() {
    setLoading(false)
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    if (
      form.email !== null &&
      form.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    ) {
      setError({ email: false })
    }
  }, [form.email])

  useEffect(() => {
    if (
      form.name !== null &&
      form.name.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ name: false })
    }
  }, [form.name])

  useEffect(() => {
    if (
      form.country !== null &&
      form.country.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ country: false })
    }
  }, [form.country])

  useEffect(() => {
    if (
      form.line1 !== null &&
      form.line1.match(/([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i)
    ) {
      setError({ line1: false })
    }
  }, [form.line1])

  useEffect(() => {
    if (
      form.line2 === null ||
      form.line2 === "" ||
      form.line2 === "undefined" ||
      (form.line2 !== null &&
        form.line2.match(/([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i))
    ) {
      setError({ line2: false })
    }
  }, [form.line2])

  useEffect(() => {
    if (
      form.postal_code !== null &&
      form.postal_code.match(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/g)
    ) {
      setError({ postal_code: false })
    }
  }, [form.postal_code])

  useEffect(() => {
    if (
      form.city !== null &&
      form.city.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ city: false })
    }
  }, [form.city])

  const onSubmit = async event => {
    event.preventDefault()

    if (
      form.email === null ||
      !form.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    ) {
      setError({ email: true })
      setErrorMsg({ email: "Email field is incomplete." })
    } else if (
      form.name === null ||
      !form.name.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ name: true })
      setErrorMsg({ name: "Name field is incomplete." })
    } else if (
      form.country === null ||
      !form.country.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ country: true })
      setErrorMsg({ country: "Country field is incomplete." })
    } else if (
      form.line1 === null ||
      !form.line1.match(/([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i)
    ) {
      setError({ line1: true })
      setErrorMsg({ line1: "Address field is incomplete." })
    } else if (
      form.line2 !== null &&
      form.line2 !== "" &&
      form.line2 !== "undefined" &&
      !form.line2.match(/([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i)
    ) {
      setError({ line2: true })
      setErrorMsg({ line2: "Address field is incomplete." })
    } else if (
      form.postal_code === null ||
      !form.postal_code.match(/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/g)
    ) {
      setError({ postal_code: true })
      setErrorMsg({ postal_code: "Zip Code field is incomplete." })
    } else if (
      form.city === null ||
      !form.city.match(
        /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g
      )
    ) {
      setError({ city: true })
      setErrorMsg({ city: "City field is incomplete." })
    } else if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    } else {
      handleLoadingOn()
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: form.name,
          email: form.email,
          address: {
            country: form.country,
            line1: form.line1,
            line2: form.line2,
            postal_code: form.postal_code,
            city: form.city,
          },
        },
      })

      if (!error) {
        console.log("Stripe 23 | token generated!", paymentMethod)
        try {
          const { id } = paymentMethod

          const response = await fetch(
            " https://stripe-api-test-server.herokuapp.com/stripe/charge",
            {
              // const response = await fetch("http://localhost:8080/stripe/charge", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify(data),
              body: JSON.stringify({
                amount: ttlPrice,
                currency: currentCurrency,
                id: id,
                // receipt_email: form.email,
              }),
            }
          )
          if (response.ok) {
            setStripeErrorMsg(null)
            console.log("CheckoutForm.js 25 | payment successful!")
            // handleLoadingOff()
            clearCart()
            handleDrawerCartClose()
            navigate("/success")
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error)
        }
      } else {
        console.log(error.message)
        setStripeErrorMsg(error.message)
      }
    }
  }

  return (
    <div className={classes.root}>
      {window.innerWidth > 600 && (
        <Typography
          variant="body1"
          style={{ fontWeight: 600, color: "#303030" }}
        >
          Pay with card
        </Typography>
      )}

      <br />
      <form
        onSubmit={onSubmit}
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <span style={{ fontSize: 14 }}>Email</span>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            error.email && classes.textfieldError
          )}
        >
          <TextField
            type="email"
            variant="outlined"
            size="small"
            name="email"
            value={form.email}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: "Адрес эл. почты введен не полностью.",
            //   },
            // })}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {error.email && errorMsg.email}
        </span>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14 }}>Card information</span>
          {/* <span style={{ fontSize: 14 }}>error.message</span> */}
        </div>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop,
            stripeErrorMsg === "Your card number is incomplete." &&
              classes.textfieldError
          )}
        >
          <TextField
            id="cardNumber"
            variant="outlined"
            size="small"
            name="cardNumber"
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardNumberElement,
              },
              endAdornment: (
                //  <CreditCardIcon />
                <div
                  style={{
                    display: "flex",
                    padding: 0,
                    margin: 0,
                    marginRight: paymentCardsMarginRight,
                  }}
                >
                  <img
                    src={payCard1}
                    style={{ height: 17, padding: 0, margin: 0 }}
                  />
                  <img
                    src={payCard2}
                    style={{
                      height: 17,
                      padding: 0,
                      margin: 0,
                      marginLeft: "5%",
                    }}
                  />
                  <img
                    src={payCard22}
                    style={{
                      height: 17,
                      padding: 0,
                      margin: 0,
                      marginLeft: "5%",
                    }}
                  />
                </div>
              ),
              classes: {
                adornedEnd: classes.adornedEnd,
              },
            }}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfLeft,
            stripeErrorMsg === "Your card's expiration date is incomplete." &&
              classes.textfieldError
          )}
        >
          <TextField
            id="cardExpiry"
            variant="outlined"
            size="small"
            name="cardExpiry"
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement,
              },
            }}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfRight,
            stripeErrorMsg === "Your card's security code is incomplete." &&
              classes.textfieldError
          )}
        >
          <TextField
            id="cvvCvc"
            variant="outlined"
            size="small"
            name="cvvCvc"
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement,
              },
            }}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {stripeErrorMsg === "Your card number is incomplete." ||
          stripeErrorMsg === "Your card's expiration date is incomplete." ||
          stripeErrorMsg === "Your card's security code is incomplete."
            ? stripeErrorMsg
            : null}
        </span>
        <br />
        <br />
        <span style={{ fontSize: 14 }}>Name on card</span>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            error.name && classes.textfieldError
          )}
        >
          <TextField
            type="text"
            id="name"
            variant="outlined"
            size="small"
            name="name"
            value={form.name}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            // })}
          />
        </FormControl>
        <span className={classes.errorMsg}>{error.name && errorMsg.name}</span>
        <br /> <br />
        <span style={{ fontSize: 14 }}>Shipping address</span>
        <FormControl
          variant="outlined"
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop,
            error.country && classes.textfieldError
            // error.line1 &&
            //   error.city &&
            //   error.postal_code &&
            //   classes.textfieldError,
            // error.line1 &&
            //   error.city &&
            //   error.postal_code &&
            //   classes.textFieldBetweenError
          )}
        >
          {/* <Controller
            as={ */}
          <Select
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              selectMenu: classes.selectMenu,
            }}
            MenuProps={{ classes: { paper: classes.selectX } }}
            size="small"
            id="country"
            name="country"
            // control={control}
            defaultValue={form.country}
            value={form.country}
            onChange={changeHandler}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            // })}
          >
            <MenuItem value={"DE"} key={"DE"}>
              Germany
            </MenuItem>
            <MenuItem value={"FR"} key={"FR"}>
              France
            </MenuItem>
            <MenuItem value={"US"} key={"US"}>
              USA
            </MenuItem>
            <MenuItem value={"RU"} key={"RU"}>
              Russian Federation
            </MenuItem>
          </Select>
          {/* } */}
          {/* /> */}
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween,
            error.line1 && classes.textfieldError,
            error.line1 && classes.textFieldBetweenError,
            error.line1 && !error.city && classes.textFieldBetweenErrorReset,
            error.line1 &&
              !error.postal_code &&
              classes.textFieldBetweenErrorReset
          )}
        >
          <TextField
            id="line1"
            variant="outlined"
            placeholder="Адрес (строка 1)"
            size="small"
            name="line1"
            value={form.line1}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            //   pattern: {
            //     value: /([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i,
            //   },
            // })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween,
            error.line2 && classes.textfieldError,
            error.line1 &&
              error.city &&
              error.postal_code &&
              classes.textfieldError,
            error.line1 && classes.textFieldBetweenError
          )}
        >
          <TextField
            id="line2"
            variant="outlined"
            placeholder="Адрес (строка 2)"
            size="small"
            name="line2"
            value={form.line2}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   pattern: {
            //     value: /([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i,
            //   },
            // })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfLeft,
            error.postal_code && classes.textfieldError,
            error.postal_code && classes.textFieldLeftError,
            error.postal_code && !error.city && classes.textFieldLeftErrorReset
          )}
        >
          <TextField
            id="postal_code"
            variant="outlined"
            placeholder="Почтовый индекс"
            size="small"
            name="postal_code"
            value={form.postal_code}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            //   pattern: {
            //     value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/g,
            //   },
            // })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfRight,
            error.city && classes.textfieldError
          )}
        >
          <TextField
            id="city"
            variant="outlined"
            placeholder="Город"
            size="small"
            name="city"
            value={form.city}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
            // inputRef={register({
            //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
            //   pattern: {
            //     value: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g,
            //   },
            // })}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {(error.country && errorMsg.country) ||
            (error.line1 && errorMsg.line1) ||
            (error.line2 && errorMsg.line2) ||
            (error.postal_code && errorMsg.postal_code) ||
            (error.city && errorMsg.city)}
        </span>
        <br />
        <br />
        <br />
        <Button
          fullWidth
          color="primary"
          id="submit"
          name="submit"
          type="submit"
          variant="contained"
          disabled={!stripe || loading}
          style={{ textTransform: "none" }}
          endIcon={<LockIcon style={{ marginLeft: lockIconMarginLeft }} />}
        >
          {loading ? (
            actLanguage === "DEU" ? (
              "Verarbeitung..."
            ) : actLanguage === "RUS" ? (
              "Обработка ..."
            ) : actLanguage === "ENG" ? (
              "Processing..."
            ) : (
              "Processing..."
            )
          ) : (
            <span style={{ marginLeft: "10%" }}>
              {" "}
              Pay {currentCurrencySign}
              {ttlPriceFormatted}
            </span>
          )}
        </Button>
      </form>
      {window.innerWidth <= 599 && (
        <>
          <br />
          <LinkToStripeInfo />
        </>
      )}
    </div>
  )
}
