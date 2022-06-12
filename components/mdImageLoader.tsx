import Image from "next/image"
import * as React from "react"

const MdImageLoader = (props: any) => {
    return (<Image width={768} height={512} objectFit="contain" {...props} />)
}

export default MdImageLoader
