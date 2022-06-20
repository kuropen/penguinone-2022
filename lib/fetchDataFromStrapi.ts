/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import * as qs from "qs"
import { StrapiData, StrapiResult } from "../@types/strapiResult"

const API_HOST = process.env.API_HOST
const API_URL = API_HOST + '/api/posts'

type FetchDataParams = {
    slug?: string
    page?: number
    limit?: number
    fields?: string[]
}

export type FetchDataResult = {
    allData: StrapiData[]
    hasNextPage: boolean
}

type PaginationParams = {
    page?: number
    pageSize?: number
    withCount?: boolean
}

type FilterConditions = {
    slug?: {
        $eq: string
    }
    date?: {
        $lte: string
    }
    // conditions for other parameters and other operators should be written on-demand
}

type FetchApiParams = {
    filters?: FilterConditions
    sort?: string[]
    pagination?: PaginationParams
    fields?: string[]
}

const FetchDataFromStrapi = async (params?: FetchDataParams): Promise<FetchDataResult> => {
    const requestUrl = new URL(API_URL)

    let allData: StrapiData[] = []

    let page = params?.page || 1
    let hasNextPage = true
    let paginationParam: PaginationParams = {}
    let shouldPaginate = true

    const filterConditions: FilterConditions = {
        date: {
            $lte: new Date().toISOString()
        }
    }

    if (params?.limit) {
        shouldPaginate = false
        paginationParam = {
            pageSize: Math.min(params.limit, 100), // limit must not be over 100
        }
    }

    if (params?.slug) {
        filterConditions.slug = {
            $eq: params.slug
        }
    }

    do {
        paginationParam.page = page

        const apiParams: FetchApiParams = {
            filters: filterConditions,
            sort: ['date:desc'],
            pagination: paginationParam,
        }

        if (params?.fields) {
            apiParams.fields = params.fields
        }

        requestUrl.search = qs.stringify(apiParams, {
            encodeValuesOnly: true,
        })
        const apiResponse = await fetch(requestUrl.toString())
        const result: StrapiResult = await apiResponse.json()
        allData = allData.concat(result.data)

        hasNextPage = (result.meta.pagination.pageCount > page)
        page++
    } while (shouldPaginate && hasNextPage)

    return {
        allData: allData,
        hasNextPage: hasNextPage
    }
}

export default FetchDataFromStrapi
