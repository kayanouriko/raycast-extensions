import { useEffect, useState } from 'react'
import useRequest from '../utils/useRequest'
import type { SearchState } from '../types/search.dt'
import { showToast, Toast } from '@raycast/api'
import { useSearchParse } from './useParser'

export default function useSearch() {
    // 创建状态模型
    const [state, setState] = useState<SearchState>({
        search: '',
        start: 1,
        page: 1,
        end: 1,
        isLoading: false,
        results: []
    })

    // 监听错误信息
    useEffect(() => {
        if (state.error && state.error.length > 0) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Loading Failed',
                message: state.error
            })
        }
    }, [state.error])

    const update = async () => {
        if (state.search.length == 0) {
            return
        }
        try {
            const { data } = await useRequest('/search/' + state.search + '/page/' + state.page)
            const { ends, results } = useSearchParse(data)
            const end = ends.pop() ?? 1
            setState((p) => ({
                ...p,
                isLoading: false,
                end,
                results
            }))
        } catch (error) {
            setState((p) => ({
                ...p,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Unknown Error'
            }))
        }
    }

    useEffect(() => {
        if (state.isLoading) {
            update()
        }
    }, [state.isLoading])

    // 搜索 action 执行时触发
    const onSearchAction = () => {
        setState((p) => ({ ...p, isLoading: true, page: 1, end: 1 }))
    }

    // 文本框内容改变时触发
    const onSearchTextChange = (search: string) => {
        setState((p) => ({ ...p, search, page: 1, end: 1 }))
    }

    // 点击了下一页
    const onNextAction = () => {
        if (state.page >= state.end) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Handling Error',
                message: 'Already the last page or search text has changed'
            })
            return
        }
        setState((p) => ({ ...p, isLoading: true, page: p.page + 1 }))
    }

    // 点击了上一页
    const onPrevAction = () => {
        if (state.page <= state.start) {
            showToast({
                style: Toast.Style.Failure,
                title: 'Handling Error',
                message: 'Already the first page or search text has changed'
            })
            return
        }
        setState((p) => ({ ...p, isLoading: true, page: p.page - 1 }))
    }

    return { state, onSearchAction, onSearchTextChange, onNextAction, onPrevAction }
}
