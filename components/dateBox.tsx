/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
