export interface IData {
    url: string
    title: string
    author: string
    comments: string
    likes: string
    markdown: string
}

export interface IListState {
    searchText: string
    isLoading: boolean
    items: IData[]
    error?: Error
}
