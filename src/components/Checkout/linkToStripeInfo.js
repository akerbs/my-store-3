import React, { useContext } from "react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { LanguageContext } from "../layout"
import Stripe from "../../images/stripe.png"
const window = require("global/window")

const rootTextAlign = window.innerWidth <= 599 ? "center" : "inherit"
const termsPrivacyMargin = window.innerWidth <= 599 ? "2% 0 3% 0" : 0

const useStyles = makeStyles(theme => ({}))

export default function (props) {
  const classes = useStyles()

  return (
    <div style={{ color: "#8c8c8c", textAlign: rootTextAlign }}>
      <div style={{ display: "inline" }}>
        <a
          href="https://stripe.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography style={{ display: "inline", fontSize: 12 }}>
            Powered by{" "}
          </Typography>

          <img
            src={Stripe}
            alt="Stripe logo"
            style={{ width: 33, marginBottom: "-0.7%" }}
          />
        </a>
      </div>
      {window.innerWidth > 600 ? (
        <Typography
          style={{
            display: "inline",
            marginRight: "3%",
            marginLeft: "3%",
            color: "#e7e7e7",
            fontSize: 12,
          }}
        >
          {" "}
          |{" "}
        </Typography>
      ) : (
        <br />
      )}
      <div style={{ display: "inline", margin: termsPrivacyMargin }}>
        <div style={{ display: "inline" }}>
          <a
            href="https://stripe.com/checkout/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              style={{ display: "inline", marginRight: "2%", fontSize: 12 }}
            >
              Terms{" "}
            </Typography>
          </a>
        </div>
        <div style={{ display: "inline" }}>
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography style={{ display: "inline", fontSize: 12 }}>
              Privacy
            </Typography>
          </a>
        </div>
      </div>
    </div>
  )
}
