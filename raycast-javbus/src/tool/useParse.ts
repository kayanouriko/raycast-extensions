import cheerio from 'cheerio'
import { getJavbusURL, SearchResult } from '../tool/const'

// 搜索页面的解析
export function useSearchParse(html: string) {
    const $ = cheerio.load(html)

    // 找出当前和结束的页码
    let page = Number($('.text-center.hidden-xs li[class="active"]').text())
    let end = page
    if (page === 0) {
        page = 1
        end = 1
    } else {
        // 查找最后的页码
        if ($('.text-center.hidden-xs li #next')) {
            end = Number($('.text-center.hidden-xs li #next').parent().prev().text())
        } else {
            end = Number($('.text-center.hidden-xs li').last().text())
        }
    }
    if (end < page) {
        end = page
    }

    const results: SearchResult[] = []
    const $items = $('#waterfall > .item')
    $items.each((_, item) => {
        const $item = $(item)
        const $url = $item.find('.movie-box')
        const $frame = $item.find('.photo-frame > img')

        results.push({
            url: $url.attr('href') ?? '',
            thumbnail: getJavbusURL() + $frame.attr('src'),
            title: $frame.attr('title') ?? '',
            code: $('date', item).first().text(),
            date: $('date', item).last().text(),
            tags: $('.item-tag .btn', item)
                .map((_, tag) => $(tag).text())
                .toArray()
        })
    })
    return {
        page,
        end,
        results
    }
}

// 详情页面的解析
export function useInfoParse(html: string) {
    const $ = cheerio.load(html)
    const $thumbnail = $('.bigImage img')

    // 常规信息收集
    let code = ''
    let date = ''
    let time = ''
    let director = ''
    let producer = ''
    let publisher = ''
    const category: string[] = []
    $('.info .header').each((_, header) => {
        const $header = $(header)
        if ($header.text().includes('識別碼')) {
            code = $header.next().text()
        } else if ($header.text().includes('發行日期')) {
            date = $header.parent().clone().children().remove().end().text().trim()
        } else if ($header.text().includes('長度')) {
            time = $header.parent().clone().children().remove().end().text().trim()
        } else if ($header.text().includes('導演')) {
            director = $header.next().text()
        } else if ($header.text().includes('製作商')) {
            producer = $header.next().text()
        } else if ($header.text().includes('發行商')) {
            publisher = $header.next().text()
        } else if ($header.text().includes('類別')) {
            $header
                .next()
                .find('a')
                .each((_, a) => {
                    const cat = $(a).text()
                    category.push(cat)
                })
        }
    })
    const actors: string[] = []
    $('.info .star-show')
        .next()
        .next()
        .find('a')
        .each((_, a) => {
            const actor = $(a).text()
            actors.push(actor)
        })
    const images: string[] = []
    $('#sample-waterfall .sample-box').each((_, e) => {
        const image = $(e).attr('href') ?? ''
        if (image.length > 0) {
            images.push(image)
        }
    })
    return {
        url: '',
        thumbnail: getJavbusURL() + $thumbnail.attr('src') ?? '',
        title: $thumbnail.attr('title') ?? '',
        code,
        date,
        time,
        director,
        producer,
        publisher,
        category,
        actors,
        images
    }
}
