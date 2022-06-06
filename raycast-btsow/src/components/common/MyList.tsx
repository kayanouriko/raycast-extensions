import { List, Icon, Action } from "@raycast/api"
import MyActionPanel from "./MyActionPanel"

type MyListPageJumpType = 'next' | 'previous'

const MyList = {
    Item: {
        Previous: (props: { onAction?: () => void, onSearchAction?: () => void }) => (<Item type='previous' {...props} />),
        Next: (props: { onAction?: () => void, onSearchAction?: () => void }) => (<Item type='next' {...props} />),
    }
}

function Item({ type, onAction, onSearchAction }: { type: MyListPageJumpType, onAction?: () => void, onSearchAction?: () => void }) {
    return (
        <List.Item
            title={type.toUpperCase()}
            icon={type === 'next' ? Icon.ChevronDown : Icon.ChevronUp}
            actions={
                <MyActionPanel.SearchAndSetting
                    first={
                        <Action
                            title={type === 'next' ? 'Next' : 'Previous'}
                            icon={type === 'next' ? Icon.ChevronDown : Icon.ChevronUp}
                            onAction={onAction}
                        />
                    }
                    onSearchAction={onSearchAction}
                />
            }
        />
    )
}

export default MyList