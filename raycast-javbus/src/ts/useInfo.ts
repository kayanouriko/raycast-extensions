import { useEffect, useState } from 'react'
import { showToast, Toast } from '@raycast/api'
import axios from 'axios'
import { InfoState } from '../tool/const'
import { useInfoParse } from '../tool/useParse'

export default function useInfo(url: string) {
    const [state, setState] = useState<InfoState>({
        isLoading: false
    })

    const update = async () => {
        setState((prevState) => ({
            ...prevState,
            isloading: true
        }))

        try {
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0'
                }
            })
            const info = useInfoParse(data)
            info.url = url
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
                info
            }))
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                isLoading: false,
                error: error instanceof Error ? error.message : '未知错误'
            }))
        }
    }

    useEffect(() => {
        if (state.error) {
            showToast({
                style: Toast.Style.Failure,
                title: '加载数据失败',
                message: state.error
            })
        }
    }, [state.error])

    const getMarkdown = () => {
        let markdown = ''
        if (state.error) {
            markdown = state.error
        } else if (state.info) {
            const { info } = state
            markdown += `## ${info.title}\n`
            markdown += `![${info.thumbnail}](${info.thumbnail})\n`
            if (info.images.length > 0) {
                markdown += `### 样品图片\n`
                markdown += `${info.images.map((image) => `![${image}](${image})`).join(' ')}`
            }
        } else {
            markdown = '数据正在加载中...'
        }
        return markdown
    }

    return {
        state,
        update,
        getMarkdown
    }
}
