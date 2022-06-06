export interface SearchState {
    search: string
    start: number
    page: number
    end: number
    isLoading: boolean
    error?: string
    results: SearchResult[]
}

export interface SearchResult {
    magnet: string
    url: string
    title: string
    size: string
    date: string
}
