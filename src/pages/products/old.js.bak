// import React, { useState, useContext } from "react"
// import { graphql } from "gatsby"
// import CssBaseline from "@material-ui/core/CssBaseline"
// import { makeStyles } from "@material-ui/core/styles"
// import SEO from "../../components/seo"
// import Header from "../../components/header"
// import Footer from "../../components/footer"
// import Container from "@material-ui/core/Container"
// import "swiper/swiper-bundle.css"
// import "./swiper.css"
// import SwiperCore, {
//   Thumbs,
//   Zoom,
//   Navigation,
//   EffectFade,
//   Pagination,
// } from "swiper"
// import Grid from "@material-ui/core/Grid"
// import { SRLWrapper } from "simple-react-lightbox"
// import withWidth from "@material-ui/core/withWidth"
// import Hidden from "@material-ui/core/Hidden"
// import PropTypes from "prop-types"

// import { useShoppingCart, formatCurrencyString } from "use-shopping-cart"
// import ThumbsSwiper from "../../components/Swipers/ThumbsSwiper"
// import MainSwiper from "../../components/Swipers/MainSwiper"
// import Button from "@material-ui/core/Button"
// import { DrawerCartContext } from "../../context/DrawerCartContext"
// import { CurrencyContext } from "../../components/layout"
// import Counter from "../../components/Cart/Counter"

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     minHeight: "100vh",
//   },
//   contentWrapper: {
//     flex: "1 0 auto",

//     marginTop: 120,
//     [theme.breakpoints.down("sm")]: {
//       marginTop: 55,
//       paddingLeft: 0,
//       paddingRight: 0,
//     },
//   },
// }))

// SwiperCore.use([Thumbs, Zoom, Navigation, EffectFade, Pagination])

// const lightboxOptions = {
//   settings: {},
//   caption: { showCaption: false },
//   buttons: {
//     showDownloadButton: false,
//     showAutoplayButton: false,
//     showFullscreenButton: false,
//     size: "50px",
//   },
//   thumbnails: { showThumbnails: false },
// }

// // const lightboxCallbacks = {
// //   onLightboxOpened: () => {
// //     document.body.style.position = "fixed"
// //   },
// //   onLightboxClosed: () => {
// //     const scrollY = document.body.style.top
// //     document.body.style.position = ""
// //   },
// // }

// const FunnyBunny = props => {
//   const classes = useStyles()
//   const { addItem } = useShoppingCart()
//   const { handleDrawerCartOpen } = useContext(DrawerCartContext)
//   const { actCurrency } = useContext(CurrencyContext)
//   const [thumbsSwiper, setThumbsSwiper] = useState(null)
//   const [quantityOfItem, setQuantityOfItem] = useState(1)

//   function increment() {
//     setQuantityOfItem(quantityOfItem + 1)
//   }

//   function decrement() {
//     setQuantityOfItem(quantityOfItem - 1)
//   }

//   const ItemInfoUsd = {
//     sku: props.data.stripePriceUsd.id,
//     name: props.data.stripePriceUsd.product.name,
//     price: props.data.stripePriceUsd.unit_amount,
//     currency: props.data.stripePriceUsd.currency,
//     image: props.data.stripePriceUsd.product.images,
//     description: props.data.stripePriceUsd.product.description,
//   }
//   const ItemInfoEur = {
//     sku: props.data.stripePriceEur.id,
//     name: props.data.stripePriceEur.product.name,
//     price: props.data.stripePriceEur.unit_amount,
//     currency: props.data.stripePriceEur.currency,
//     image: props.data.stripePriceEur.product.images,
//     description: props.data.stripePriceEur.product.description,
//   }
//   const ItemInfoRub = {
//     sku: props.data.stripePriceRub.id,
//     name: props.data.stripePriceRub.product.name,
//     price: props.data.stripePriceRub.unit_amount,
//     currency: props.data.stripePriceRub.currency,
//     image: props.data.stripePriceRub.product.images,
//     description: props.data.stripePriceRub.product.description,
//   }

//   const ItemInfo =
//     actCurrency === "EUR"
//       ? ItemInfoEur
//       : actCurrency === "USD"
//       ? ItemInfoUsd
//       : actCurrency === "RUB"
//       ? ItemInfoRub
//       : ItemInfoUsd

//   console.log("DATA:", props.data)

