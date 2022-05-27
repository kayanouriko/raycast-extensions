import cheerio from 'cheerio'
import { IData } from './interface'

const trim = (str: string) => {
    const result = str.replace(/^\s+|\s+$/g, '')
    if (result.length === 0) {
        return '0'
    }
    return result
}

const isEmpty = (str: string) => {
    const result = str.replace(/^\s+|\s+$/g, '')
    return result.length === 0
}

const boldStyle = (str: string) => {
    return `**${str}**`
}

export const parse = (html: string) => {
    const $ = cheerio.load(html)
    let result: IData[] = []
    $('.feed-container div[data-category="definition"]').each((i, elem) => {
        const url = $('a', elem).first().attr('href') ?? ''
        const definition = $('strong.title.pre', elem).text() ?? ''
        const title = isEmpty(definition) ? $('span.text', elem).first().text() ?? '' : definition
        const author = $('div.name', elem).text() ?? ''
        const comments = trim($('div.count-container', elem).first().text() ?? '0')
        const likes = trim($('div.count-container', elem).last().text() ?? '0')

        let markdown = ''
        $('span.brax-node', elem).each((i, ele) => {
            let text = $(ele).text() ?? ''
            if ($(ele).hasClass('brax-bold')) {
                text = boldStyle(text)
            }
            markdown += `${text}\n`
        })

        result.push({ url, title, author, comments, likes, markdown })
    })
    return result
}
