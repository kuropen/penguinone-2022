import * as React from "react"

type SocialIconProps = {
    children: React.ReactNode
    href: string
}

const SocialIcon = (props: SocialIconProps) => (
    <a className="block rounded-full p-2 shadow-md bg-primary text-baseColor" rel="noopener" {...props} />
)

export default SocialIcon
