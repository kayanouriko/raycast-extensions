import { ActionPanel, List, Action, Icon, showToast, Toast } from "@raycast/api"
import { useState, useEffect } from "react"
import { getData } from "./tool/api"
import { IListState } from "./tool/interface"
import { parse } from "./tool/parser"

export default function Command() {
    const [state, setState] = useState<IListState>({
        searchText: "",
        isLoading: false,
        items: [],
    })

    const update = async () => {
        setState((previous) => ({ ...previous, isLoading: true }))
        try {
            const data = await getData(state.searchText)
            const items = parse(data)
            setState((previous) => ({ ...previous, isLoading: false, items }))
        } catch (error) {
            setState((previous) => ({
                ...previous,
                error: error instanceof Error ? error : new Error('扩展遇到了未知的错误'),
                isLoading: false,
                items: []
            }))
        }
    }

    useEffect(() => {
        if (state.searchText.length === 0) {
            setState((previous) => ({ ...previous, items: [] }))
        } else {
            update()
        }
    }, [state.searchText])

    useEffect(() => { 
        if (state.error) {
            showToast({
                style: Toast.Style.Failure,
                title: '加载数据失败',
                message: state.error.message,
            })
        }
    }, [state.error])

    return (
        <List
            navigationTitle="小鸡词典 - 好多梗啊!"
            searchBarPlaceholder="请输入梗词条"
            isShowingDetail={state.items.length > 0}
            isLoading={state.isLoading}
            enableFiltering={false}
            throttle
            onSearchTextChange={(searchText) => {
                setState((previous) => ({ ...previous, searchText }))
            }}
        >
            {state.searchText === '' && state.items.length === 0 ? (
                <List.EmptyView
                    icon={{ source: 'logo.png' }}
                    actions={
                        <ActionPanel>
                            <Action
                                title="获取随机梗词条"
                                onAction={update}
                            />
                        </ActionPanel>
                    }
                />
            ): (
                state.items.map((item) => (
                    <List.Item
                        key={item.url}
                        title={item.title}
                        accessories={[
                            {
                                text: item.author,
                                icon: Icon.Person
                            }
                        ]}
                        detail={
                            <List.Item.Detail
                                markdown={item.markdown}
                                metadata={
                                    <List.Item.Detail.Metadata>
                                        <List.Item.Detail.Metadata.Label
                                            title="词条"
                                            text={item.title}
                                        />
                                        <List.Item.Detail.Metadata.Separator />
                                        <List.Item.Detail.Metadata.Label
                                            title="作者"
                                            text={item.author}
                                        />
                                        <List.Item.Detail.Metadata.Separator />
                                        <List.Item.Detail.Metadata.Label
                                            title="评论"
                                            icon="https://jikipedia.com/images/icon/comment_small.png"
                                            text={item.comments}
                                        />
                                        <List.Item.Detail.Metadata.Separator />
                                        <List.Item.Detail.Metadata.Label
                                            title="点赞"
                                            icon="https://jikipedia.com/images/icon/like_small.png"
                                            text={item.likes}
                                        />
                                        <List.Item.Detail.Metadata.Separator />
                                        <List.Item.Detail.Metadata.Label
                                            title="源网址"
                                            text={item.url}
                                        />
                                        <List.Item.Detail.Metadata.Separator />
                                    </List.Item.Detail.Metadata>
                                }
                            />
                        }
                        actions={
                            <ActionPanel>
                                <Action.OpenInBrowser
                                    title="在浏览器中查看梗词条详情"
                                    icon={Icon.Link}
                                    url={item.url}
                                />
                            </ActionPanel>
                            }
                    />
                ))
            )}
        </List>
    )
}
