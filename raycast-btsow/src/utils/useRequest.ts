import axios, { Axios, AxiosRequestHeaders, AxiosResponse } from 'axios'
import preferences from './preferences'
import { useURL } from './useURL'

type RequestData = Record<string, string | number>
type RequestMethod = 'get' | 'post'

axios.defaults.baseURL = useURL(preferences.site).href
axios.defaults.headers.common['user-agent'] =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

export default function useRequest(
    url: string,
    method?: RequestMethod,
    json?: RequestData,
    headers?: AxiosRequestHeaders
) {
    const path = encodeURI(url)
    switch (method) {
        case 'post':
            return axios.post(path, json, { headers })
        default:
            return axios.get(path, headers)
    }
}
