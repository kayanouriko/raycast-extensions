import { Action, List, Icon, useNavigation } from "@raycast/api"
import MyActionPanel from "../../common/MyActionPanel"
import useSearch from "../../../hooks/useSearch"
import { SearchResult } from "../../../types/search.dt"
import Detail from "../detail/Detail"
import MyList from "../../common/MyList"
import MyAction from "../../common/MyAction"

export default function SearchList() {
    const { state, onSearchAction, onSearchTextChange, onNextAction, onPrevAction } = useSearch()
    const { push } = useNavigation()
    return (
        <List
            navigationTitle="btsow - search magnets and torrents"
            isLoading={state.isLoading}
            throttle
            onSearchTextChange={onSearchTextChange}
        >
            {
                state.results.length == 0 ? (
                    <List.EmptyView
                        title="No results"
                        description="Try another search term"
                        actions={
                            <MyActionPanel.SearchAndSetting
                                onSearchAction={onSearchAction}
                            />
                        }
                    />
                ) : (
                    <>
                        {state.results.map((result: SearchResult) => (
                            <List.Item
                                key={result.url}
                                title={result.title}
                                accessories={[
                                    { text: result.size, icon: Icon.Document },
                                    { text: result.date, icon: Icon.Calendar },
                                ]}
                                actions={
                                    <MyActionPanel.SearchAndSetting
                                        first={
                                            <Action
                                                title="Detail"
                                                icon={Icon.Sidebar}
                                                onAction={() => push(
                                                    <Detail
                                                        url={result.url}
                                                        searchText={state.search}
                                                    />
                                                )}
                                            />
                                        }
                                        second={
                                            <>
                                                <MyAction.Previous
                                                    onAction={onPrevAction}
                                                />
                                                <MyAction.Next
                                                    onAction={onNextAction}
                                                />
                                            </>
                                        }
                                        onSearchAction={onSearchAction}
                                    />
                                }
                            />
                        ))}
                    </>
                )
            }
        </List>
    )
}