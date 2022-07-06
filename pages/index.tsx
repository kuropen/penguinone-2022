import type { NextPage } from 'next'
import { PenguinonePostAttribute, StrapiData } from '../@types/strapiResult'
import FetchDataFromStrapi from '../lib/fetchDataFromStrapi'
import Layout from '../components/layout'
import ArticleList from '../components/articleList'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/solid'
import React from 'react'
import RailwayLink from '../components/railwayLink'

type HomePageProps = {
    data: StrapiData<Pick<PenguinonePostAttribute, "slug" | "date" | "title">>[]
    hasNextPage: boolean
}

const Home: NextPage<HomePageProps> = (props: HomePageProps) => {
    return (
        <Layout>
            <ArticleList articles={props.data} />
            {props.hasNextPage ? (
                <nav>
                    <Link href={`/backnumber/2`}>
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
            <section className="my-4 pt-2 px-2 md:px-0 border-t-2 border-t-primary">
                This website is generated with <a href="https://nextjs.org/" className="underline" target="_blank">Next.js</a> {/**/}
                and served via <RailwayLink className="underline" target="_blank">Railway</RailwayLink>.<br />
                Icons used in this website are <a href="https://simpleicons.org/" className="underline" target="_blank">Simple Icons</a> and {/**/}
                <a href="https://heroicons.com/" className="underline" target="_blank">Heroicons</a>.<br />
                <a href="https://gitlab.com/kuropen/penguinone-2022" className="underline" target="_blank">Source code for this website</a>
            </section>
        </Layout>
    )
}

export default Home

export async function getStaticProps() {
    const data = await FetchDataFromStrapi({
        limit: 10,
        fields: [
            'slug',
            'date',
            'title',
        ],
    })
    return {
        props: {
            data: data.allData,
            hasNextPage: data.hasNextPage,
        },
        revalidate: 900,
    }
}
