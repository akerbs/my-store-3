import React, { useContext, useState, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"

// import products from "../components/Products/data/products"
// import products from "../components/Products/data/products"
import Items from "../components/AllProductsPage/Items"
// import SkusEur from "../components/Products/SkusEur"
// import SkusUsd from "../components/Products/SkusUsd"
// import SkusRub from "../components/Products/SkusRub"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { CurrencyContext } from "../components/layout"
import Scroll from "../components/ScrollToTopBtn"
import Slide from "@material-ui/core/Slide"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import inView from "in-view"
import SubscribeWindow from "../components/Subscribe/SubscribeWindow"

const document = require("global/document")

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentWrapper: {
    flex: "1 0 auto",
    marginTop: "10vh",
  },
}))

export default function IndexPage(props) {
  // console.log("DATA:", products)
  const classes = useStyles()
  const { actCurrency } = useContext(CurrencyContext)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [openSubscribeWindow, setOpenSubscribeWindow] = useState(false)
  const [visited, setVisited] = useState(false)
  // console.log("COOKIES:", document.cookie.indexOf("visited"))

  // setTimeout(() => {
  //   handleOpenSubscribeWindow()
  // }, 3000)

  useEffect(() => {
    if (
      document.cookie.indexOf("visited") >= 0 ||
      visited ||
      (document.cookie.indexOf("visited") >= 0 && visited)
    ) {
      console.log(
        "Already visited",
        document.cookie.indexOf("visited"),
        "times"
      )
    } else {
      const expiry = new Date()
      expiry.setTime(expiry.getTime() + 5 * 365 * 24 * 60 * 60 * 1000) // Five years
      document.cookie = "visited=yes; expires=" + expiry.toUTCString()
      // alert("this is your first time")

      const timer = setTimeout(() => {
        handleOpenSubscribeWindow()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleOpenSubscribeWindow = () => {
    setOpenSubscribeWindow(true)
  }
  const handleCloseSubscribeWindow = () => {
    setOpenSubscribeWindow(false)
    setVisited(true)
  }

  function startInView1() {
    setShow1(true)
  }
  function stopInView1() {
    setShow1(false)
  }

  function startInView2() {
    setShow2(true)
  }
  function stopInView2() {
    setShow2(false)
  }

  useEffect(() => {
    // inView(".selector1").on("enter", startInView1).on("exit", stopInView1)
    inView(".selector1").once("enter", startInView1)
    // inView(".selector2").on("enter", startInView2).on("exit", stopInView2)
    inView(".selector2").once("enter", startInView2)
    inView.threshold(0.5)
  })

  return (
    <div className={classes.root}>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <CssBaseline />
      <Header />
      <Scroll showBelow={250} />
      <Container maxWidth="md" className={classes.contentWrapper}>
        <div style={{ overflow: "hidden" }} className="selector1">
          <Slide in={show1} timeout={1000} direction="up">
            <div>
              <h1>Home page</h1>
            </div>
          </Slide>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum modi
          itaque ratione. Omnis, dolores voluptas quia recusandae similique
          corrupti quae vero veniam id blanditiis beatae, nobis est totam. Dicta
          voluptates illo ipsum excepturi ipsam saepe dolorum molestiae,
          quisquam officia rerum illum, eaque in quaerat corporis omnis repellat
          vero sint. Exercitationem, libero, nisi ab quod atque accusantium
          voluptatum recusandae quibusdam asperiores eligendi, incidunt amet.
          Ipsa qui consequatur laboriosam libero omnis. Magnam omnis, soluta
          ipsam quaerat ut, impedit reprehenderit placeat ipsum repudiandae
          maxime aut itaque molestias amet, et sit commodi nisi! Iusto ratione
          distinctio et aperiam quaerat nisi aut odit optio impedit. vero sint.
          Exercitationem, libero, nisi ab quod atque accusantium voluptatum
          recusandae quibusdam asperiores eligendi, incidunt amet. Ipsa qui
          quisquam officia rerum illum, eaque in quaerat corporis omnis repellat
          vero sint. Exercitationem, libero, nisi ab quod atque accusantium
          voluptatum recusandae quibusdam asperiores eligendi, incidunt amet.
          Ipsa qui consequatur laboriosam libero omnis. Magnam omnis, soluta
          ipsam quaerat ut, impedit reprehenderit placeat ipsum repudiandae
          maxime aut itaque molestias amet, et sit commodi nisi! Iusto ratione
          distinctio et aperiam quaerat nisi aut odit optio impedit. vero sint.
          Exercitationem, libero, nisi ab quod atque accusantium voluptatum vero
          sint. Exercitationem, libero, nisi ab quod atque accusantium
          voluptatum recusandae quibusdam asperiores eligendi, incidunt amet.
          Ipsa qui consequatur laboriosam libero omnis. Magnam omnis, soluta
          ipsam quaerat ut, impedit reprehenderit placeat ipsum repudiandae
          maxime aut itaque molestias amet, et sit commodi nisi! Iusto ratione
          distinctio et aperiam quaerat nisi aut odit optio impedit. vero sint.
          Exercitationem, libero, nisi ab quod atque accusantium voluptatum
          recusandae quibusdam asperiores eligendi, incidunt amet. Ipsa qui
          consequatur laboriosam libero omnis. Magnam omnis, soluta ipsam
          quaerat ut, impedit reprehenderit placeat ipsum repudiandae maxime aut
          itaque molestias amet, et sit commodi nisi! Iusto ratione distinctio
          et aperiam quaerat nisi aut odit optio impedit. vero sint.
          Exercitationem, libero, nisi ab quod atque accusantium voluptatum
          recusandae quibusdam asperiores eligendi, incidunt amet. Ipsa qui
          consequatur laboriosam libero omnis. Magnam omnis, soluta ipsam
          quaerat ut, impedit reprehenderit placeat ipsum repudiandae maxime aut
        </p>

        {/* <Items /> */}
      </Container>

      <Footer />
      <SubscribeWindow
        open={openSubscribeWindow}
        onClose={handleCloseSubscribeWindow}
      />
    </div>
  )
}
