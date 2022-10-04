import {HeadingNodeId, Headings} from "../index"
import isVisible from "./isVisible";

import { showVisibleHeadingsOnly } from "./defaultSettings.json";

function refAndGetHeadings(document: Document, {dataPrefix}: {dataPrefix: string}) {
    const headings: Headings = []
    const headingsFromDOM = document.querySelectorAll("h1, h2, h3, h4, h5, h6") as NodeListOf<HTMLHeadingElement>;
    headingsFromDOM.forEach((element: HTMLHeadingElement, i: number) => {
        if (showVisibleHeadingsOnly) {
            if (!isVisible(element)) return
        }
        
        const dataId: HeadingNodeId = `h-${i}`
        element.setAttribute(dataPrefix, dataId);
        const headingLevel = element.tagName.replace('H', '')
        const headingInt = Number(headingLevel)
        headings.push({
            level: headingInt,
            'data-id': dataId,
            textContent: element.textContent
        });
    });
    return headings
}

export default refAndGetHeadings
