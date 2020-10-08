import React, { useContext } from "react"
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
import { useShoppingCart } from "use-shopping-cart"
// import Link from "gatsby-plugin-transition-link"
import { Link } from "gatsby"
import { DrawerCartContext } from "../context/DrawerCartContext"
import { DrawerMenuContext } from "../context/DrawerMenuContext"

import SelectCurrency from "./SelectCurrency"
import SelectLanguage from "./SelectLanguage"

const window = require("global/window")

const drawerWidth = window.innerWidth <= 599 ? "100vw" : 450

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
    marginLeft: 100,
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
  menuLeftButton: {
    // marginRight: theme.spacing(2),
  },
  menuRightButton: {
    paddingLeft: theme.spacing(1),
  },

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
  const classes = useStyles()
  const theme = useTheme()
  const { cartCount } = useShoppingCart()

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
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShiftToLeft]: openDrawerCart,
            [classes.appBarShiftToRight]: openDrawerMenu,
          })}
        >
          <Toolbar className={classes.toolbar}>
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
                LOGO
              </Link>
            </Typography>
            <SelectLanguage />
            <SelectCurrency />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerCartOpen}
              edge="end"
              className={clsx(
                classes.menuRightButton,
                openDrawerCart && classes.hide
              )}
            >
              <Badge badgeContent={cartCount} color="secondary" variant="dot">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <DrawerMenu onClose={handleDrawerMenuClose} open={openDrawerMenu} />
      <DrawerCart onClose={handleDrawerCartClose} open={openDrawerCart} />
    </div>
  )
}
