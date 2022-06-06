import { Action, Color, Detail, Icon } from "@raycast/api"
import useDetail from "../../../hooks/useDetail"
import MyActionPanel from "../../common/MyActionPanel"

export default function SearchDetail({ url, searchText }: { url: string, searchText: string }) {
    const { state, getMarkdown } = useDetail(url)
    return (
        <Detail
            navigationTitle={searchText}
            isLoading={state.isLoading}
            markdown={getMarkdown()}
            metadata={
                state.datas ? (
                    <Detail.Metadata>
                        <Detail.Metadata.Label title="Torrent Hash" text={state.datas?.hash} />
                        <Detail.Metadata.Label title="Number of Files" text={state.datas?.count} />
                        <Detail.Metadata.Label title="Content Size" text={state.datas?.size} />
                        <Detail.Metadata.Label title="Convert On" text={state.datas?.date} />
                        <Detail.Metadata.TagList title="Keywords">
                            {state.datas?.keywords.map((keyword) => (
                                <Detail.Metadata.TagList.Item key={keyword} text={keyword} color={Color.SecondaryText} />
                            ))}
                        </Detail.Metadata.TagList>
                        <Detail.Metadata.Separator />
                        <Detail.Metadata.Link
                            title="Link"
                            target={state.datas?.link}
                            text="From http://btsow.com"
                        />
                    </Detail.Metadata>
                ) : null
            }
            actions={
                <MyActionPanel.Setting
                    first={
                        state.datas ? (
                            <>
                                <Action.OpenInBrowser
                                    title="Open with BT Client"
                                    icon={Icon.Link}
                                    url={state.datas.magnet}
                                />
                                <Action.CopyToClipboard
                                    title="Copy to Clipboard"
                                    icon={Icon.Clipboard}
                                    content={state.datas.magnet}
                                />
                                <Action.OpenInBrowser
                                    title="Open in Browser"
                                    icon={Icon.Globe}
                                    url={state.datas.link}
                                />
                            </>
                        ) : null
                    }
                />
            }
        />
    )
}