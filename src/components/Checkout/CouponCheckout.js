import React, { useState, useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import { Input } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { useShoppingCart } from "use-shopping-cart"
import Divider from "@material-ui/core/Divider"
import { LanguageContext } from "../layout"
import { CurrencyContext } from "../layout"
import { CartContext } from "../../context/CartContext"
const window = require("global/window")

const couponMargin = window.innerWidth <= 599 ? "6.7% 6% 0% 6%" : "2% 5% 0% 2%"

const useStyles = makeStyles(theme => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: "25ch",
    // },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      // "& fieldset": {
      //   borderWidth: 1,
      //   borderColor: "#e0e0e0",
      // },
      "&:hover fieldset": {
        borderColor: "#c4c4c4",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
        // borderWidth: 1,
        // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 4px`,
      },
    },
  },
  couponMsg: {
    margin: couponMargin,
    marginTop: 0,

    fontSize: 13,
    color: theme.palette.primary.main,
  },
}))

export default function () {
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { actCurrency } = useContext(CurrencyContext)

  const { changeTtlPriceFormattedWithCoupon, couponUsed } = useContext(
    CartContext
  )

  const [couponValue, setCouponValue] = useState("")
  const [couponMsg, setCouponMsg] = useState(null)

  useEffect(() => {
    if (couponValue === "" || couponValue === "undefined") {
      setCouponMsg(null)
    }
  }, [couponValue])

  function handleCoupon() {
    if (couponValue !== false && couponValue !== "10%OFF") {
      setCouponMsg("discount is incorrect ")
    } else if (couponUsed === true) {
      setCouponMsg("discount was already used")
    } else if (couponUsed === false && couponValue === "10%OFF") {
      changeTtlPriceFormattedWithCoupon(10)
      // alert("10%OFF")
      setCouponMsg("discount is successful :)")
    }
  }

  return (
    <div style={{ marginBottom: "5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",

          margin: couponMargin,
        }}
      >
        <TextField
          className={classes.textField}
          inputProps={{
            style: {
              padding: "2.55%",
              width: "330px",
            },
          }}
          placeholder={"Gift card or discount code"}
          // id="outlined-basic"

          variant="outlined"
          onChange={e => setCouponValue(e.target.value)}
          value={couponValue}
        />
        <Button
          size="small"
          variant="contained"
          style={{ marginLeft: "5%", textTransform: "none" }}
          onClick={handleCoupon}
          disabled={!couponValue}
        >
          Apply
        </Button>
      </div>
      <span className={classes.couponMsg}>{couponMsg}</span>

      <Divider variant="middle" light={true} />
    </div>
  )
}
