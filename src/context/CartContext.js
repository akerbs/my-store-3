import React, { useState, createContext, useEffect, useContext } from "react"
import { CurrencyContext } from "../components/layout"

const CartContext = createContext()

const CartContextProvider = props => {
  const [cart, setCart] = useState([])
  const { actCurrency } = useContext(CurrencyContext)

  function addToCart(el, quantity) {
    if (cart.find(x => x.productId === el.productId)) {
      let hardCopy = [...cart]
      for (let i in hardCopy) {
        if (hardCopy[i].productId === el.productId) {
          hardCopy[i].quantity = hardCopy[i].quantity + quantity
          break
        }
      }
      setCart(hardCopy)
    } else {
      setCart([...cart, { ...el, quantity: quantity }])
    }
  }

  function incrCartItem(el) {
    if (cart.find(x => x.productId === el.productId)) {
      let hardCopy = [...cart]
      for (let i in hardCopy) {
        if (hardCopy[i].productId === el.productId) {
          hardCopy[i].quantity = hardCopy[i].quantity + 1
          break
        }
      }
      setCart(hardCopy)
    } else {
      alert("which element to increment???")
    }
  }

  function decrCartItem(el) {
    let hardCopy = [...cart]
    for (let i in hardCopy) {
      if (hardCopy[i].productId === el.productId) {
        hardCopy[i].quantity = hardCopy[i].quantity - 1
        break
      }
    }
    setCart(hardCopy)
  }

  function removeFromCart(el) {
    let hardCopy = [...cart]
    hardCopy = hardCopy.filter(cartItem => cartItem.id !== el.id)
    setCart(hardCopy)
  }

  function clearCart() {
    let hardCopy = [...cart]
    hardCopy = hardCopy.splice(0, hardCopy.length)
    setCart(hardCopy)
  }

  const currentCurrency =
    actCurrency === "EUR"
      ? "eur"
      : actCurrency === "RUB"
      ? "rub"
      : actCurrency === "USD"
      ? "usd"
      : null

  const newArr = cart.map(el =>
    actCurrency === "EUR"
      ? el.priceEur
      : actCurrency === "RUB"
      ? el.priceRub
      : actCurrency === "USD"
      ? el.priceUsd
      : null * el.quantity
  )
  const ttlPrice = newArr.reduce((a, b) => a + b, 0)

  const priceF = ttlPrice.toString()
  const beforeDot = priceF.slice(0, -2)
  const afterDot = priceF.slice(-2)
  const corrPrice = `${beforeDot}.${afterDot}`
  const ttlPriceFormatted = Number(corrPrice)

  useEffect(() => {
    console.log("CART CONTAINS:", cart)
    console.log("TTL PRICE OF ITEMS IN CART (formatted):", ttlPriceFormatted)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        incrCartItem,
        decrCartItem,
        ttlPrice,
        ttlPriceFormatted,
        currentCurrency,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export { CartContextProvider, CartContext }

// setTimeout(() => {
//   handlePricesUpdate()
// }, 5000)

// useEffect(() => {
//   handlePricesUpdate()
// }, [usdRubRate, usdEurRate])

// addItem,
// removeItem,
// clearCart
// totalPrice,
// formattedTotalPrice,

// incrementItem,
// decrementItem,

// cartCount,
// cartDetails,
// redirectToCheckout,
