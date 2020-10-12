import React, { useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Link, navigate } from "gatsby"
// import "./checkout.css"
import CardForm from "../components/Checkout/CardForm"
import FpxBankForm from "../components/Checkout/FpxBankForm"
import IbanForm from "../components/Checkout/IbanForm"
import IdealBankForm from "../components/Checkout/IdealBankForm"
import PaymentRequestForm from "../components/Checkout/PaymentRequestForm"
import SplitForm from "../components/Checkout/SplitForm"
import { CartContext } from "../context/CartContext"
import CheckoutMainComponent from "../components/Checkout/CheckoutMainComponent"
import MyCheckoutForm from "../components/Checkout/MyCheckoutForm"
import { makeStyles } from "@material-ui/core/styles"
import withWidth from "@material-ui/core/withWidth"
import Hidden from "@material-ui/core/Hidden"
import CssBaseline from "@material-ui/core/CssBaseline"
import PropTypes from "prop-types"
import getStripe from "../utils/stripejs"

// const PUBLIC_KEY =
//   "pk_test_51HGUuRHwITO0GSJr0YK6FwbE17LUTst9UCvm2uH0RdjBtAnQJqgPmDn0BSunRc8FIEXRW3HatsFd1uDHkfaGJtUm00IA2780Iw"
// const stripePromise = loadStripe(PUBLIC_KEY)

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    margin: 0,
    padding: 0,
  },
  boxLeft: {
    boxShadow: " 1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50%",
    margin: 0,
    padding: "5%",
    float: "left",
  },
  boxRight: {
    boxShadow: " -1px 0 3px -1px rgba(0, 0, 0, 0.1)",
    minHeight: "100vh",
    width: "50%",
    margin: 0,
    padding: "5%",
    float: "right",
  },
}))

