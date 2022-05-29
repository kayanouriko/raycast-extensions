import { ActionPanel, List, Action, Icon, useNavigation, openExtensionPreferences } from '@raycast/api'
import useSearch from './ts/useSearch'
import { SearchResult } from './tool/const'
import InfoPage from './components/pages/InfoPage'
import ListItemDetailMetadataLabel from './components/views/ListItemDetailMetadataLabel'
import ListItemDetailMetadataSeparator from './components/views/ListItemDetailMetadataSeparator'
import ListItemPageJump, { ListItemPageJumpType } from './components/views/ListItemPageJump'

export default function Command() {

    const { state, searchHandler, dropHandler, prevHandler, nextHandler } = useSearch()

    // 获取列表构造
    const getLists = () => {
        let lists = []
        if (state.page > state.start) {
            lists.push((
                <ListItemPageJump
                    key={'list-item-page-jump-' + ListItemPageJumpType.Previous}
                    type={ListItemPageJumpType.Previous}
                    actions={
                        <ActionPanel>
                            <Action
                                title='请求上一页数据'
                                onAction={ () => prevHandler() }
                            />
                        </ActionPanel>
                    }
                />
            ))
        }
        lists = lists.concat(state.results.map(result => (
            <ListItem
                key={result.url}
                result={result}
            />
        )))
        if (state.page < state.end) {
            lists.push((
                <ListItemPageJump
                    key={'list-item-page-jump-' + ListItemPageJumpType.Next}
                    type={ListItemPageJumpType.Next}
                    actions={
                        <ActionPanel>
                            <Action
                                title='请求下一页数据'
                                onAction={ () => nextHandler() }
                            />
                        </ActionPanel>
                    }
                />
            ))
        }
        return lists
    }

    return (
        <List
            searchBarPlaceholder='搜索识别码, 影片或演员'
            isLoading={state.isLoading}
            isShowingDetail={state.results.length > 0}
            enableFiltering={false}
            throttle
            onSearchTextChange={searchHandler}
            searchBarAccessory={
                <ListDropdown
                    types={['有码', '无码']}
                    dropHandler={dropHandler}
                />
            }
        >
            {
                state.results.length === 0 ? (
                    <List.EmptyView
                        title='没有搜索到结果'
                    />
                ) : (
                    getLists()
                )
            }
        </List>
    )
}

function ListDropdown(props: { types: string[], dropHandler: (type: string) => void }) {
    const { types, dropHandler } = props
    return (
        <List.Dropdown
            tooltip='在 ... 中搜索影片'
            defaultValue='有码'
            storeValue
            onChange={dropHandler}
        >
            {
                types.map(type => (
                    <List.Dropdown.Item
                        key={type}
                        title={type}
                        value={type}
                    />
                ))
            }
        </List.Dropdown>
    )
}

function ListItem(props: {result: SearchResult}) {
    const { result } = props
    const { push } = useNavigation()
    return (
        <List.Item
            key={result.url}
            title={result.title}
            accessories={[
                { text: result.code }
            ]}
            detail={
                <ListItemDetail
                    result={result}
                />
            }
            actions={ 
                <ActionPanel>
                    <Action
                        title='查看详情'
                        icon={Icon.TextDocument}
                        onAction={ () => push(<InfoPage result={result}/>) }
                    />
                    <Action.OpenInBrowser
                        title='在浏览器中打开'
                        url={result.url}
                        icon={Icon.Globe}
                    />
                    <Action.CopyToClipboard
                        title='复制识别码到剪切板'
                        content={result.code}
                        icon={Icon.Clipboard}
                        shortcut={{modifiers: ['cmd'], key: 'c'}}
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

function ListItemDetail(props: { result: SearchResult }) {
    const { result } = props
    return (
        <List.Item.Detail
            markdown={
                `![${result.thumbnail}](${result.thumbnail})`
            }
            metadata={
                <List.Item.Detail.Metadata>
                    <List.Item.Detail.Metadata.Label
                        title="标题"
                        text={result.title}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                        title="识别码"
                        text={result.code}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <List.Item.Detail.Metadata.Label
                        title="发行日期"
                        text={result.date}
                    />
                    <List.Item.Detail.Metadata.Separator />
                    <ListItemDetailMetadataLabel
                        title="标签"
                        text={result.tags.join(' ')}
                    />
                    <ListItemDetailMetadataSeparator
                        hasSeparator={result.tags.length > 0}
                    />
                    <List.Item.Detail.Metadata.Label
                        title="源网址"
                        text={result.url}
                    />
                    <List.Item.Detail.Metadata.Separator />
                </List.Item.Detail.Metadata>
            }
        />
    )
}
