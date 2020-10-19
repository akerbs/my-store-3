import React, { useState, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import { LanguageContext } from "../layout"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import clsx from "clsx"

const useStyles = makeStyles(theme => ({
  textFieldEmail: {
    marginRight: 5,
    marginBottom: 3,
  },
  btnSubscribe: {
    marginBottom: 30,
    marginTop: 1,
  },
  errorMsg: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgb(220,39,39)",
  },

  textfieldError: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderWidth: 1,
        borderColor: "rgb(220,39,39)",
      },
      "&:hover fieldset": {
        borderColor: "rgb(220,39,39)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}))

export default function () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [tokenRecapcha, setTokenRecapcha] = useState("")
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    email: "",
  })
  const [errorMsg, setErrorMsg] = useState(null)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const resetHandler = event => {
    setForm({ email: "" })
    setErrorMsg(null)
    // document.getElementById("email").classList.remove("textfieldError")
  }

  function handleLoadingOn() {
    setLoading(true)
  }
  function handleLoadingOff() {
    setLoading(false)
  }

  const emailValue = form.email

  const onSubmit = async event => {
    event.preventDefault()

    if (form.email === "") {
      setErrorMsg("field is requred")
    } else if (!form.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      setErrorMsg("email is wrong")
    } else {
      if (!executeRecaptcha) {
        return
      }
      try {
        //   This is the same as grecaptcha.execute on traditional html script tags
        const result = executeRecaptcha("store1")
        setTokenRecapcha(result) //--> grab the generated token by the reCAPTCHA
        handleLoadingOn()

        const data = JSON.stringify({ emailValue, tokenRecapcha })

        let response = await fetch(
          // "https://my-store-1-mailer.herokuapp.com/subscribe",
          "http://localhost:3000/subscribe",
          {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: data,
          }
        )
        if (response.ok) {
          alert("Thank You!!! You have successfully subscribed :-)")

          let responseJson = await response.json()
          resetHandler()

          handleLoadingOff()

          return responseJson
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <span className={classes.errorMsg}>{errorMsg}</span>
      <FormControl
        id="email"
        className={clsx(
          classes.textFieldEmail,
          errorMsg && classes.textfieldError
        )}
      >
        <TextField
          type="email"
          name="email"
          placeholder="Your email address..."
          variant="outlined"
          size="small"
          value={form.email}
          onChange={changeHandler}
        />
      </FormControl>
      <Button
        id="submit"
        name="submit"
        type="submit"
        variant="outlined"
        color="default"
        className={classes.btnSubscribe}
        disabled={loading}
      >
        {loading
          ? actLanguage === "DEU"
            ? "Wird geladen..."
            : actLanguage === "RUS"
            ? "Загрузка ..."
            : actLanguage === "ENG"
            ? "Loading..."
            : "Loading..."
          : actLanguage === "DEU"
          ? "Anmelden"
          : actLanguage === "RUS"
          ? "Подписаться"
          : actLanguage === "ENG"
          ? "Sing up"
          : null}
      </Button>
    </form>
  )
}
