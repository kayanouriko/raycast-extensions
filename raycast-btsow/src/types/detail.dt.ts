export interface DetailState {
    isLoading: boolean
    error?: string
    datas?: DetailData
}

export interface DetailData {
    title: string
    magnet: string
    hash: string
    count: string
    size: string
    date: string
    keywords: string[]
    link: string
    info: DetailDataFileInfo[]
}

export interface DetailDataFileInfo {
    name: string
    size: string
    type: string[]
}
