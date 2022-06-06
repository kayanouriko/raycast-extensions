import { useEffect, useState } from 'react'
import useRequest from '../utils/useRequest'
import { showToast, Toast } from '@raycast/api'
import { DetailState } from '../types/detail.dt'
import { useDetailParse } from './useParser'

export default function useDetail(url: string) {
    // 创建状态模型
    const [state, setState] = useState<DetailState>({
        isLoading: false
    })

    // 监听错误信息
    useEffect(() => {
        if (state.error && state.error.length > 0) {
            showToast({
                style: Toast.Style.Failure,
                title: '数据加载失败',
                message: state.error
            })
        }
    }, [state.error])

    useEffect(() => {
        const update = async () => {
            setState((p) => ({ ...p, isLoading: true }))
            try {
                const { data } = await useRequest(url)
                const datas = useDetailParse(data)
                setState((p) => ({ ...p, isLoading: false, datas }))
            } catch (error) {
                setState((p) => ({
                    ...p,
                    isLoading: false,
                    error: error instanceof Error ? error.message : '请求发生未知错误'
                }))
            }
        }
        update()
    }, [])

    const getMarkdown = () => {
        let markdown = 'Loading...'
        if (state.datas) {
            markdown = `### ${state.datas.title}\n\n`
            markdown += `${state.datas.magnet}\n\n`
            if (state.datas.info.length > 0) {
                markdown += '#### File Name & Size\n\n'
                state.datas.info.forEach((item) => {
                    markdown += `* ${getEmoji(item.type)} ${item.name} - [${item.size}]\n`
                })
            }
        }
        return markdown
    }

    // 辅助函数
    const getEmoji = (type: string[]) => {
        if (type.includes('glyphicon-bookmark')) {
            return '📖'
        } else if (type.includes('glyphicon-film')) {
            return '🎬'
        } else if (type.includes('glyphicon-picture')) {
            return '🖼'
        } else if (type.includes('glyphicon-file')) {
            return '📄'
        } else if (type.includes('glyphicon-book')) {
            return '📕'
        } else {
            return ''
        }
    }

    return { state, getMarkdown }
}
