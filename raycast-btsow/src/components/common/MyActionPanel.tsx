import { Action, ActionPanel } from "@raycast/api"
import MyAction from "./MyAction"

interface ActionPanelExtensionProps {
    first?: ActionPanel.Children
    second?: ActionPanel.Children
    onSearchAction?: () => void
}

const MyActionPanel = {
    Search: ({ first, second, onSearchAction }: ActionPanelExtensionProps) => {
        return (
            <ActionPanel>
                {first}
                <MyAction.Search onAction={onSearchAction} />
                {second}
            </ActionPanel>
        )
    },
    Setting: ({ first, second }: ActionPanelExtensionProps) => {
        return (
            <ActionPanel>
                {first}
                <MyAction.Setting />
                {second}
            </ActionPanel>
        )
    },
    SearchAndSetting: ({ first, second, onSearchAction }: ActionPanelExtensionProps) => {
        return (
            <MyActionPanel.Search
                first={first}
                second={(
                    <>
                        <MyAction.Setting />
                        {second}
                    </>
                )}
                onSearchAction={onSearchAction}
            />
        )
    }
}

export default MyActionPanel
