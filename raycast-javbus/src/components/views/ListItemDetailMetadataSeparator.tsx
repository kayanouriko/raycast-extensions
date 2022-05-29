import { List } from "@raycast/api"

export default function ListItemDetailMetadataSeparator(props: { hasSeparator?: boolean }) {
    const { hasSeparator } = props
    return (
        hasSeparator ? (
            <List.Item.Detail.Metadata.Separator />
        ) : null
    )
}