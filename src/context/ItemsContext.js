import React, { useState, createContext, useEffect } from "react"
import funnyBunny from "../images/products/funny_bunny/funny_bunny_2.jpg"
import catClock from "../images/products/cat_clock/cat_clock_1.jpg"
import magicHat from "../images/products/magic_hat/magic_hat_1.jpg"
import funnyBunny2 from "../images/products/funny_bunny/funny_bunny_1.jpg"

const ItemsContext = createContext()

const ItemsContextProvider = props => {
  const [products, setProducts] = useState([
    {
      linkId: "funny-bunny",
      productId: "prod_HqQT1Nni7ovIFj",
      nameEng: "Funny bunny",
      nameDeu: "Lustiger Hase",
      nameRus: "Забавный кролик",
      descriptionEng: "Great funny bunny",
      descriptionDeu: "Toller lustiger Hase",
      descriptionRus: "Отличный забавный кролик",
      videoId: "-i_94tW_iSM",
      firstImg: funnyBunny,
      scndImg: funnyBunny2,
      hovered: false,
      skuUsd: "price_1HNFcEHwITO0GSJr0BcSMXko",
      priceUsd: 0,
      currencyUsd: "USD",
      currencySignUsd: "$",
      skuEur: "price_1HGjcwHwITO0GSJrJEhUG0Aq",
      priceEur: 100, // 1 euro
      currencyEur: "EUR",
      currencySignEur: "€",
      skuRub: "price_1HNFbdHwITO0GSJr0cQgGhYQ",
      priceRub: 0,
      currencyRub: "RUB",
      currencySignRub: "₽",
      reviews: [
        {
          rating: 5,
          title: "Thank you!!!",
          review: "Super Bunny! I love it!",
          name: "Jenny F.",
          email: "skjdfhsd@sdft.sdf",
          date: "29/09/2020",
          linkId: "funny-bunny",
        },
        {
          rating: 3,
          title: "Not bad",
          review: "It 's ok",
          name: "Patric K.",
          email: "sdfsd@sdf.sd",
          date: "30/09/2020",
          linkId: "funny-bunny",
        },
      ],
      quantity: 1,
    },
    {
      linkId: "cat-clock",
      productId: "prod_HqorCSiih5dZWu",
      nameEng: "Cat clock",
      nameDeu: "Katzenuhr",
      nameRus: "Кошка-часы",
      descriptionEng: "Cat clock, color: black",
      descriptionDeu: "Katzenuhr, Farbe: schwarz",
      descriptionRus: "Кошка-часы, цвет: чёрный",
      videoId: "-i_94tW_iSM",
      firstImg: catClock,
      scndImg: funnyBunny2,
      hovered: false,
      skuUsd: "price_1HNFdPHwITO0GSJrVsLO5IdU",
      priceUsd: 0,
      currencyUsd: "USD",
      currencySignUsd: "$",
      skuEur: "price_1HH7DcHwITO0GSJrZz3vg6d9",
      priceEur: 100, // 1 euro
      currencyEur: "EUR",
      currencySignEur: "€",
      skuRub: "price_1HNFdwHwITO0GSJrpygU4AcI",
      priceRub: 0,
      currencyRub: "RUB",
      currencySignRub: "₽",
      reviews: [],
      quantity: 1,
    },
    {
      linkId: "magic-hat",
      productId: "prod_HrDKbPKHBo6qPK",
      nameEng: "Magic hat",
      nameDeu: "Magischer Hut",
      nameRus: "Волшебная шляпа",
      descriptionEng: "Magic hat, color: gray",
      descriptionDeu: "Magischer Hut, Farbe: grau",
      descriptionRus: "Волшебная шляпа, цвет: серый",
      videoId: "-i_94tW_iSM",
      firstImg: magicHat,
      scndImg: funnyBunny2,
      hovered: false,
      skuUsd: "price_1HMt2gHwITO0GSJrR1YuszFV",
      priceUsd: 0,
      currencyUsd: "USD",
      currencySignUsd: "$",
      skuEur: "price_1HHUu9HwITO0GSJrsoWoL51O",
      priceEur: 100, // 1 euro
      currencyEur: "EUR",
      currencySignEur: "€",
      skuRub: "price_1HNFZ7HwITO0GSJrieVKbbte",
      priceRub: 0,
      currencyRub: "RUB",
      currencySignRub: "₽",
      reviews: [],
      quantity: 1,
    },
  ])

  const [eurUsdRate, setEurUsdRate] = useState(0)
  const [eurRubRate, setEurRubRate] = useState(0)

  const handlePricesUpdate = id => {
    const nextState = products.map(item =>
      item.id === id
        ? {
            ...item,
            priceUsd: Number((item.priceEur * eurUsdRate).toFixed(2)),
            priceRub: Number((item.priceEur * eurRubRate).toFixed(2)),
          }
        : item
    )
    setProducts(nextState)
  }

  // setTimeout(() => {
  //   handlePricesUpdate()
  // }, 5000)

  useEffect(() => {
    handlePricesUpdate()
  }, [eurRubRate, eurUsdRate])

  // useEffect(() => {
  //   console.log("PROducts", products)
  //   products.map(item => console.log("priceUsd", item.priceUsd))
  //   products.map(item => console.log("priceEur", item.priceEur))
  //   products.map(item => console.log("priceRub", item.priceRub))
  // }, [products])

  useEffect(() => {
    function GetExchangeRates() {
      try {
        let response = fetch("https://api.exchangeratesapi.io/latest?base=EUR")
          .then(res => {
            return res.json()
          })
          .then(data => {
            // console.log("data.rates.EUR:", data.rates.EUR)
            // console.log("data.rates.RUB:", data.rates.RUB)
            setEurRubRate(data.rates.RUB.toFixed(2))
            setEurUsdRate(data.rates.USD.toFixed(2))
          })
      } catch (error) {
        console.log(error)
      }
    }

    GetExchangeRates()
  }, [])

  const changeHover = (val, bool) => {
    // console.log(val)
    setProducts(prevstate =>
      prevstate.map((item, idx) =>
        // console.log("STATES", item) ||
        idx === val ? { ...item, hovered: bool } : { ...item }
      )
    )
  }

  // setTimeout(() => {
  //   handlePricesUpdate()
  // }, 5000)

  return (
    <ItemsContext.Provider
      value={{
        products,
        changeHover,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  )
}

export { ItemsContextProvider, ItemsContext }
