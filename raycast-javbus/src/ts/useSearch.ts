import { useEffect, useState } from 'react'
import { showToast, Toast } from '@raycast/api'
import axios from 'axios'
import { SearchState, JAVBUS_SEARCH_URL, JAVBUS_UNCENSORED_SEARCH_URL } from '../tool/const'
import { useSearchParse } from '../tool/useParse'

export default function useSearch() {
    const [state, setState] = useState<SearchState>({
        searchText: '',
        type: '有码',
        start: 1,
        end: 1,
        page: 1,
        isLoading: false,
        results: []
    })

    const update = async () => {
        setState((prevState) => ({
            ...prevState,
            isLoading: true
        }))
        try {
            const { data } = await axios.get(
                encodeURI(
                    (state.type === '有码' ? JAVBUS_SEARCH_URL : JAVBUS_UNCENSORED_SEARCH_URL) +
                        state.searchText +
                        `/${state.page}`
                ),
                {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0'
                    }
                }
            )
            const result = useSearchParse(data)
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
                ...result
            }))
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
                error: error instanceof Error ? error.message : '未知错误',
                results: []
            }))
        }
    }

    useEffect(() => {
        state.searchText.length > 0
            ? update()
            : setState((prevState) => ({
                  ...prevState,
                  results: []
              }))
    }, [state.searchText, state.page, state.type])

    useEffect(() => {
        if (state.error) {
            showToast({
                style: Toast.Style.Failure,
                title: '加载数据失败',
                message: state.error
            })
        }
    }, [state.error])

    const searchHandler = (searchText: string) => {
        setState((prevState) => ({
            ...prevState,
            searchText,
            page: 1,
            end: 1
        }))
    }

    const dropHandler = (type: string) => {
        setState((prevState) => ({
            ...prevState,
            type,
            page: 1,
            end: 1
        }))
    }

    const prevHandler = () => {
        setState((prevState) => ({
            ...prevState,
            page: prevState.page - 1
        }))
    }

    const nextHandler = () => {
        setState((prevState) => ({
            ...prevState,
            page: prevState.page + 1
        }))
    }

    return {
        state,
        searchHandler,
        dropHandler,
        prevHandler,
        nextHandler
    }
}
