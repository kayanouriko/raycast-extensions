import { Detail } from "@raycast/api"

export default function DetailMetadataLabel(props: { title: string, text: string }) {
    const { title, text } = props
    return (
        text.length > 0 ? (
            <Detail.Metadata.Label title={title} text={text} />
        ) : null
    )
}