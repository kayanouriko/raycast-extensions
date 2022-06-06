import { Action, Icon, openExtensionPreferences } from "@raycast/api"

const MyAction = {
    Search: ({ onAction }: { onAction?: () => void }) => {
        return <Action
            title="Search"
            icon={Icon.MagnifyingGlass}
            onAction={onAction}
        />
    },
    Setting: () => {
        return <Action
            title="Preferences"
            icon={Icon.Gear}
            shortcut={{ modifiers: ['ctrl'], key: ',' }}
            onAction={() => openExtensionPreferences()}
        />
    },
    Previous: ({ onAction }: { onAction: () => void }) => {
        return <Action
            title="Previous"
            icon={Icon.ChevronUp}
            onAction={onAction}
            shortcut={{ modifiers: ['cmd'], key: 'arrowLeft' }}
        />
    },
    Next: ({ onAction }: { onAction: () => void }) => {
        return <Action
            title="Next"
            icon={Icon.ChevronDown}
            onAction={onAction}
            shortcut={{ modifiers: ['cmd'], key: 'arrowRight' }}
        />
    }
}

export default MyAction