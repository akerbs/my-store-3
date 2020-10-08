// import React, { useState } from "react"
// import { makeStyles } from "@material-ui/core/styles"
// import TextField from "@material-ui/core/TextField"
// import { Input } from "@material-ui/core"
// import Button from "@material-ui/core/Button"
// import { useShoppingCart } from "use-shopping-cart"

// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }))

// export default function BasicTextFields() {
//   const classes = useStyles()
//   const [couponValue, setCouponValue] = useState("")
//   const [ttlPriceWithCoupon, setTtlPriceWithCoupon] = useState("")

//   const { formattedTotalPrice } = useShoppingCart()

//   function handleCoupon() {
//     if (couponValue === "10%OFF") {
//       setTtlPriceWithCoupon(formattedTotalPrice * 0.9)
//       console.log("!!!")
//     }
//     console.log(ttlPriceWithCoupon)
//   }

//   return (
//     <>
//       <TextField
//         id="outlined-basic"
//         label="Outlined"
//         variant="outlined"
//         onChange={e => setCouponValue(e.target.value)}
//         value={couponValue}
//       />
//       <Button variant="contained" onClick={handleCoupon}>
//         Default
//       </Button>
//     </>
//   )
// }
