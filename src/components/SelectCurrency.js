import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { CurrencyContext } from "../components/layout"
import { useShoppingCart } from "use-shopping-cart"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 80,

    margin: 0,
  },
  icon: {
    paddingLeft: 0,
  },
}))

export default function SelectCurrency() {
  const classes = useStyles()

  const { actCurrency, handleCurrencyChange } = useContext(CurrencyContext)

  const { clearCart } = useShoppingCart()

  return (
    <>
      <FormControl variant="standard" className={classes.formControl}>
        <Select
          classes={{
            icon: classes.icon,
          }}
          disableUnderline={true}
          autoWidth
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={actCurrency}
          onChange={e => {
            handleCurrencyChange(e)
            clearCart()
          }}
          // onChange={handleCurrencyChange}
          style={{ color: "white" }}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
          <MenuItem value={"EUR"}>EUR</MenuItem>
          <MenuItem value={"RUB"}>RUB</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}
