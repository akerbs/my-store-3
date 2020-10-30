import React, { useContext, useState } from "react"

import { Link, navigate } from "gatsby"
// import CardForm from "../components/Checkout/CardForm"
// import FpxBankForm from "../components/Checkout/FpxBankForm"
// import IbanForm from "../components/Checkout/IbanForm"
// import IdealBankForm from "../components/Checkout/IdealBankForm"
// import PaymentRequestForm from "../components/Checkout/PaymentRequestForm"
// import SplitForm from "../components/Checkout/SplitForm"
import { CartContext } from "../context/CartContext"
// import CheckoutMainComponent from "../components/Checkout/CheckoutMainComponent"
import MyCheckoutForm from "../components/Checkout/MyCheckoutForm"
import { makeStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"
import Hidden from "@material-ui/core/Hidden"
import CssBaseline from "@material-ui/core/CssBaseline"
import PropTypes from "prop-types"
import CheckoutCartOverview from "../components/Checkout/CheckoutCartOverview"
import { Elements } from "@stripe/react-stripe-js"
import getStripe from "../utils/stripejs"

const window = require("global/window")
const boxMinHeight = window.innerWidth <= 599 ? "50vw" : "100vh"
const boxWidth = window.innerWidth <= 599 ? "100vw" : "50vw"

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    margin: 0,
    padding: 0,
    width: "100vw",
    minHeight: "100vh",
    // overflowY: "scroll",
  },
  boxLeft: {
    boxShadow: " 1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: boxMinHeight,
    width: boxWidth,
    // minWidth: "50vw",
    // maxWidth: "50vw",
    margin: 0,
    padding: "8% 5% 0 18%",
    float: "left",
  },
  boxRight: {
    boxShadow: " -1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: boxMinHeight,
    width: boxWidth,
    // minWidth: "50vw",
    // maxWidth: "50vw",
    margin: 0,
    padding: "9% 5% 5% 5.5%",
    float: "right",
  },
}))

