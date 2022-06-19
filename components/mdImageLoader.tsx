import Image from "next/image"
import * as React from "react"

const MdImageLoader = (props: any) => {
    // The lint control below is because `props` may contain alt text:
    // eslint-disable-next-line jsx-a11y/alt-text
    return (<Image width={768} height={512} objectFit="contain" {...props} />)
}

export default MdImageLoader
