import React from "react"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"

const selectMenuWidth = window.innerWidth <= 599 ? 288 : 348

const useStyles = makeStyles(theme => ({
  selectRoot: {},
  select: {},
  selectMenu: {
    width: selectMenuWidth,
    padding: "2.109% 0 2.109% 3%",
    margin: 0,
    marginBottom: "-0.25%",
    fontSize: 16,
  },
  selectX: {
    "& li": {
      fontSize: 16,
    },
  },
}))

export function AllCountriesRus(props) {
  const classes = useStyles()

  return (
    <Select
      classes={{
        root: classes.selectRoot,
        select: classes.select,
        selectMenu: classes.selectMenu,
      }}
      MenuProps={{ classes: { paper: classes.selectX } }}
      size="small"
      id="country"
      name="country"
      // control={control}
      defaultValue={props.country}
      value={props.country}
      onChange={props.changeHandler}
      // inputRef={register({
      //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
      // })}
    >
      <MenuItem value={"DE"} key={"DE"}>
        Германия
      </MenuItem>
      <MenuItem value={"FR"} key={"FR"}>
        Франция
      </MenuItem>
      <MenuItem value={"US"} key={"US"}>
        Соединённые Штаты
      </MenuItem>
      <MenuItem value={"RU"} key={"RU"}>
        Российская Федерация
      </MenuItem>
    </Select>
  )
}

export function AllCountriesDeu(props) {
  const classes = useStyles()

  return (
    <Select
      classes={{
        root: classes.selectRoot,
        select: classes.select,
        selectMenu: classes.selectMenu,
      }}
      MenuProps={{ classes: { paper: classes.selectX } }}
      size="small"
      id="country"
      name="country"
      // control={control}
      defaultValue={props.country}
      value={props.country}
      onChange={props.changeHandler}
      // inputRef={register({
      //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
      // })}
    >
      <MenuItem value={"DE"} key={"DE"}>
        Deutschland
      </MenuItem>
      <MenuItem value={"FR"} key={"FR"}>
        Frankreich
      </MenuItem>
      <MenuItem value={"US"} key={"US"}>
        Vereinigte Staaten
      </MenuItem>
      <MenuItem value={"RU"} key={"RU"}>
        Russische Föderation
      </MenuItem>
    </Select>
  )
}

export function AllCountriesEng(props) {
  const classes = useStyles()

  return (
    <Select
      classes={{
        root: classes.selectRoot,
        select: classes.select,
        selectMenu: classes.selectMenu,
      }}
      MenuProps={{ classes: { paper: classes.selectX } }}
      size="small"
      id="country"
      name="country"
      // control={control}
      defaultValue={props.country}
      value={props.country}
      onChange={props.changeHandler}
      // inputRef={register({
      //   required: "ОБЯЗАТЕЛЬНО ДЛЯ ЗАПОЛНЕНИЯ",
      // })}
    >
      <MenuItem value={"DE"} key={"DE"}>
        Germany
      </MenuItem>
      <MenuItem value={"FR"} key={"FR"}>
        France
      </MenuItem>
      <MenuItem value={"US"} key={"US"}>
        United States
      </MenuItem>
      <MenuItem value={"RU"} key={"RU"}>
        Russian Federation
      </MenuItem>
    </Select>
  )
}
