import { getPreferenceValues } from '@raycast/api'
import { URL } from 'url'

interface Preferences {
    site: string
}

const preferences: Preferences = getPreferenceValues()

export default preferences
