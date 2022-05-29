import { List, Icon } from "@raycast/api"

export enum ListItemPageJumpType {
    Next = "next",
    Previous = "previous",
}

export default function ListItemPageJump(props: { type: ListItemPageJumpType, actions?: React.ReactNode }) {
    const { type, actions } = props
    return (
        <List.Item
            title={getTitle(type)}
            icon={getIcon(type)}
            actions={actions}
        />
    )
}

function getTitle(type: ListItemPageJumpType) {
    return type === ListItemPageJumpType.Next ? '下一页' : '上一页'
}

function getIcon(type: ListItemPageJumpType) {
    return type === ListItemPageJumpType.Next ? Icon.ChevronDown : Icon.ChevronUp
}