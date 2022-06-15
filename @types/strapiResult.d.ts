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
