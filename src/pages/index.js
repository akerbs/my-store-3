import React, { useContext, useState, useEffect } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Link } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import Items from "../components/AllProductsPage/Items"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import { CurrencyContext } from "../components/layout"
import Scroll from "../components/ScrollToTopBtn"
import Slide from "@material-ui/core/Slide"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import inView from "in-view"
import SubscribeWindow from "../components/Subscribe/SubscribeWindow"
import cloud1 from "../images/cloud1.png"
import cloud2 from "../images/cloud2.png"
import cloud3 from "../images/cloud3.png"
import cloud4 from "../images/cloud4.png"
import cloud5 from "../images/cloud5.png"
import bgImg from "../images/bg.jpg"
import { HeaderHeightContext } from "../components/layout"
import "./index.css"

const document = require("global/document")

const useStyles = makeStyles(theme => ({
  // root: {
  //   // display: "flex",
  //   // flexDirection: "column",
  //   // minHeight: "100vh",
  // },
  // contentWrapper: {
  //   // flex: "1 0 auto",
  //   // marginTop: "10vh",
  //   margin: 0,
  //   padding: 0,
  //   boxSizing: "border-box",
  //   fontFamily: `"Poppins", sans-serif`,
  // },
  // banner: {
  //   position: "relative",
  //   width: "100vw",
  //   height: "100vh",
  //   background: `url(${bgImg})`,
  //   backgroundPosition: "bottom",
  //   // backgroundSize: "cover",
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // title1: {
  //   position: "relative",
  //   color: "#fff",
  //   fontSize: "12em",
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "5em",
  //   },
  // },
  // clouds: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  //   overflow: "hidden",
  //   pointerEvents: "none",
  // },
  // cloudsImg: {
  //   position: "absolute",
  //   bottom: -20,
  //   maxWidth: "100%",
  //   animation: "$animate calc(3s * var(--i)) linear infinite",
  // },
  // "@keyframes animate": {
  //   // "0%": {
  //   //   opacity: 0,
  //   //   transform: "scale(1)",
  //   // },
  //   // '25%", "75%': {
  //   //   opacity: 1,
  //   // },
  //   // "100%": {
  //   //   opacity: 0,
  //   //   transform: "scale(3)",
  //   // },
  //   "0% ": {
  //     transform: "translateX(-100%)",
  //   },
  //   "100%": {
  //     transform: "translateX(100%)",
  //   },
  // },
  // section: {
  //   position: "relative",
  //   padding: "7%",
  //   [theme.breakpoints.down("sm")]: {
  //     padding: "10%",
  //   },
  // },
  // title2: {
  //   position: "relative",
  //   marginBottom: "5%",
  //   // display: "flex",
  //   textAlign: "center",
  //   fontSize: "2.5em",
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "1.8em",
  //   },
  // },
}))

export default function IndexPage(props) {
  // console.log("DATA:", products)
  const { headerHeight } = useContext(HeaderHeightContext)

  const classes = useStyles()
  const { actCurrency } = useContext(CurrencyContext)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [openSubscribeWindow, setOpenSubscribeWindow] = useState(true)
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
      expiry.setTime(expiry.getTime() + 5 * 365 * 24 * 60 * 60 * 1000) // Five years  5 * 365 * 24 * 60 * 60 * 1000
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

  // let onScroll = () => {
  //   let title2 = document.getElementById("title2")
  //   let value = window.scrollY
  //   title2.style.marginBottom = value * 2 + "px"
  // }
  // useEffect(() => {
  //   if (window) {
  //     window.addEventListener("scroll", onScroll)
  //   }
  //   return () => {
  //     window.removeEventListener("scroll", onScroll)
  //   }
  // }, [])

  return (
    <div className="root">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <CssBaseline />
      <Header />
      <Scroll showBelow={250} />
      <div
        // maxWidth="md"
        className="contentWrapper"
        style={{ marginTop: headerHeight }}
      >
        <div className="banner">
          <h2 className="title1">Heaven</h2>
          <div className="clouds">
            <img
              src={cloud1}
              className="cloudsImg"
              style={{ ["--i"]: 1 }}
              // {...{ [i]: 1 }}
            />
            <img src={cloud2} className="cloudsImg" style={{ ["--i"]: 2 }} />
            <img src={cloud3} className="cloudsImg" style={{ ["--i"]: 3 }} />
            <img src={cloud4} className="cloudsImg" style={{ ["--i"]: 4 }} />
            <img src={cloud5} className="cloudsImg" style={{ ["--i"]: 5 }} />
          </div>
        </div>
        <div className="section">
          <h2 className="title2" id="title2">
            Cloud Parallax Banner
          </h2>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
            beatae cupiditate dolorem voluptatem itaque minima quod, velit
            obcaecati unde asperiores temporibus deleniti magni, impedit aliquid
            quidem sequi quis omnis excepturi illo qui inventore dolores?
            Nesciunt nobis unde, ad dolorum possimus quasi molestias numquam
            ullam at impedit enim aliquid? Assumenda esse explicabo totam
            excepturi corrupti accusantium aliquam vel ducimus mollitia dolor
            voluptas dolorum pariatur quia commodi dolores, impedit amet ipsa
            quo corporis? Odit officia praesentium exercitationem aliquam vero
            quod neque. Debitis perferendis illo non deserunt quisquam, quidem a
            deleniti eius corporis ut voluptates labore vel eaque, ratione
            libero assumenda rerum! Odit! dolorum possimus quasi molestias
            numquam ullam at impedit enim aliquid? Assumenda esse explicabo
            totam excepturi corrupti accusantium aliquam vel ducimus mollitia
            dolor voluptas dolorum pariatur quia commodi dolores, impedit amet
            ipsa quo corporis? Odit officia praesentium exercitationem aliquam
            vero quod neque. Debitis perferendis illo non deserunt quisquam,
            quidem a deleniti eius corporis ut voluptates labore vel eaque,
            ratione libero assumenda rerum! Odit! dolorum possimus quasi
            molestias numquam ullam at impedit enim aliquid? Assumenda esse
            explicabo totam excepturi corrupti accusantium aliquam vel ducimus
            mollitia dolor voluptas dolorum pariatur quia commodi dolores,
            impedit amet ipsa quo corporis? Odit officia praesentium
            exercitationem aliquam vero quod neque. Debitis perferendis illo non
            deserunt quisquam, quidem a deleniti eius corporis ut voluptates
            labore vel eaque, ratione libero assumenda rerum! Odit!
          </p>
        </div>

        {/* <div style={{ overflow: "hidden" }} className="selector1">
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
        </p> */}

        {/* <Items /> */}
      </div>

      <Footer />
      <SubscribeWindow
        open={openSubscribeWindow}
        onClose={handleCloseSubscribeWindow}
      />
    </div>
  )
}
