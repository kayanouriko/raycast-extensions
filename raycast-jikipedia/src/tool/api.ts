import axios from 'axios'

const jikipedia_url = 'https://jikipedia.com/'
const jikipedia_url_search = 'https://jikipedia.com/search?phrase='

export const getData = async (searchText: string = '') => {
    let url = jikipedia_url
    if (searchText && searchText.length > 0) {
        url = jikipedia_url_search + searchText
    }
    const res = await axios.get(encodeURI(url))
    return res.data
}
