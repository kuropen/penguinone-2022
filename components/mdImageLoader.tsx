/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Image from "next/image"
import * as React from "react"

const MdImageLoader = (props: any) => {
    // The lint control below is because `props` may contain alt text:
    // eslint-disable-next-line jsx-a11y/alt-text
    return (<Image width={768} height={512} objectFit="contain" {...props} />)
}

export default MdImageLoader
