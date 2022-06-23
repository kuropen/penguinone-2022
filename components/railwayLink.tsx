/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { PropsWithChildren } from "react"
import * as qs from "qs"

export const RAILWAY_URL = 'https://railway.app/' as const

type RailwayLinkProps = {
    target?: string
    className?: string
}
type RailwayLinkParameters = {
    referralCode: string
}

const RailwayLink = (props: PropsWithChildren<RailwayLinkProps>) => {
    const railwayLink = new URL(RAILWAY_URL)
    if (process.env.NEXT_PUBLIC_RAILWAY_REF_CODE) {
        const linkParams: RailwayLinkParameters = {
            referralCode: process.env.NEXT_PUBLIC_RAILWAY_REF_CODE
        }
        railwayLink.search = qs.stringify(linkParams, {
            encodeValuesOnly: true,
        })
    }
    return (<a href={railwayLink.toString()} {...props} />)
}

export default RailwayLink
