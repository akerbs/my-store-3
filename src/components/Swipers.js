import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Swiper, SwiperSlide } from "swiper/react"

const useStyles = makeStyles(theme => ({
  mainSlider: {
    width: "430px",
    height: "100%",
    margin: 0,
    cursor: "pointer",

    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "auto",
      marginLeft: "0px",
    },
  },
  thumbsSlider: {
    width: "430px",
    height: "100%",
    margin: 0,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "52px",
    },
  },
}))

export function MainSwiper(props) {
  const classes = useStyles()
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      direction="horizontal"
      effect="fade"
      loop
      pagination={{ clickable: true }}
      // navigation
      className={classes.mainSlider}
      thumbs={{ swiper: props.thumbsSwiper }}
    >
      <SwiperSlide>
        <img src={props.data.firstImg} alt="Funny bunny 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={props.data.scndImg} alt="Funny bunny 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={props.data.firstImg} alt="Funny bunny 3" />
      </SwiperSlide>
    </Swiper>
  )
}

export function ThumbsSwiper(props) {
  const classes = useStyles()

  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={3}
      onSwiper={props.setThumbsSwiper}
      className={classes.thumbsSlider}
      // direction="vertical"
    >
      <SwiperSlide>
        <img src={props.data.firstImg} alt="Funny bunny 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={props.data.scndImg} alt="Funny bunny " />
      </SwiperSlide>
      <SwiperSlide>
        <img src={props.data.firstImg} alt="Funny bunny 3" />
      </SwiperSlide>
    </Swiper>
  )
}
