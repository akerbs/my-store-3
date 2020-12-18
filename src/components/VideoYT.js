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

  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    console.log("IN VIEW WORKS")
    inView("#videoWrapper")
      .on("enter", startInViewShowVideo)
      .on("exit", stopInViewShowVideo)
    inView.threshold(0.5)
  }, [props.itemInView])

  function startInViewShowVideo() {
    setTimeout(function () {
      onPlay()
    }, 500)
  }

  function stopInViewShowVideo() {
    setTimeout(function () {
      onPause()
    }, 500)
  }

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
    console.log(" onReady")
  }

  function onPlay() {
    if (window.YTPlayer === "undefined") {
      setShowSpinner(true)
    } else {
      setShowSpinner(false)
      window.YTPlayer.playVideo()
      console.log(" onPlay")
    }
  }

  function onPause() {
    window.YTPlayer.pauseVideo()
    console.log(" onPause")
  }

  return (
    <div className={classes.videoWrapper} id="videoWrapper">
      {/* <video
              // onplay="handleFirstPlay()"
              id="myVideo"
              src={itemInfo.video}
              type="video/mp4"
              // controls
              width="100%"
              autoPlay
              loop
              muted
              playsInline
            /> */}
      {showSpinner === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <YouTube
        className={classes.video}
        videoId={props.itemInfo.videoId}
        opts={opts}
        onReady={onReady}
        id="myVideo"
      />
      {/* <iframe
              className="myVideo"
              id="myVideo"
              width="100%"
              height="500px"
              src="https://www.youtube.com/embed/-i_94tW_iSM?rel=0&controls=0&hd=1&showinfo=0&enablejsapi=1&autoplay=1"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}
    </div>
  )
}

// <iframe width="560" height="315" src="https://www.youtube.com/embed/-i_94tW_iSM?controls=0" frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
// </iframe>
