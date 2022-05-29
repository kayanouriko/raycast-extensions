import { getPreferenceValues } from '@raycast/api'
// URL
export const JAVBUS_SEARCH_URL = getJavbusURL() + '/search/'
export const JAVBUS_UNCENSORED_SEARCH_URL = getJavbusURL() + '/uncensored/' + 'search/'

export function getJavbusURL() {
    return getPreferenceValues().javbusURL
}

/** 搜索结果 */
export interface SearchResult {
    url: string
    thumbnail: string
    title: string
    code: string
    date: string
    tags: string[]
}

/** 搜索状态 */
export interface SearchState {
    searchText: string
    type: string
    start: number
    end: number
    page: number
    isLoading: boolean
    error?: string
    results: SearchResult[]
}

export interface InfoResult {
    url: string
    thumbnail: string
    title: string
    code: string
    date: string
    time: string
    director: string
    producer: string
    publisher: string
    category: string[]
    actors: string[]
    images: string[]
}

export interface InfoState {
    isLoading: boolean
    error?: string
    info?: InfoResult
}

export interface BTSowResult {
    url: string
    name: string
    size: string
    date: string
}
