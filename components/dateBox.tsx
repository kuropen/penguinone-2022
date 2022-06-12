import * as React from "react"

type DateBoxProps = {
    date: string
}

const DateBox = ({date}: DateBoxProps) => {
    const dateObj = new Date(date)
    const datePresentation = new Intl.DateTimeFormat('ja-JP').format(dateObj)
    return (<>{datePresentation}</>)
}

export default DateBox
