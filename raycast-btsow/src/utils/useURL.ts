import { URL } from 'url'

export const useURL = (url: string) => {
    return new URL(url)
}

export const appendPath = (url: URL, path: string) => {
    return new URL(url.href + path)
}
