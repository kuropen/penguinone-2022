import Head from "next/head"
import { Twitter, Facebook, Github, Mastodon } from "@icons-pack/react-simple-icons"
import PenguinImg from "../assets/penguin.png"
import SocialButton from "./socialButton"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { IdentificationIcon } from "@heroicons/react/solid"
import React from "react"

const SOCIAL_ICON_SIZE = 24 as const
const PENGUIN_ICON_SIZE = 48 as const

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            <Head>
                <title>Penguinone</title>
                <link rel="icon" href={PenguinImg.src} />
            </Head>
            <div className="container max-w-screen-md mx-auto">
                <header className="flex flex-col md:flex-row my-2 pb-2 border-b-2 items-center border-b-primary">
                    <Link href="/">
                        <a>
                            <div className="flex flex-col md:flex-row justify-center md:justify-start md:items-end">
                                <div className="flex flex-row items-center justify-center">
                                    <div className="mr-2">
                                        <Image src={PenguinImg} alt="" width={PENGUIN_ICON_SIZE} height={PENGUIN_ICON_SIZE} className="rounded-full" />
                                    </div>
                                    <h1 className="text-3xl orbitron">Penguinone</h1>
                                </div>
                                <div className="italic md:ml-2 pb-2 mx-auto">by Kuropen</div>
                            </div>
                        </a>
                    </Link>
                    <div className="hidden grow md:block"></div>
                    <ul className="flex flex-row justify-center md:justify-end gap-x-2">
                        <li><SocialButton href="https://kuropen.org/" title="Profile"><IdentificationIcon className="w-6" /><span className="sr-only">Profile</span></SocialButton></li>
                        <li><SocialButton href="https://gingadon.com/@kuropen"><Mastodon size={SOCIAL_ICON_SIZE} /><span className="sr-only">Mastodon</span></SocialButton></li>
                        <li><SocialButton href="https://twitter.com/kuropen_aizu"><Twitter size={SOCIAL_ICON_SIZE} /><span className="sr-only">Twitter</span></SocialButton></li>
                        <li><SocialButton href="https://facebook.com/yuda.hirochika"><Facebook size={SOCIAL_ICON_SIZE} /><span className="sr-only">Facebook</span></SocialButton></li>
                        <li><SocialButton href="https://github.com/kuropen"><Github size={SOCIAL_ICON_SIZE} /><span className="sr-only">GitHub</span></SocialButton></li>
                    </ul>
                </header>
                <main>
                    {children}
                </main>
                <footer className="mt-4 mb-2 pt-2 border-t-2 border-t-primary">
                    <address className="text-right">All rights reserved. Copyright (C) <a href="https://kuropen.org/" />Kuropen.</address>
                </footer>
                {process.env.NEXT_PUBLIC_CF_BEACON ? (
                    <Script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON}"}`} />
                ) : <React.Fragment />}
            </div>
        </>
    )
}

export default Layout
