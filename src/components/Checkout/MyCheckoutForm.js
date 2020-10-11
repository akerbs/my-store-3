import React, { useState, useContext, useEffect, useRef } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import Header from "../header"
import Footer from "../footer"
import Container from "@material-ui/core/Container"
// import "./MyCheckoutForm.css"
import withWidth from "@material-ui/core/withWidth"
import Hidden from "@material-ui/core/Hidden"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import { CurrencyContext } from "../layout"
import { LanguageContext } from "../layout"
import { CartContext } from "../../context/CartContext"
import Typography from "@material-ui/core/Typography"
import { Link, navigate } from "gatsby"
import inView from "in-view"

const document = require("global/document")
const window = require("global/window")

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

function ProductPageTemplate(props) {
  const classes = useStyles()
  const { actCurrency } = useContext(CurrencyContext)
  const { actLanguage } = useContext(LanguageContext)
  const { cart } = useContext(CartContext)

  return (
    <>
      <CssBaseline />
      {/* <Container className={classes.contentWrapper} id="wrapper"> */}
      <Hidden smDown>
        <div className={classes.contentWrapper}>
          <div className={classes.boxLeft}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum fuga
            assumenda, minima id perferendis expedita, vitae at accusantium
            corporis voluptatem odit facilis laudantium harum optio dolorem
            autem repellat molestiae blanditiis ratione est porro eum, excepturi
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
            removal, so to deliberately render its content nonsensical; it’s not
            genuine, correct, or comprehensible Latin anymore. While lorem ipsum
            still resembles classical Latin, it actually has no meaning Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Illum fuga
            assumenda, minima id perferendis expedita, vitae at accusantium
            corporis voluptatem odit facilis laudantium harum optio dolorem
            autem repellat molestiae blanditiis ratione est porro eum, excepturi
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
            removal, so to deliberately render its content nonsensical; it’s not
            genuine, correct, or comprehensible Latin anymore. While lorem ipsum
            still resembles classical Latin, it actually has no meaning Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Illum fuga
            assumenda, minima id perferendis expedita, vitae at accusantium
            corporis voluptatem odit facilis laudantium harum optio dolorem
            autem repellat molestiae blanditiis ratione est porro eum, excepturi
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
            removal, so to deliberately render its content nonsensical; it’s not
            genuine, correct, or comprehensible Latin anymore. While lorem ipsum
            still resembles classical Latin, it actually has no meaning Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Illum fuga
            assumenda, minima id perferendis expedita, vitae at accusantium
            corporis voluptatem odit facilis laudantium harum optio dolorem
            autem repellat molestiae blanditiis ratione est porro eum, excepturi
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
            removal, so to deliberately render its content nonsensical; it’s not
            genuine, correct, or comprehensible Latin anymore. While lorem ipsum
            still resembles classical Latin, it actually has no meaning Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Illum fuga
            assumenda, minima id perferendis expedita, vitae at accusantium
            corporis voluptatem odit facilis laudantium harum optio dolorem
            autem repellat molestiae blanditiis ratione est porro eum, excepturi
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
            removal, so to deliberately render its content nonsensical; it’s not
            genuine, correct, or comprehensible Latin anymore. While lorem ipsum
            still resembles classical Latin, it actually has no meaning
            whatsoever. Lorem ipsum dolor sit amet Its words and letters have
            been changed by addition or removal, so to deliberately render its
            content nonsensical; it’s not genuine, correct, or comprehensible
            Latin anymore. While lorem ipsum still resembles classical Latin, it
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
            facilis? Non est id consequuntur voluptatum, excepturi nemo pariatur
            ipsa itaque autem? anymore. While lorem ipsum still resembles
            classical Latin, it actually has no meaning whatsoever. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Tempora, quae nisi
            actually has no meaning whatsoever. Lorem ipsum dolor consectetur,
            adipisicing elit. Tempora, quae nisi molestiae accusantium commodi
            rerum beatae quo repellendus optio recusandae omnis mollitia
            doloribus vel illum asperiores aspernatur iure, necessitatibus
            repellat esse amet quasi maiores distinctio! Totam sit corrupti
            facilis? Non est id consequuntur voluptatum, excepturi nemo pariatur
            ipsa itaque autem? anymore. While lorem ipsum still resembles
            classical Latin, it actually has no meaning whatsoever. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Tempora, quae nisi
            facilis? Non est id consequuntur voluptatum, excepturi nemo pariatur
            ipsa itaque autem? anymore. While lorem ipsum still resembles
            classical Latin, it actually has no meaning whatsoever. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Tempora, quae nisi
            molestiae accusantium commodi rerum beatae quo repellendus optio
            recusandae omnis mollitia doloribus vel illum asperiores aspernatur
            iure, necessitatibus repellat esse amet quasi maiores distinctio!
            Totam sit corrupti facilis? Non est id consequuntur voluptatum,
            excepturi nemo pariatur ipsa itaque autem?
          </div>

          <div className={classes.boxRight}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            reiciendis tempora porro, eaque quos pariatur dolorum rerum,
            consequatur vero provident eveniet vitae maxime? Suscipit sint
            officia alias architecto voluptas a unde iste tempore tempora, odit
            repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa!
            consequatur vero provident eveniet vitae maxime? Suscipit sint
            officia alias architecto voluptas a unde iste tempore tempora, odit
            repellat? Ratione minus vitae Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis
            tempora porro, eaque quos pariatur dolorum rerum, consequatur vero
            provident eveniet vitae maxime? Suscipit sint officia alias
            architecto voluptas a unde iste tempore tempora, odit repellat?
            Ratione minus vitae obcaecati sequi et suscipit, reiciendis veniam
            quasi sint, repellat, consequuntur culpa! consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam quasi sint,
            repellat, consequuntur culpa! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus vitae obcaecati sequi et
            suscipit, reiciendis veniam quasi sint, repellat, consequuntur
            culpa! consequatur vero provident eveniet vitae maxime? Suscipit
            sint officia alias architecto voluptas a unde iste tempore tempora,
            odit repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis
            tempora porro, eaque quos pariatur dolorum rerum, consequatur vero
            provident eveniet vitae maxime? Suscipit sint officia alias
            architecto voluptas a unde iste tempore tempora, odit repellat?
            Ratione minus vitae obcaecati sequi et suscipit, reiciendis veniam
            quasi sint, repellat, consequuntur culpa! consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quae reiciendis tempora
            porro, eaque quos pariatur dolorum rerum, consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam quasi sint,
            repellat, consequuntur culpa! consequatur vero provident eveniet
            vitae maxime? Suscipit sint officia alias architecto voluptas a unde
            iste tempore tempora, odit repellat? Ratione minus vitae Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Quae reiciendis tempora
            porro, eaque quos pariatur dolorum rerum, consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            obcaecati sequi et suscipit, reiciendis veniam quasi sint, repellat,
            consequuntur culpa! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus vitae obcaecati sequi et
            suscipit, reiciendis veniam quasi sint, repellat, consequuntur
            culpa! consequatur vero provident eveniet vitae maxime? Suscipit
            sint officia alias architecto voluptas a unde iste tempore tempora,
            odit repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis
            tempora porro, eaque quos pariatur dolorum rerum, consequatur vero
            provident eveniet vitae maxime? Suscipit sint officia alias
            architecto voluptas a unde iste tempore tempora, odit repellat?
            Ratione minus vitae obcaecati sequi et suscipit, reiciendis veniam
            quasi sint, repellat, consequuntur culpa! consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam quasi sint,
            repellat, consequuntur culpa! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus vitae obcaecati sequi et
            suscipit, reiciendis veniam quasi sint, repellat, consequuntur
            culpa! consequatur vero provident eveniet vitae maxime? Suscipit
            sint officia alias architecto voluptas a unde iste tempore tempora,
            odit repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Quae reiciendis tempora porro, eaque quos pariatur dolorum
            rerum, consequatur vero provident eveniet vitae maxime? Suscipit
            sint officia alias architecto voluptas a unde iste tempore tempora,
            odit repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa!
            consequatur vero provident eveniet vitae maxime? Suscipit sint
            officia alias architecto voluptas a unde iste tempore tempora, odit
            repellat? Ratione minus vitae Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis
            tempora porro, eaque quos pariatur dolorum rerum, consequatur vero
            provident eveniet vitae maxime? Suscipit sint officia alias
            architecto voluptas a unde iste tempore tempora, odit repellat?
            Ratione minus vitae obcaecati sequi et suscipit, reiciendis veniam
            quasi sint, repellat, consequuntur culpa! consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam quasi sint,
            repellat, consequuntur culpa! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae reiciendis tempora porro, eaque quos pariatur
            dolorum rerum, consequatur vero provident eveniet vitae maxime?
            Suscipit sint officia alias architecto voluptas a unde iste tempore
            tempora, odit repellat? Ratione minus vitae obcaecati sequi et
            suscipit, reiciendis veniam quasi sint, repellat, consequuntur
            culpa! consequatur vero provident eveniet vitae maxime? Suscipit
            sint officia alias architecto voluptas a unde iste tempore tempora,
            odit repellat? Ratione minus vitae obcaecati sequi et suscipit,
            reiciendis veniam quasi sint, repellat, consequuntur culpa! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Quae reiciendis
            tempora porro, eaque quos pariatur dolorum rerum, consequatur vero
            provident eveniet vitae maxime? Suscipit sint officia alias
            architecto voluptas a unde iste tempore tempora, odit repellat?
            Ratione minus vitae obcaecati sequi et suscipit, reiciendis veniam
            quasi sint, repellat, consequuntur culpa! consequatur vero provident
            eveniet vitae maxime? Suscipit sint officia alias architecto
            voluptas a unde iste tempore tempora, odit repellat? Ratione minus
            vitae obcaecati sequi et suscipit, reiciendis veniam
          </div>
        </div>
      </Hidden>
      {/* Middle up hide - but show for little viewport */}
      <Hidden mdUp>test mini display</Hidden>
      {/* </Container> */}
    </>
  )
}

ProductPageTemplate.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
}
export default withWidth()(ProductPageTemplate)
