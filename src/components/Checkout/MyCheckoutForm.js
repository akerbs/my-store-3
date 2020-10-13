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

const window = require("global/window")

const useStyles = makeStyles(theme => ({
  root: {
    width: 380,
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
    width: 380,
  },
  textfieldFullWidthPartTop: {
    marginBottom: "-0.25%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `4px 4px 0 0 `,
        // borderWidth: "1px 1px  0 1px ",
        borderBottomColor: "transparent",
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
    },
  },
  textfieldHalfLeft: {
    width: 190,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0 0 0 4px`,
        // borderTopColor: "transparent",
        borderRightColor: "transparent",
        // borderWidth: "0 0 1px 1px",
      },
    },
  },
  textfieldHalfRight: {
    width: 190,
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
      "& fieldset": {
        borderWidth: 1,
        borderColor: "rgb(220,45,45)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(220,45,45)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
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
  errorMsg: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgb(220,45,45)",
  },

  selectRoot: {},
  select: {},
  selectMenu: {
    width: 348,
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
  const { actCurrency, countryName } = useContext(CurrencyContext)
  const { actLanguage } = useContext(LanguageContext)
  const {
    cart,
    ttlPrice,
    currentCurrency,
    ttlPriceFormatted,
    currentCurrencySign,
  } = useContext(CartContext)
  const stripe = useStripe()
  const elements = useElements()
  const { register, handleSubmit, errors, control } = useForm()

  const onSubmit = async event => {
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    })

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod)
      try {
        const { id } = paymentMethod
        const response = await fetch("http://localhost:8080/stripe/charge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(data),
          body: JSON.stringify({
            amount: ttlPrice,
            currency: currentCurrency,
            id: id,
          }),
        })
        if (response.ok) {
          console.log("CheckoutForm.js 25 | payment successful!")
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error)
      }
    } else {
      console.log(error.message)
    }
  }

  return (
    <div className={classes.root}>
      <form
        // onSubmit={onSubmit}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <span style={{ fontSize: 14 }}>Email</span>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            errors.email && classes.textfieldError
          )}
        >
          <TextField
            type="email"
            variant="outlined"
            size="small"
            name="email"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Адрес эл. почты введен не полностью.",
              },
            })}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {errors.email && errors.email.message}
        </span>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14 }}>Card Data</span>
          {/* <span style={{ fontSize: 14 }}>error.message</span> */}
        </div>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop
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
                    marginRight: "8%",
                  }}
                >
                  <img
                    src={payCard1}
                    style={{ height: 18, padding: 0, margin: 0 }}
                  />
                  <img
                    src={payCard2}
                    style={{
                      height: 18,
                      padding: 0,
                      margin: 0,
                      marginLeft: "5%",
                    }}
                  />
                  <img
                    src={payCard22}
                    style={{
                      height: 18,
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
          className={clsx(classes.textfield, classes.textfieldHalfLeft)}
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
          className={clsx(classes.textfield, classes.textfieldHalfRight)}
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
          <br />
          <br />
        </FormControl>
        {/* <span style={{ fontSize: 14 }}> stripe errors</span> */}
        <span style={{ fontSize: 14 }}>Name on the Card</span>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            errors.name && classes.textfieldError
          )}
        >
          <TextField
            type="text"
            id="name"
            variant="outlined"
            size="small"
            name="name"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              // pattern: {
              //   value: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g,
              //   message: "Адрес эл. почты введен не полностью.",
              // },
            })}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {errors.name && errors.name.message}
        </span>
        <br /> <br />
        <span style={{ fontSize: 14 }}>Shipping Address</span>
        <FormControl
          variant="outlined"
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop,

            errors.country && classes.textfieldError,
            errors.address1 &&
              errors.city &&
              errors.zipCode &&
              classes.textfieldError,
            errors.address1 &&
              errors.city &&
              errors.zipCode &&
              classes.textFieldBetweenError
          )}
        >
          <Controller
            as={
              <Select>
                <MenuItem value={"Germany"}>Germany</MenuItem>
                <MenuItem value={"USA"}>USA</MenuItem>
                <MenuItem value={"Russian Federation"}>
                  Russian Federation
                </MenuItem>
              </Select>
            }
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              selectMenu: classes.selectMenu,
            }}
            MenuProps={{ classes: { paper: classes.selectX } }}
            size="small"
            id="country"
            name="country"
            // rules={{ required: "this is required" }}
            control={control}
            defaultValue={countryName}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              // pattern: {
              //   value: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g,
              //   message: "invalid country name",
              // },
            })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween,
            errors.address1 && classes.textfieldError,
            errors.address1 && classes.textFieldBetweenError
          )}
        >
          <TextField
            id="address1"
            variant="outlined"
            size="small"
            name="address1"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              pattern: {
                value: /([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i,
                // message: "Адрес введен не полностью.",
              },
            })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween,
            errors.address1 &&
              errors.city &&
              errors.zipCode &&
              classes.textfieldError,
            errors.address1 && classes.textFieldBetweenError
          )}
        >
          <TextField
            id="address2"
            variant="outlined"
            size="small"
            name="address2"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              // required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              pattern: {
                value: /([a-z ]{2,}\s{0,1})(\d{0,3})(\s{0,1}\S{2,})?/i,
                // message: "Адрес введен не полностью.",
              },
            })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfLeft,
            errors.zipCode && classes.textfieldError,
            errors.zipCode && classes.textFieldLeftError
          )}
        >
          <TextField
            id="zipCode"
            variant="outlined"
            size="small"
            name="zipCode"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
              pattern: {
                value: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/g,
                // message: "Индекс введен не полностью.",
              },
            })}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldHalfRight,
            errors.city && classes.textfieldError
          )}
        >
          <TextField
            id="city"
            variant="outlined"
            size="small"
            name="city"
            InputProps={{ style: { fontSize: 16 } }}
            inputRef={register({
              required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯv",
              pattern: {
                value: /[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]+/g,
                // message: "Город введен не полностью.",
              },
            })}
          />
        </FormControl>
        <span className={classes.errorMsg}>
          {(errors.country && errors.country.message) ||
            (errors.address1 && errors.address1.message) ||
            (errors.address2 && errors.address2.message) ||
            (errors.zipCode && errors.zipCode.message) ||
            (errors.city && errors.city.message)}
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
          disabled={!stripe}
          style={{ textTransform: "none" }}
          endIcon={<LockIcon style={{ marginLeft: "470%" }} />}

          // disabled={loading}
        >
          <span style={{ marginLeft: "10%" }}>
            {" "}
            Pay {ttlPriceFormatted} {currentCurrencySign}
          </span>
        </Button>
      </form>
    </div>
  )
}
