/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as React from "react"

type SocialIconProps = {
    children: React.ReactNode
    href: string
    title?: string
    rel?: string
}

const SocialIcon = (props: SocialIconProps) => (
    <a className="block rounded-full p-2 shadow-md bg-primary text-baseColor" rel="noopener" {...props} />
)

export default SocialIcon
