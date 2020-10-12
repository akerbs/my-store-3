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
    marginBottom: "-0.25%",
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
    padding: "2.109% 0 2.109% 0",
    margin: 0,
    marginBottom: "-0.25%",
  },
}))

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email field can't be empty")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Invalid email"
    ),
  cardNumber: yup
    .string()
    .required("Field is required")
    .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number"), // CHANGE!!!!
  cardDuration: yup
    .string()
    .required("Field is required")
    .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number"), // CHANGE!!!!
  cvcCvc: yup
    .string()
    .required("Field is required")
    .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number"), // CHANGE!!!!
  nameOnCard: yup
    .string()
    // .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number") // CHANGE!!!!
    .required("Name field can't be empty")
    .min(3, "Name must be at-least 3 characters")
    .max(20, "Name must be 20 characters or less"),
  country: yup.string().required("Field is required"),

  address1: yup
    .string()
    // .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number") // CHANGE!!!!
    .required("Name field can't be empty")
    .min(3, "Name must be at-least 3 characters")
    .max(20, "Name must be 20 characters or less"),
  address2: yup
    .string()
    // .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number") // CHANGE!!!!
    .required("Name field can't be empty")
    .min(3, "Name must be at-least 3 characters")
    .max(20, "Name must be 20 characters or less"),
  zipCode: yup
    .string()
    // .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number") // CHANGE!!!!
    .required("Name field can't be empty")
    .min(3, "Name must be at-least 3 characters")
    .max(20, "Name must be 20 characters or less"),
  city: yup
    .string()
    // .matches(/^[0-9\-\+]{9,15}$/, "incorrect phone number") // CHANGE!!!!
    .required("Name field can't be empty")
    .min(3, "Name must be at-least 3 characters")
    .max(20, "Name must be 20 characters or less"),
})

export default function MyCheckoutForm(props) {
  const classes = useStyles()
  const { actCurrency } = useContext(CurrencyContext)
  const { actLanguage } = useContext(LanguageContext)
  const { cart } = useContext(CartContext)
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  })

  const errorEmail = errors.hasOwnProperty("email") && errors["email"].message
  const errorCardNumber =
    errors.hasOwnProperty("cardNumber") && errors["cardNumber"].message
  const errorCardDuration =
    errors.hasOwnProperty("cardDuration") && errors["cardDuration"].message
  const errorCvcCvc =
    errors.hasOwnProperty("cvcCvc") && errors["cvcCvc"].message
  const errorNameOnCard =
    errors.hasOwnProperty("nameOnCard") && errors["nameOnCard"].message
  const errorCountry =
    errors.hasOwnProperty("country") && errors["country"].message
  const errorAddress1 =
    errors.hasOwnProperty("address1") && errors["address1"].message
  const errorAddress2 =
    errors.hasOwnProperty("address2") && errors["address2"].message
  const errorZipCode =
    errors.hasOwnProperty("zipCode") && errors["zipCode"].message
  const errorCity = errors.hasOwnProperty("city") && errors["city"].message

  return (
    <div className={classes.root}>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <span style={{ fontSize: 14 }}>Email</span>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldFullWidth)}
        >
          <TextField
            // classes={{
            //   root: classes.rootTextField,
            // }}
            type="email"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="email"
            // autoFocus
            inputRef={register()}
            error={!!errorEmail}
            helperText={errorEmail}
          />
        </FormControl>
        <br /> <br />
        <span style={{ fontSize: 14 }}>Card Data</span>
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
            // margin="normal"
            fullWidth
            size="small"
            name="cardNumber"
            //autoFocus
            inputRef={register()}
            error={!!errorCardNumber}
            helperText={errorCardNumber}
            InputProps={{
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
            // endAdornment={
            //   <InputAdornment position="end">
            //     <VisibilityIcon />
            //     {/* <payCard1 style={{ width: 10, height: 5 }} /> */}
            //   </InputAdornment>
            // }
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfLeft)}
        >
          <TextField
            id="cardDuration"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="cardDuration"
            //autoFocus

            inputRef={register()}
            error={!!errorCardDuration}
            helperText={errorCardDuration}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfRight)}
        >
          <TextField
            id="cvvCvc"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="cvvCvc"
            //autoFocus

            inputRef={register()}
            error={!!errorCvcCvc}
            helperText={errorCvcCvc}
          />
          <br />
          <br />
        </FormControl>
        <span style={{ fontSize: 14 }}>Name on the Card</span>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldFullWidth)}
        >
          <TextField
            id="name"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="name"
            //autoFocus

            inputRef={register()}
            error={!!errorNameOnCard}
            helperText={errorNameOnCard}
          />
        </FormControl>
        <br /> <br />
        <span style={{ fontSize: 14 }}>Payment Address</span>
        <FormControl
          variant="outlined"
          className={clsx(
            classes.textfield,
            classes.textfieldFullWidth,
            classes.textfieldFullWidthPartTop
          )}
        >
          <Controller
            as={
              <Select>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11-15</MenuItem>
                <MenuItem value={16}>16-20</MenuItem>
                <MenuItem value={20}>20+</MenuItem>
              </Select>
            }
            size="small"
            id="country"
            name="country"
            rules={{ required: "this is required" }}
            control={control}
            defaultValue={10}
            error={!!errorCountry}
            helperText={errorCountry}
            classes={{
              root: classes.selectRoot,
              select: classes.select,
              selectMenu: classes.selectMenu,
            }}
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
            id="address1"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="address1"
            //autoFocus

            inputRef={register()}
            error={!!errorAddress1}
            helperText={errorAddress1}
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
            // margin="normal"
            fullWidth
            size="small"
            name="address2"
            //autoFocus

            inputRef={register()}
            error={!!errorAddress2}
            helperText={errorAddress2}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfLeft)}
        >
          <TextField
            id="zipCode"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="zipCode"
            //autoFocus
            inputRef={register()}
            error={!!errorZipCode}
            helperText={errorZipCode}
          />
        </FormControl>
        <FormControl
          className={clsx(classes.textfield, classes.textfieldHalfRight)}
        >
          <TextField
            id="city"
            variant="outlined"
            // margin="normal"
            fullWidth
            size="small"
            name="city"
            //autoFocus
            inputRef={register()}
            error={!!errorCity}
            helperText={errorCity}
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
          // className={classes.reservierenBtn}
          // disabled={loading}
        >
          ok
        </Button>
      </form>
    </div>
  )
}
