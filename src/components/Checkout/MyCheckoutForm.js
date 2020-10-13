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
      },
    },
  },
  textfieldFullWidthBetween: {
    //  marginBottom: "-0.25%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 0,
        borderWidth: "0 1px 1px 1px",
      },
    },
  },
  textfieldHalfLeft: {
    width: 190,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0 0 0 4px`,
        borderWidth: "0 0 1px 1px",
      },
    },
  },
  textfieldHalfRight: {
    width: 190,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `0 0 4px 0`,
        borderWidth: "0 1px 1px 1px",
      },
    },
  },

  selectRoot: {},
  select: {},
  selectMenu: {
    width: 348,
    padding: "2.109% 0 2.109% 3%",
    margin: 0,
    marginBottom: "-0.25%",
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

  const [form, setForm] = useState({
    email: "",
    name: "",
    country: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
  })

  useEffect(() => {
    console.log("F O R M", form)
  }, [form])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

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
            form,
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
        onSubmit={onSubmit}
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <span style={{ fontSize: 14 }}>Email</span>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldFullWidth)}
        >
          <TextField
            type="email"
            variant="outlined"
            size="small"
            name="email"
            value={form.email}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
          />
        </FormControl>
        <br /> <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 14 }}>Card Data</span>
          <span style={{ fontSize: 14 }}>error.message</span>
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
            className={clsx(classes.textfield, classes.textfieldHalfRight)}
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
        <span style={{ fontSize: 14 }}>Name on the Card</span>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldFullWidth)}
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
          />
        </FormControl>
        <br /> <br />
        <span style={{ fontSize: 14 }}>Shipping Address</span>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop
          )}
        >
          <Select
            MenuProps={{ classes: { paper: classes.selectX } }}
            variant="outlined"
            size="small"
            id="country"
            name="country"
            style={{ fontSize: 16 }}
            inputProps={{
              name: "country",
            }}
            defaultValue={countryName}
            value={form.country}
            onChange={changeHandler}
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              selectMenu: classes.selectMenu,
            }}
          >
            <MenuItem value={"Germany"}>Germany</MenuItem>
            <MenuItem value={"USA"}>USA</MenuItem>
            <MenuItem value={"Russian Federation"}>Russian Federation</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween
          )}
        >
          <TextField
            id="address1"
            variant="outlined"
            size="small"
            name="address1"
            value={form.address1}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
          />
        </FormControl>
        <FormControl
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthBetween
          )}
        >
          <TextField
            id="address2"
            variant="outlined"
            size="small"
            name="address2"
            value={form.address2}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfLeft)}
        >
          <TextField
            id="zipCode"
            variant="outlined"
            size="small"
            name="zipCode"
            value={form.zipCode}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfRight)}
        >
          <TextField
            id="city"
            variant="outlined"
            size="small"
            name="city"
            value={form.city}
            onChange={changeHandler}
            InputProps={{ style: { fontSize: 16 } }}
          />
        </FormControl>
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
