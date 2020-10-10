import React, { useState, useContext, createContext, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"
import "./layout.css"
import { makeStyles } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/core/styles"
import theme from "./theme"
import "@stripe/stripe-js" // https://github.com/stripe/stripe-js#import-as-a-side-effect
import { CartProvider } from "use-shopping-cart"
import { loadStripe } from "@stripe/stripe-js"
import SimpleReactLightbox from "simple-react-lightbox"
import { DrawerCartContextProvider } from "../context/DrawerCartContext"
import { DrawerMenuContextProvider } from "../context/DrawerMenuContext"
import { ItemsContextProvider } from "../context/ItemsContext"
import { CartContextProvider } from "../context/CartContext"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const window = require("global/window")
const document = require("global/document")

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fafafa",
    maxWidth: "100vw",
    margin: 0,
    padding: 0,
    overflow: "hidden",
  },
}))

const stripePromise = loadStripe(
  // process.env.GATSBY_STRIPE_PUBLISHABLE_KEY
  "pk_test_51HGUuRHwITO0GSJr0YK6FwbE17LUTst9UCvm2uH0RdjBtAnQJqgPmDn0BSunRc8FIEXRW3HatsFd1uDHkfaGJtUm00IA2780Iw"
)
export const CurrencyContext = createContext()
export const LanguageContext = createContext()

function Layout({ children }) {
  const classes = useStyles()

  const [actCurrency, setActCurrency] = useState("EUR")
  const [actLanguage, setActLanguage] = useState("ENG")

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    if (typeof window !== `undefined`) {
      // console.log("LANGUAGE: ", window.navigator.language.slice(0, 2))

      if (window.navigator.language.slice(0, 2) === "ru") {
        setActLanguage("RUS")
      } else if (window.navigator.language.slice(0, 2) === "de") {
        setActLanguage("DEU")
      } else if (window.navigator.language.slice(0, 2) === "en") {
        setActLanguage("ENG")
      } else {
        setActLanguage("ENG")
      }
    }
  }, [])

  // useEffect(() => {
  //   async function getLocation() {
  //     const response = await fetch("https://ipapi.co/json")

  //     const info = await response.json()
  //     const countryCode = info.country_code

  //     countryCode == "US"
  //       ? setActCurrency("USD")
  //       : countryCode == "DE"
  //       ? setActCurrency("EUR")
  //       : countryCode == "RU"
  //       ? setActCurrency("RUB")
  //       : setActCurrency("USD")

  //     return countryCode
  //   }
  //   getLocation().then(countryCode => console.log("COUNTRY CODE:", countryCode))
  // }, [])

  useEffect(() => {
    function getLocation() {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          let latitude = position.coords.latitude
          let longitude = position.coords.longitude
          // console.log(latitude, longitude)
          const url = `http://api.geonames.org/countryCodeJSON?lat=${latitude}&lng=${longitude}&username=anker2702`

          const response = fetch(url)
            .then(res => {
              return res.json()
            })
            .then(data => {
              data.countryCode == "US"
                ? setActCurrency("USD")
                : data.countryCode == "DE"
                ? setActCurrency("EUR")
                : data.countryCode == "RU"
                ? setActCurrency("RUB")
                : setActCurrency("USD")
              // console.log("!!!!!ABC!!!!!", data)
            })
            .catch(err => {
              console.log(err)
            })
          // console.log(latitude, longitude)
        },
        error => {
          console.log(error.code)
        }
      )
    }
    getLocation()
  }, [])

  function handleCurrencyChange(event) {
    setActCurrency(event.target.value)
    // clearCart();
    //  forceUpdate()
  }
  function handleLanguageChange(event) {
    setActLanguage(event.target.value)
  }

  return (
    <div className={classes.root}>
      <GoogleReCaptchaProvider reCaptchaKey="6LebfdIZAAAAAJ_QgpOdjwdM9zUUNAi7aIFCtjp-">
        <CurrencyContext.Provider
          value={{
            actCurrency,
            handleCurrencyChange,
          }}
        >
          <CartProvider
            mode="client-only"
            stripe={stripePromise}
            currency={actCurrency}
            // successUrl="https://kerbs-store-1.vercel.app/success/"
            // cancelUrl="https://kerbs-store-1.vercel.app/"
            successUrl="http://localhost:8000/success/"
            cancelUrl="http://localhost:8000/"
            // successUrl={`${window.location.origin}/success/`}
            // cancelUrl={`${window.location.origin}/`}
            //  allowedCountries={["US", "GB", "CA", "DE"]}
            billingAddressCollection={true}
          >
            <LanguageContext.Provider
              value={{
                actLanguage,
                setActLanguage,
                handleLanguageChange,
              }}
            >
              <ItemsContextProvider>
                <CartContextProvider>
                  <CssBaseline />
                  <ThemeProvider theme={theme}>
                    <SimpleReactLightbox>
                      <DrawerMenuContextProvider>
                        <DrawerCartContextProvider>
                          {children}
                        </DrawerCartContextProvider>
                      </DrawerMenuContextProvider>
                    </SimpleReactLightbox>
                  </ThemeProvider>
                </CartContextProvider>
              </ItemsContextProvider>
            </LanguageContext.Provider>
          </CartProvider>
        </CurrencyContext.Provider>
      </GoogleReCaptchaProvider>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
