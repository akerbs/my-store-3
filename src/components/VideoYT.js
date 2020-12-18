import React, { useState, useContext, useEffect, useRef } from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles } from "@material-ui/core/styles"
import SEO from "../components/seo"
import YouTube from "react-youtube"
import inView from "in-view"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
  videoWrapper: {
    // margin: 0,
    // padding: 0,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    paddingBottom: "56.25%",
  },
  video: {
    position: "absolute",
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
    // width: '100%',
    // height: '500px',
    border: "0px",
    // marginTop: " -16%",
    // marginTop: " -97%",
  },
}))

export default function (props) {
  const classes = useStyles()

  // const [ready, setReady] = useState(0)
  const [showSpinner, setShowSpinner] = useState(false)

  // useEffect(() => {
  //   if (ready === 1) {
  //     console.log("!!!!! is READY")
  //   } else if (ready === 0) {
  //     console.log("!!!!! is NOT ReAdY")
  //   } else {
  //     console.log("!!!!!WTFF")
  //   }
  // }, [ready])

  useEffect(() => {
    console.log("IN VIEW WORKS")
    inView("#videoWrapper").on("enter", onPlay).on("exit", onPause)
    inView.threshold(0.5)
  }, [props.itemInView])

  // function startInViewShowVideo() {
  //   onPlay()
  // }

  // function stopInViewShowVideo() {
  //   onPause()
  // }

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      enablejsapi: 1,
      rel: 0,
      showinfo: 0,
      controls: 0,
      // wmode: "opaque",
      // origin: "http://localhost:8000",
      // autohide:1,
      // loop: 1,
      // suggestedQuality: "hd1080",
    },
  }

  function onReady(event) {
    window.YTPlayer = event.target
    window.YTPlayer.mute()
    window.YTPlayer.setPlaybackQuality("hd1080")
    // alert("READY!!!")
    console.log("onReady")
    // setReady(1)
  }

  function onPlay() {
    // setShowSpinner(true)
    setTimeout(function () {
      // setShowSpinner(false)
      window.YTPlayer.playVideo()
      console.log(" onPlay 3000")
    }, 3000)
  }

  function onPause() {
    setTimeout(function () {
      window.YTPlayer.pauseVideo()
      console.log(" onPause")
    }, 1000)
  }

  return (
    <YouTube
      className={classes.video}
      videoId={props.itemInfo.videoId}
      opts={opts}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      id="myVideo"
    />
  )
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/-i_94tW_iSM?controls=0" frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
// </iframe>
