/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Link from "next/link"
import { AnchorHTMLAttributes } from "react"
import RailwayLink, { RAILWAY_URL } from "./railwayLink"

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Replace anchor with component if necessary
 * @param props Attributes
 * @returns Properly processed anchor object
 */
const anchorReplacer = (props: AnchorProps) => {
    if (props.href?.charAt(0) === '/') {
        // anchor for relative path should be replaced to Next.js link component
        return (<Link href={props.href}><a {...props}></a></Link>)
    }
    if (props.href === RAILWAY_URL) {
        return (<RailwayLink target="_blank">{props.children}</RailwayLink>)
    }
    return (<a target="_blank" {...props} />)
}
export default anchorReplacer
