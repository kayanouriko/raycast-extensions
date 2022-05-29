import { Detail, Color } from "@raycast/api"

export default function DetailMetadataTagList(props: { title: string, items: string[] }) {
    const { title, items } = props
    return (
        items.length > 0 ? (
            <Detail.Metadata.TagList title={title}>
                {
                    items.map(item => ( 
                        <Detail.Metadata.TagList.Item
                            key={item}
                            text={item}
                            color={Color.SecondaryText}
                        />
                    ))
                }
            </Detail.Metadata.TagList>
        ) : null
    )
}