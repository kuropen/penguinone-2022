import { Markdown } from "minista-markdown"
import { ChevronLeftIcon } from "@heroicons/react/solid"
import { StrapiData } from "../../@types/strapiResult"
import DateBox from "../../components/dateBox"
import FetchDataFromStrapi from "../../lib/fetchDataFromStrapi"
import { GetStaticPathsResult, GetStaticPropsResult, NextPage } from "next"
import Head from "next/head"
import Layout from "../../components/layout"
import Link from "next/link"
import MdImageLoader from "../../components/mdImageLoader"
import React from "react"
import CcLicenseBadge from "../../assets/cc-by-sa.svg"
import Image from "next/image"
import AnchorReplacer from "../../components/anchorReplacer"
import PreComponent from "../../components/preComponent"

const OGP_HOST = 'https://b2fct2c7oj.execute-api.us-west-2.amazonaws.com' as const

type PostsPageTemplateProps = {
    data: StrapiData,
    slug: string
}
type PostsPageTemplateParams = {
    params: {
        slug: string
    }
}

const replaceComponents = {
    img: MdImageLoader,
    a: AnchorReplacer,
    pre: PreComponent, 
}

const PostsPageTemplate: NextPage<PostsPageTemplateProps> = (props: PostsPageTemplateProps) => {
    return (
        <Layout>
            <Head>
                <title>{props.data.attributes.title} - Penguinone</title>
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={`${OGP_HOST}/ogp_${props.slug}.png`} />
                <meta name="twitter:title" content={props.data.attributes.title} />
                <meta name="twitter:description" content={`Penguinoneの記事 ${props.data.attributes.title} です。`} />
                <meta name="og:title" content={props.data.attributes.title} />
                <meta name="og:type" content="website" />
                <meta name="og:description" content={`Penguinoneの記事 ${props.data.attributes.title} です。`} />
                <meta name="og:url" content={`https://penguinone.kuropen.org/posts/${props.slug}`} />
                <meta name="og:image" content={`${OGP_HOST}/ogp/${props.slug}`} />
            </Head>
            <article className="mx-1 md:mx-0">
                <section className="border rounded-md shadow-md p-2 bg-primary text-baseColor">
                    <h2 className="text-2xl">{props.data.attributes.title}</h2>
                    <div><DateBox date={props.data.attributes.date} /></div>
                </section>
                <section className="border rounded-md shadow-md p-2 my-2">
                    <div className="prose mx-auto">
                        <Markdown content={props.data.attributes.body} components={replaceComponents} />
                    </div>
                </section>
                {
                    // TODO condition to apply CC license after June 14, 2022 (this version of blog begins operation)
                    (new Date(props.data.attributes.date).getTime() < new Date('2022-06-14T00:00:00Z').getTime()) ? (
                    <aside className="border rounded-md shadow-md p-2 my-2">
                        <div className="flex flex-row">
                            <div className="shrink-0 mr-2">
                                <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license noreferrer noopener" target="_blank">
                                    <Image src={CcLicenseBadge} width={88} height={31} alt="Creative Commons Attribution-ShareAlike 4.0" />
                                </a>
                            </div>
                            <div>この記事は、
                                <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license noreferrer noopener" target="_blank" className="underline">
                                    クリエイティブ・コモンズ 表示-継承 4.0 ライセンス
                                </a>
                                で利用できます。ただし、本文中に特別な取り扱いが明記されている場合は、それに従ってください。
                            </div>
                        </div>
                    </aside>
                ) : <React.Fragment />}
                <nav>
                    <Link href="/">
                        <a className="flex flex-row gap-2 items-center justify-center bg-primary text-baseColor rounded-md shadow-md my-2 p-2 mx-1 md:mx-0">
                            <div><ChevronLeftIcon className="w-8 h-8" /></div>
                            <div>トップページに戻る</div>
                        </a>
                    </Link>
                </nav>
            </article>
        </Layout>
    )
}

export default PostsPageTemplate

export async function getStaticProps(args: PostsPageTemplateParams): Promise<GetStaticPropsResult<PostsPageTemplateProps>> {
    const data = await FetchDataFromStrapi({
        slug: args.params.slug
    })
    if (data.allData.length > 0) {
        return {
            props: {
                data: data.allData[0],
                slug: args.params.slug,
            },
            revalidate: 900,
        }            
    }
    return {
        notFound: true,
        revalidate: 900,
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const data = await FetchDataFromStrapi()
    const paths: PostsPageTemplateParams[] = data.allData.map((item) => ({
        params: {
            slug: item.attributes.slug
        }
    }))
    return {paths: paths, fallback: 'blocking'}
}
