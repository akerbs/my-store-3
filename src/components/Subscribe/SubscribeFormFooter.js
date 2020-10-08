import React, { useState, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers"
import FormControl from "@material-ui/core/FormControl"
import { LanguageContext } from "../layout"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const useStyles = makeStyles(theme => ({
  textFieldEmail: {
    marginRight: 5,
    marginBottom: 3,
  },
  btnSubscribe: {
    marginBottom: 30,
    marginTop: 1,
  },
}))

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Feld ist erforderlich")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter a valid email address"
    ),
  // .email('Please check your email')
})

export default function () {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [token, setToken] = useState("")
  const classes = useStyles()
  const { actLanguage } = useContext(LanguageContext)
  const { register, handleSubmit, reset, errors } = useForm({
    resolver: yupResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  function handleLoadingOn() {
    setLoading(true)
  }
  function handleLoadingOff() {
    setLoading(false)
  }

  const errorEmail = errors.hasOwnProperty("email") && errors["email"].message

  async function onSubmit(data) {
    if (!executeRecaptcha) {
      return
    }
    try {
      //   This is the same as grecaptcha.execute on traditional html script tags
      const result = executeRecaptcha("subscribe_form_footer")
      setToken(result) //--> grab the generated token by the reCAPTCHA
      handleLoadingOn()

      let response = await fetch(
        "https://my-store-1-mailer.herokuapp.com/subscribe",
        // "http://localhost:3000/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      if (response.ok) {
        alert("Thank You!!! You have successfully subscribed :-)")
        //  await navigate("/")
        await reset(response)

        let responseJson = await response.json()
        handleLoadingOff()

        return responseJson
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormControl>
        <TextField
          type="email"
          name="email"
          placeholder="Your email address..."
          variant="outlined"
          size="small"
          className={classes.textFieldEmail}
          inputRef={register}
          error={!!errorEmail}
          helperText={errorEmail}
        />
      </FormControl>
      <Button
        id="submit"
        name="submit"
        type="submit"
        variant="outlined"
        color="default"
        className={classes.btnSubscribe}
        // size="small"
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
