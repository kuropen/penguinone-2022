/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export type PenguinonePostAttribute = {
    title: string
    slug: string
    date: string
    body: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export type StrapiData<T extends Partial<PenguinonePostAttribute> = PenguinonePostAttribute> = {
    id: number
    attributes: T
}

export type StrapiPagination = {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export type StrapiMeta = {
    pagination: StrapiPagination
}

export type StrapiResult = {
    data: Array<StrapiData>
    meta: StrapiMeta
}
