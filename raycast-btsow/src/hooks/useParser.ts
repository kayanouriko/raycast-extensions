import { parse } from 'muninn'
import { InputConfig } from 'muninn/build/config/types'
import { DetailData } from '../types/detail.dt'
import { SearchResult } from '../types/search.dt'

export function useSearchParse(html: string) {
    const config: InputConfig = {
        schema: {
            ends: {
                selector: '.pagination > .hidden-xs',
                type: 'array',
                transform: (value) => Number(value) ?? 1
            },
            results: {
                selector: '.data-list .row:not(.hidden-xs)',
                type: 'array',
                schema: {
                    title: {
                        selector: 'a',
                        attr: 'title'
                    },
                    url: {
                        selector: 'a',
                        attr: 'href',
                        transform: (value) => `https:${value}`
                    },
                    size: '.size',
                    date: '.date',
                    magnet: {
                        selector: 'a',
                        attr: 'href',
                        transform: (value) => `magnet:?xt=urn:btih:${value.split('/').pop()}`
                    }
                }
            }
        }
    }
    const { ends, results } = parse(html, config)
    return {
        ends: ends as number[],
        results: results as SearchResult[]
    }
}

export function useDetailParse(html: string) {
    const config: InputConfig = {
        schema: {
            data: {
                schema: {
                    title: 'h3',
                    magnet: '#magnetLink',
                    hash: '.data-list .row .value',
                    count: '.data-list .row:nth-child(2) .value',
                    size: '.data-list .row:nth-child(3) .value',
                    date: '.data-list .row:nth-child(4) .value',
                    keywords: '.data-list .row:nth-child(5) .value a | array',
                    link: {
                        selector: '.data-list .hidden-xs .value',
                        transform: (value) => `https:${value}`
                    },
                    info: {
                        selector: 'div.container > :nth-child(12) .row:not(.row:first-child)',
                        type: 'array',
                        schema: {
                            name: '.file',
                            size: '.size',
                            type: {
                                selector: 'span',
                                attr: 'class',
                                transform: (value) => value.split(' ')
                            }
                        }
                    }
                }
            }
        }
    }
    const { data } = parse(html, config)
    return data as DetailData
}
