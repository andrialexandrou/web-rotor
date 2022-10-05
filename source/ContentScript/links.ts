import isVisible from "./isVisible";
import {LinkNodeId, Links} from "../index"

function refAndGetLinks(document: Document, {dataPrefix}: {dataPrefix: string}): Links {
    const links: Links = []

    const linksFromDOM = document.querySelectorAll('a[href],span[role=link],img[role=link]') as NodeListOf<HTMLAnchorElement>;
    linksFromDOM.forEach((el: HTMLElement, i) => {
        if (!isVisible(el)) return

        const text = (el.outerText || el.getAttribute('alt') || el.ariaLabel || '').trim().split(/\s+/).join(' ')
        const href = el.getAttribute('href')
        const hasHref = href && href.length > 0
        if (!text || !hasHref) return

        const dataId: LinkNodeId = `k-${i}`
        el.setAttribute(dataPrefix, dataId);
        links.push({
            type: 'link',
            'data-id': dataId,
            content: text,
            href
        })
    })

    return links
}

export default refAndGetLinks
