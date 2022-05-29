import { Detail, ActionPanel, Action, Icon, openExtensionPreferences } from '@raycast/api'
import { useEffect } from 'react'
import { InfoResult, SearchResult } from '../../tool/const'
import useInfo from '../../ts/useInfo'
import DetailMetadataLabel from '../views/DetailMetadataLabel'
import DetailMetadataTagList from '../views/DetailMetadataTagList'

export default function InfoPage(props: { result: SearchResult }) { 
    const { result } = props
    const { url } = result
    const { state, update, getMarkdown } = useInfo(url)

    useEffect(() => { 
        update()
    }, [])

    return (
        <Detail
            isLoading={state.isLoading}
            navigationTitle={result.code}
            markdown={getMarkdown()}
            metadata={<DetailMetadata info={state.info} />}
            actions={
                <ActionPanel>
                    <Action.OpenInBrowser
                        title='在浏览器中打开'
                        url={result.url}
                        icon={Icon.Globe}
                    />
                    <Action.CopyToClipboard
                        title='复制识别码到剪切板'
                        content={result.code}
                        icon={Icon.Clipboard}
                    />
                    <Action
                        title='打开扩展设置'
                        icon={Icon.Gear}
                        onAction={ () => openExtensionPreferences() }
                    />
                </ActionPanel>
            }
        />
    )
}

function DetailMetadata(props: { info?: InfoResult }) {
    const { info } = props
    return (
        info ? (
            <Detail.Metadata>
                <DetailMetadataLabel title='识别码' text={info.code} />
                <DetailMetadataLabel title='发行日期' text={info.date} />
                <DetailMetadataLabel title='时长' text={info.time} />
                <DetailMetadataLabel title='导演' text={info.director} />
                <DetailMetadataLabel title='制作商' text={info.producer} />
                <DetailMetadataLabel title='发行商' text={info.publisher} />
                <DetailMetadataTagList title='类别' items={info.category} />
                <DetailMetadataTagList title='出演女优' items={info.actors} />
                <Detail.Metadata.Separator />
                <Detail.Metadata.Link
                    title="源网址"
                    target={info.url}
                    text="来自 javbus.com"
                />
            </Detail.Metadata>
        ) : null
    )
}