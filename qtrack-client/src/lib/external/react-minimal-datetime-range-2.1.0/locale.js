let locale = {
  "en-us": {
    today: "Today",
    reset: "Reset",
    "reset-date": "Reset Date",
    clear: "Clear",
    now: "Now",
    weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    date_format: (month, year) => {
      return `${month} ${year}`
    },
    date: "Select date",
    time: "Select time",
    confirm: "Confirm",
    start: "Start",
    end: "End"
  },
}

const getCustomLocale = (o, m) => {
  if (
    !o ||
    typeof o !== "object" ||
    o.constructor !== Object ||
    !Object.keys(o).length
  ) {
    console.error("wrong structure")
    return false
  }
  Object.keys(o).map(i => {
    if (!m[i]) {
      m[i] = o[i]
    } else {
      if (Object.keys(o[i]).length) {
        Object.keys(o[i]).map(j => {
          m[i][j] = o[i][j]
        })
      }
    }
  })
  return m
}

const handleCustomLocale = (locale, w) => {
  let res
  if (typeof w !== "undefined") {
    if (
      w.REACT_MINIMAL_DATETIME_RANGE &&
      w.REACT_MINIMAL_DATETIME_RANGE["customLocale"]
    ) {
      res = getCustomLocale(
        w.REACT_MINIMAL_DATETIME_RANGE["customLocale"],
        locale
      )
    }
  }
  if (typeof res === "undefined" || res === false) {
    return locale
  }
  return res
}

if (typeof window !== "undefined") {
  window.REACT_MINIMAL_DATETIME_RANGE =
    window.REACT_MINIMAL_DATETIME_RANGE || {}
  locale = handleCustomLocale(locale, window)
}

export default locale
