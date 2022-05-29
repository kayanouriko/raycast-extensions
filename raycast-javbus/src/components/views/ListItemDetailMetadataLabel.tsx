import { List } from "@raycast/api"

export default function ListItemDetailMetadataLabel(props: { title: string, text: string }) {
    const { title, text } = props
    return (
        text.length > 0 ? (
            <List.Item.Detail.Metadata.Label title={title} text={text} />
        ) : null
    )
}