function Checkout() {
  const classes = useStyles()
  const { cart } = useContext(CartContext)

  return (
    <Elements stripe={getStripe()}>
      <CssBaseline />
      <>
        {/* <Container className={classes.contentWrapper} id="wrapper"> */}
        <Hidden smDown>
          <div className={classes.contentWrapper}>
            <div className={classes.boxLeft}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              fuga assumenda, minima id perferendis expedita, vitae at
              accusantium corporis voluptatem odit facilis laudantium harum
              optio dolorem autem repellat molestiae blanditiis ratione est
              porro eum, excepturi atque. Totam veniam cum sint nulla fugiat
              sunt suscipit quae, excepturi aut architecto adipisci
              necessitatibus quidem, magnam possimus atque eos laborum itaque
              quasi eum? Sapiente at ducimus officia, dolorem impedit illo ex
              sunt quisquam mollitia omnis obcaecati molestias blanditiis
              praesentium tempore facilis, aut cupiditate a repellendus
              veritatis delectus illum consequuntur fugiat rem! Quia asperiores
              molestiae aperiam repellat veritatis! Praesentium quisquam cum
              quidem, sequi sint iure. illo ex sunt quisquam mollitia omnis
              obcaecati molestias blanditiis praesentium tempore facilis, aut
              cupiditate a repellendus veritatis delectus illum consequuntur
              fugiat rem! Quia asperiores molestiae aperiam repellat veritatis!
              Praesentium quisquam cum quidem, sequi sint iure. Its words and
              letters have been changed by addition or removal, so to
              deliberately render its content nonsensical; it’s not genuine,
              correct, or comprehensible Latin anymore. While lorem ipsum still
              resembles classical Latin, it actually has no meaning Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Illum fuga assumenda,
              minima id perferendis expedita, vitae at accusantium corporis
              voluptatem odit facilis laudantium harum optio dolorem autem
              repellat molestiae blanditiis ratione est porro eum, excepturi
              atque. Totam veniam cum sint nulla fugiat sunt suscipit quae,
              excepturi aut architecto adipisci necessitatibus quidem, magnam
              possimus atque eos laborum itaque quasi eum? Sapiente at ducimus
              officia, dolorem impedit illo ex sunt quisquam mollitia omnis
              obcaecati molestias blanditiis praesentium tempore facilis, aut
              cupiditate a repellendus veritatis delectus illum consequuntur
              fugiat rem! Quia asperiores molestiae aperiam repellat veritatis!
              Praesentium quisquam cum quidem, sequi sint iure. illo ex sunt
              quisquam mollitia omnis obcaecati molestias blanditiis praesentium
              tempore facilis, aut cupiditate a repellendus veritatis delectus
              illum consequuntur fugiat rem! Quia asperiores molestiae aperiam
              repellat veritatis! Praesentium quisquam cum quidem, sequi sint
              iure. Its words and letters have been changed by addition or
              removal, so to deliberately render its content nonsensical; it’s
              not genuine, correct, or comprehensible Latin anymore. While lorem
              ipsum still resembles classical Latin, it actually has no meaning
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              fuga assumenda, minima id perferendis expedita, vitae at
              accusantium corporis voluptatem odit facilis laudantium harum
              optio dolorem autem repellat molestiae blanditiis ratione est
              porro eum, excepturi atque. Totam veniam cum sint nulla fugiat
              sunt suscipit quae, excepturi aut architecto adipisci
              necessitatibus quidem, magnam possimus atque eos laborum itaque
              quasi eum? Sapiente at ducimus officia, dolorem impedit illo ex
              sunt quisquam mollitia omnis obcaecati molestias blanditiis
              praesentium tempore facilis, aut cupiditate a repellendus
              veritatis delectus illum consequuntur fugiat rem! Quia asperiores
              molestiae aperiam repellat veritatis! Praesentium quisquam cum
              quidem, sequi sint iure. illo ex sunt quisquam mollitia omnis
              obcaecati molestias blanditiis praesentium tempore facilis, aut
              cupiditate a repellendus veritatis delectus illum consequuntur
              fugiat rem! Quia asperiores molestiae aperiam repellat veritatis!
              Praesentium quisquam cum quidem, sequi sint iure. Its words and
              letters have been changed by addition or removal, so to
              deliberately render its content nonsensical; it’s not genuine,
              correct, or comprehensible Latin anymore. While lorem ipsum still
              resembles classical Latin, it actually has no meaning Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Illum fuga assumenda,
              minima id perferendis expedita, vitae at accusantium corporis
              voluptatem odit facilis laudantium harum optio dolorem autem
              repellat molestiae blanditiis ratione est porro eum, excepturi
              atque. Totam veniam cum sint nulla fugiat sunt suscipit quae,
              excepturi aut architecto adipisci necessitatibus quidem, magnam
              possimus atque eos laborum itaque quasi eum? Sapiente at ducimus
              officia, dolorem impedit illo ex sunt quisquam mollitia omnis
              obcaecati molestias blanditiis praesentium tempore facilis, aut
              cupiditate a repellendus veritatis delectus illum consequuntur
              fugiat rem! Quia asperiores molestiae aperiam repellat veritatis!
              Praesentium quisquam cum quidem, sequi sint iure. illo ex sunt
              quisquam mollitia omnis obcaecati molestias blanditiis praesentium
              tempore facilis, aut cupiditate a repellendus veritatis delectus
              illum consequuntur fugiat rem! Quia asperiores molestiae aperiam
              repellat veritatis! Praesentium quisquam cum quidem, sequi sint
              iure. Its words and letters have been changed by addition or
              removal, so to deliberately render its content nonsensical; it’s
              not genuine, correct, or comprehensible Latin anymore. While lorem
              ipsum still resembles classical Latin, it actually has no meaning
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              fuga assumenda, minima id perferendis expedita, vitae at
              accusantium corporis voluptatem odit facilis laudantium harum
              optio dolorem autem repellat molestiae blanditiis ratione est
              porro eum, excepturi atque. Totam veniam cum sint nulla fugiat
              sunt suscipit quae, excepturi aut architecto adipisci
              necessitatibus quidem, magnam possimus atque eos laborum itaque
              quasi eum? Sapiente at ducimus officia, dolorem impedit illo ex
              sunt quisquam mollitia omnis obcaecati molestias blanditiis
              praesentium tempore facilis, aut cupiditate a repellendus
              veritatis delectus illum consequuntur fugiat rem! Quia asperiores
              molestiae aperiam repellat veritatis! Praesentium quisquam cum
              quidem, sequi sint iure. illo ex sunt quisquam mollitia omnis
              obcaecati molestias blanditiis praesentium tempore facilis, aut
              cupiditate a repellendus veritatis delectus illum consequuntur
              fugiat rem! Quia asperiores molestiae aperiam repellat veritatis!
              Praesentium quisquam cum quidem, sequi sint iure. Its words and
              letters have been changed by addition or removal, so to
              deliberately render its content nonsensical; it’s not genuine,
              correct, or comprehensible Latin anymore. While lorem ipsum still
              resembles classical Latin, it actually has no meaning whatsoever.
              Lorem ipsum dolor sit amet Its words and letters have been changed
              by addition or removal, so to deliberately render its content
              nonsensical; it’s not genuine, correct, or comprehensible Latin
              anymore. While lorem ipsum still resembles classical Latin, it
              actually has no meaning whatsoever. Lorem ipsum dolor consectetur,
              adipisicing elit. Tempora, quae nisi molestiae accusantium commodi
              rerum beatae quo repellendus optio recusandae omnis mollitia
              doloribus vel illum asperiores aspernatur iure, necessitatibus
              repellat esse amet quasi maiores distinctio! Totam sit corrupti
              actually has no meaning whatsoever. Lorem ipsum dolor consectetur,
              adipisicing elit. Tempora, quae nisi molestiae accusantium commodi
              rerum beatae quo repellendus optio recusandae omnis mollitia
              doloribus vel illum asperiores aspernatur iure, necessitatibus
              repellat esse amet quasi maiores distinctio! Totam sit corrupti
              facilis? Non est id consequuntur voluptatum, excepturi nemo
              pariatur ipsa itaque autem? anymore. While lorem ipsum still
              resembles classical Latin, it actually has no meaning whatsoever.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
              quae nisi actually has no meaning whatsoever. Lorem ipsum dolor
              consectetur, adipisicing elit. Tempora, quae nisi molestiae
              accusantium commodi rerum beatae quo repellendus optio recusandae
              omnis mollitia doloribus vel illum asperiores aspernatur iure,
              necessitatibus repellat esse amet quasi maiores distinctio! Totam
              sit corrupti facilis? Non est id consequuntur voluptatum,
              excepturi nemo pariatur ipsa itaque autem? anymore. While lorem
              ipsum still resembles classical Latin, it actually has no meaning
              whatsoever. Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Tempora, quae nisi facilis? Non est id consequuntur
              voluptatum, excepturi nemo pariatur ipsa itaque autem? anymore.
              While lorem ipsum still resembles classical Latin, it actually has
              no meaning whatsoever. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Tempora, quae nisi molestiae accusantium commodi
              rerum beatae quo repellendus optio recusandae omnis mollitia
              doloribus vel illum asperiores aspernatur iure, necessitatibus
              repellat esse amet quasi maiores distinctio! Totam sit corrupti
              facilis? Non est id consequuntur voluptatum, excepturi nemo
              pariatur ipsa itaque autem?
            </div>

            <div className={classes.boxRight}>
              <MyCheckoutForm />
            </div>
          </div>
        </Hidden>
        {/* Middle up hide - but show for little viewport */}
        <Hidden mdUp>test mini display</Hidden>
        {/* </Container> */}
      </>
    </Elements>
  )
}

Checkout.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
}
export default withWidth()(Checkout)
