/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { ChevronRightIcon } from "@heroicons/react/solid"
import { PenguinonePostAttribute, StrapiData } from '../@types/strapiResult'
import DateBox from '../components/dateBox'
import Link from 'next/link'

type ArticleListProps = {
    articles?: StrapiData<Pick<PenguinonePostAttribute, "date" | "slug" | "title">>[]
}

const ArticleList: React.FC<ArticleListProps> = (props: ArticleListProps) => {
    return (
        <section className="grid gap-2">
        {
            props.articles?.map((item) => (
                <div key={item.id}>
                    <Link href={`/posts/${item.attributes.slug}`}>
                        <a>
                            <div className="border rounded-md shadow-md p-2 flex flex-row items-center mx-1 md:mx-0">
                                <div className="flex-grow">
                                    <div className="text-xl">
                                        {item.attributes.title}
                                    </div>
                                    <div>
                                        <DateBox date={item.attributes.date} />
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-8 w-8" />
                                </div>
                            </div>
                        </a>
                    </Link>
                </div>
            ))
        }
        </section>
    )
}

export default ArticleList