function Checkout() {
  const classes = useStyles()

  return (
    <>
      <Elements stripe={getStripe()}>
        <CssBaseline />
        {/* <Container className={classes.contentWrapper} id="wrapper"> */}

        <Hidden smDown>
          <div className={classes.contentWrapper}>
            <div className={classes.boxLeft}>
              {/* <CheckoutCartOverview /> */}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
              dicta officiis eos quas, id nihil asperiores nisi voluptatum quos
              tempora. Quibusdam a hic doloremque saepe mollitia ipsum nihil
              consequatur ullam, sequi officiis, optio illum tempora
              accusantium! Sit alias praesentium accusamus nobis dignissimos
              reprehenderit similique nostrum explicabo natus, deserunt quae
              nesciunt quam laudantium eligendi in quos neque eveniet molestias,
              quaerat quas provident autem ad exercitationem facere! Atque ipsum
              cum dolores accusamus recusandae itaque labore a quia eligendi
              culpa aliquid pariatur exercitationem nihil quo et hic, veniam
              laudantium laboriosam sapiente veritatis voluptate consequuntur
              quis! Accusantium libero expedita aliquid eum iste minima officia,
              adipisci accusamus corrupti temporibus ea. Quasi maxime quibusdam
              porro voluptatum quis, deserunt totam blanditiis sit quam sapiente
              iusto placeat ullam saepe dicta quod atque impedit praesentium
              alias non error laborum expedita suscipit. Ipsam consequatur
              fugiat inventore non, autem tenetur harum quia odit, fugit quis
              maxime neque minima labore consequuntur ea nemo? In dolorem
              dignissimos minus repudiandae maxime minima nobis reprehenderit
              officiis debitis, ducimus magni quisquam vel necessitatibus
              laudantium earum, quasi consequatur sunt obcaecati asperiores
              beatae? Voluptate excepturi rerum obcaecati? Totam dolorum
              molestiae dolores earum dolore voluptatum accusantium ut ullam
              saepe eligendi sunt omnis iure cupiditate aperiam, nihil quos,
              laboriosam velit libero! Beatae sapiente laborum mollitia eos
              doloremque aspernatur ex fugit ratione, voluptatibus distinctio
              maxime debitis maiores natus accusantium omnis recusandae ullam
              deserunt illo culpa est expedita vel quas? Iusto obcaecati quia
              facilis consequatur, voluptate totam vel id eius debitis amet
              consectetur quas cumque nostrum recusandae praesentium. Provident
              architecto ea tenetur quo rerum non, numquam animi corrupti
              laborum quod laudantium beatae quis, placeat totam in quia. Fugiat
              minus voluptate ut beatae animi? Vel quam dolorum perferendis
              ratione, consectetur dolore repellat ducimus! Consectetur, eum
              ducimus! Illo eius placeat provident culpa quae eaque voluptates
              amet, libero odit fuga facilis neque omnis, numquam
              necessitatibus.
            </div>

            <div className={classes.boxRight}>
              {/* <SplitForm /> */}
              {/* <MyCheckoutForm /> */}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error
              dicta officiis eos quas, id nihil asperiores nisi voluptatum quos
              tempora. Quibusdam a hic doloremque saepe mollitia ipsum nihil
              consequatur ullam, sequi officiis, optio illum tempora
              accusantium! Sit alias praesentium accusamus nobis dignissimos
              reprehenderit similique nostrum explicabo natus, deserunt quae
              nesciunt quam laudantium eligendi in quos neque eveniet molestias,
              quaerat quas provident autem ad exercitationem facere! Atque ipsum
              cum dolores accusamus recusandae itaque labore a quia eligendi
              culpa aliquid pariatur exercitationem nihil quo et hic, veniam
              laudantium laboriosam sapiente veritatis voluptate consequuntur
              quis! Accusantium libero expedita aliquid eum iste minima officia,
              adipisci accusamus corrupti temporibus ea. Quasi maxime quibusdam
              porro voluptatum quis, deserunt totam blanditiis sit quam sapiente
              iusto placeat ullam saepe dicta quod atque impedit praesentium
              alias non error laborum expedita suscipit. Ipsam consequatur
              fugiat inventore non, autem tenetur harum quia odit, fugit quis
              maxime neque minima labore consequuntur ea nemo? In dolorem
              dignissimos minus repudiandae maxime minima nobis reprehenderit
              officiis debitis, ducimus magni quisquam vel necessitatibus
              laudantium earum, quasi consequatur sunt obcaecati asperiores
              beatae? Voluptate excepturi rerum obcaecati? Totam dolorum
              molestiae dolores earum dolore voluptatum accusantium ut ullam
              saepe eligendi sunt omnis iure cupiditate aperiam, nihil quos,
              laboriosam velit libero! Beatae sapiente laborum mollitia eos
              doloremque aspernatur ex fugit ratione, voluptatibus distinctio
              maxime debitis maiores natus accusantium omnis recusandae ullam
              deserunt illo culpa est expedita vel quas? Iusto obcaecati quia
              facilis consequatur, voluptate totam vel id eius debitis amet
              consectetur quas cumque nostrum recusandae praesentium. Provident
              architecto ea tenetur quo rerum non, numquam animi corrupti
              laborum quod laudantium beatae quis, placeat totam in quia. Fugiat
              minus voluptate ut beatae animi? Vel quam dolorum perferendis
              ratione, consectetur dolore repellat ducimus! Consectetur, eum
              ducimus! Illo eius placeat provident culpa quae eaque voluptates
              amet, libero odit fuga facilis neque omnis, numquam
              necessitatibus.
            </div>
          </div>
        </Hidden>
        {/* Middle up hide - but show for little viewport */}
        <Hidden mdUp>
          <CheckoutCartOverview />
          <MyCheckoutForm />
        </Hidden>
        {/* </Container> */}
      </Elements>
    </>
  )
}

Checkout.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
}
export default withWidth()(Checkout)
