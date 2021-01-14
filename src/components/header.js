import React, { useContext, useCallback, useEffect, useState } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import clsx from "clsx"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Badge from "@material-ui/core/Badge"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Slide from "@material-ui/core/Slide"
import DrawerMenu from "./DrawerMenu"
import DrawerCart from "./DrawerCart"
import { CartContext } from "../context/CartContext"
import { Link } from "gatsby"
import { DrawerCartContext } from "../context/DrawerCartContext"
import { DrawerMenuContext } from "../context/DrawerMenuContext"
import { HeaderHeightContext } from "./layout"

import SelectCurrency from "./SelectCurrency"
import SelectLanguage from "./SelectLanguage"
// import "./header.css"

const window = require("global/window")

const drawerWidth = window.innerWidth <= 599 ? "100vw" : "27vw"

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShiftToRight: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth, //100
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShiftToLeft: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  // menuLeftButton: {
  //   // marginRight: theme.spacing(1),
  // },
  // menuRightButton: {
  //   paddingLeft: "0.5%",
  // },

  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    display: "inline",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    "&:visited": {
      color: "white",
    },
    "&:active": {
      color: theme.palette.primary.light,
    },
  },
}))

export default function Header(props) {
  const { handleHeaderHeightChange } = useContext(HeaderHeightContext)
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      handleHeaderHeightChange(node.getBoundingClientRect().height)
    }
  }, [])
  const classes = useStyles()
  const theme = useTheme()
  const { cart } = useContext(CartContext)
  let cartCount = cart.length

  const {
    openDrawerCart,
    handleDrawerCartOpen,
    handleDrawerCartClose,
  } = useContext(DrawerCartContext)

  const {
    openDrawerMenu,
    handleDrawerMenuOpen,
    handleDrawerMenuClose,
  } = useContext(DrawerMenuContext)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          ref={measuredRef}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShiftToLeft]: openDrawerCart,
            [classes.appBarShiftToRight]: openDrawerMenu,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerMenuOpen}
                edge="start"
                className={clsx(
                  classes.menuLeftButton,
                  openDrawerMenu && classes.hide
                )}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" className={classes.title}>
                <Link to="/" className={classes.link}>
                  My Store
                </Link>
              </Typography>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <SelectLanguage />
              <SelectCurrency />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerCartOpen}
                edge="end"
                className={clsx(
                  // classes.menuRightButton,
                  openDrawerCart && classes.hide
                )}
              >
                <Badge badgeContent={cartCount} color="secondary" variant="dot">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <DrawerMenu onClose={handleDrawerMenuClose} open={openDrawerMenu} />
      <DrawerCart onClose={handleDrawerCartClose} open={openDrawerCart} />
    </div>
  )
}