//   return (
//     <div className={classes.root} id="root">
//       <SEO title="Funny bunny" keywords={[`gatsby`, `application`, `react`]} />
//       <CssBaseline />
//       <Header />
//       <Container maxWidth="md" className={classes.contentWrapper} id="wrapper">
//         <Hidden smDown id="big">
//           <Grid container spacing={0}>
//             <Grid item md={6}>
//               <Grid container direction="column" spacing={2}>
//                 <Grid item>
//                   <SRLWrapper
//                     options={lightboxOptions}
//                     // callbacks={lightboxCallbacks}
//                   >
//                     <MainSwiper
//                       thumbsSwiper={thumbsSwiper}
//                       setThumbsSwiper={setThumbsSwiper}
//                       data={props.data}
//                     />
//                   </SRLWrapper>
//                 </Grid>
//                 <Grid item>
//                   <ThumbsSwiper
//                     thumbsSwiper={thumbsSwiper}
//                     setThumbsSwiper={setThumbsSwiper}
//                     data={props.data}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item md={6}>
//               Price:{" "}
//               {formatCurrencyString({
//                 value: parseInt(ItemInfo.price),
//                 currency: ItemInfo.currency,
//               })}{" "}
//               <br /> <br />
//               <Counter
//                 incrementItem={increment}
//                 decrementItem={decrement}
//                 quantity={quantityOfItem}
//                 sku={ItemInfo}
//               />{" "}
//               <br /> <br />
//               <Button
//                 variant="contained"
//                 size="small"
//                 color="primary"
//                 onClick={() => {
//                   addItem(ItemInfo, quantityOfItem)
//                   handleDrawerCartOpen()
//                 }}
//               >
//                 ADD TO CART
//               </Button>
//               <p>
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Doloribus non optio unde quisquam aspernatur praesentium dolorum
//                 magni! Repellendus esse quis aliquid! Nemo cum aliquam suscipit
//                 dolorum temporibus numquam quasi consequatur quia sequi earum
//                 nisi optio adipisci, ut, at quibusdam ex sapiente facilis
//                 mollitia incidunt dolor. Dolorum reprehenderit ex libero earum!
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Doloribus non optio unde quisquam aspernatur praesentium dolorum
//                 magni! Repellendus esse quis aliquid! Nemo cum aliquam suscipit
//                 dolorum temporibus numquam quasi consequatur quia sequi earum
//                 nisi optio adipisci, ut, at quibusdam ex sapiente facilis
//                 mollitia incidunt dolor. Dolorum reprehenderit ex libero earum!
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Doloribus non optio unde quisquam aspernatur praesentium dolorum
//                 magni! Repellendus esse quis aliquid! Nemo cum aliquam suscipit
//                 dolorum temporibus numquam quasi consequatur quia sequi earum
//                 nisi optio adipisci, ut, at quibusdam ex sapiente facilis
//                 mollitia incidunt dolor. Dolorum reprehenderit ex libero earum!
//                 Lorem ipsum dolor sit, amet consectetur adipisicing elit.
//                 Doloribus non optio unde quisquam aspernatur praesentium dolorum
//                 optio adipisci, ut, at quibusdam ex sapiente facilis mollitia
//                 incidunt dolor. Dolorum reprehenderit ex libero earum!
//               </p>
//             </Grid>
//           </Grid>
//         </Hidden>
//         <Hidden mdUp id="little">
//           <MainSwiper
//             thumbsSwiper={thumbsSwiper}
//             setThumbsSwiper={setThumbsSwiper}
//             data={props.data}
//           />
//           <br /> <br />
//           <Container>
//             Price:{" "}
//             {formatCurrencyString({
//               value: parseInt(ItemInfo.price),
//               currency: ItemInfo.currency,
//             })}{" "}
//             <br />
//             <Button
//               size="small"
//               color="primary"
//               onClick={() => {
//                 addItem(ItemInfo)
//                 handleDrawerCartOpen()
//               }}
//             >
//               ADD TO CART
//             </Button>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
//             non optio unde quisquam aspernatur praesentium dolorum magni!
//             Repellendus esse quis aliquid! Nemo cum aliquam suscipit dolorum
//             temporibus numquam quasi consequatur quia sequi earum nisi optio
//             adipisci, ut, at quibusdam ex sapiente facilis mollitia incidunt
//             dolor. Dolorum reprehenderit ex libero earum! Lorem ipsum dolor sit,
//             amet consectetur adipisicing elit. Doloribus non optio unde quisquam
//             aspernatur praesentium dolorum magni! Repellendus esse quis aliquid!
//             Nemo cum aliquam suscipit dolorum temporibus numquam quasi
//             consequatur quia sequi earum nisi optio adipisci, ut, at quibusdam
//             ex sapiente facilis mollitia incidunt dolor. Dolorum reprehenderit
//             ex libero earum! Lorem ipsum dolor sit, amet consectetur adipisicing
//             elit. Doloribus non optio unde quisquam aspernatur praesentium
//             dolorum magni! Repellendus esse quis aliquid! Nemo cum aliquam
//             suscipit dolorum temporibus numquam quasi consequatur quia sequi
//             earum nisi optio adipisci, ut, at quibusdam ex sapiente facilis
//             mollitia incidunt dolor. Dolorum reprehenderit ex libero earum!
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus
//             non optio unde quisquam aspernatur praesentium dolorum optio
//             adipisci, ut, at quibusdam ex sapiente facilis mollitia incidunt
//             dolor. Dolorum reprehenderit ex libero earum!
//           </Container>
//         </Hidden>
//       </Container>
//       <Footer />
//     </div>
//   )
// }

// FunnyBunny.propTypes = {
//   width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
// }
// export default withWidth()(FunnyBunny)

// export const query = graphql`
//   query {
//     img1: file(relativePath: { eq: "products/funny_bunny/funny_bunny_1.jpg" }) {
//       childImageSharp {
//         fluid(maxWidth: 1000) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//     img2: file(relativePath: { eq: "products/funny_bunny/funny_bunny_2.jpg" }) {
//       childImageSharp {
//         fluid(maxWidth: 1000) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//     img3: file(relativePath: { eq: "products/funny_bunny/funny_bunny_3.jpg" }) {
//       childImageSharp {
//         fluid(maxWidth: 1000) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }

//     stripePriceEur: stripePrice(id: { eq: "price_1HGjcwHwITO0GSJrJEhUG0Aq" }) {
//       id
//       currency
//       unit_amount
//       product {
//         name
//         description
//         images
//       }
//     }
//     stripePriceUsd: stripePrice(id: { eq: "price_1HNFcEHwITO0GSJr0BcSMXko" }) {
//       id
//       currency
//       unit_amount
//       product {
//         name
//         description
//         images
//       }
//     }
//     stripePriceRub: stripePrice(id: { eq: "price_1HNFbdHwITO0GSJr0cQgGhYQ" }) {
//       id
//       currency
//       unit_amount
//       product {
//         name
//         description
//         images
//       }
//     }
//   }
// `
