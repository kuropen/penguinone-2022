import type { GetStaticPathsResult, GetStaticPropsResult, NextPage } from 'next'
import { PenguinonePostAttribute, StrapiData } from '../../@types/strapiResult'
import FetchDataFromStrapi from '../../lib/fetchDataFromStrapi'
import Layout from '../../components/layout'
import ArticleList from '../../components/articleList'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import React from 'react'

const LIMIT_PER_PAGE = 10 as const

type BackNumberPageProps = {
    data: StrapiData<Pick<PenguinonePostAttribute, "slug" | "date" | "title">>[]
    hasNextPage: boolean
    page: number
}

const BackNumberPageTemplate: NextPage<BackNumberPageProps> = (props: BackNumberPageProps) => {
    return (
        <Layout>
            {props.page > 1 ? (
                <nav>
                    <Link href={props.page > 2 ? `/backnumber/${props.page - 1}` : '/'}>
                        <a>
                            <div className="bg-primary text-baseColor border rounded-md shadow-md my-2 p-2 flex flex-row justify-center items-center mx-1 md:mx-0">
                                <div>
                                    <ChevronUpIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    新しい記事を読む
                                </div>
                            </div>
                        </a>
                    </Link>
                </nav>
            ) : <React.Fragment />}
            <ArticleList articles={props.data} />
            {props.hasNextPage ? (
                <nav>
                    <Link href={`/backnumber/${props.page + 1}`}>
                        <a>
                            <div className="bg-primary text-baseColor border rounded-md shadow-md my-2 p-2 flex flex-row justify-center items-center mx-1 md:mx-0">
                                <div>
                                    <ChevronDownIcon className="h-8 w-8" />
                                </div>
                                <div>
                                    古い記事を読む
                                </div>
                            </div>
                        </a>
                    </Link>
                </nav>
            ) : <React.Fragment />}
        </Layout>
    )
}

export default BackNumberPageTemplate

type StaticPropsParams = {
    params: {
        page: string
    }
}

export async function getStaticProps(args: StaticPropsParams): Promise<GetStaticPropsResult<BackNumberPageProps>> {
    const pageNum = parseInt(args.params.page)
    if (pageNum === 1) {
        // page "1" is redirected to avoid duplicate with the top page
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }
    const data = await FetchDataFromStrapi({
        limit: LIMIT_PER_PAGE,
        page: pageNum,
        fields: [
            'slug',
            'date',
            'title',
        ],
    })
    if (data.allData.length === 0) {
        return {
            notFound: true,
            revalidate: 900,
        }
    }
    return {
        props: {
            data: data.allData,
            hasNextPage: data.hasNextPage,
            page: pageNum
        },
        revalidate: 900,
    }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
    const data = await FetchDataFromStrapi()
    const dataCount = data.allData.length
    const pageCount = Math.ceil(dataCount / LIMIT_PER_PAGE)

    const paths: StaticPropsParams[] = []

    for (let i = 1; i < pageCount; i++) {
        // exclude page "1" from prerender
        paths.push({
            params: {
                page: `${i + 1}`
            }
        })
    }
    return {paths: paths, fallback: true}
}
