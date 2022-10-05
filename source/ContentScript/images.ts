import {ImageNodeId, Images} from "../index"
import isVisible from "./isVisible";

function refAndGetHeadings(document: Document, {dataPrefix}: {dataPrefix: string}): Images {
    const images: Images = []
    const imagesFromDOM = document.querySelectorAll("img") as NodeListOf<HTMLImageElement>;
    imagesFromDOM.forEach((element: HTMLImageElement, i: number) => {
        if (!isVisible(element)) return
        
        const dataId: ImageNodeId = `g-${i}`
        element.setAttribute(dataPrefix, dataId);

        const altText = element.getAttribute('alt')
        if (!altText) {
            console.log('SKIPPING IMAGE WITH EMPTY STRING ALT TEXT')
            // screenreaders skip images with present alt attribute but empty value
            return
        }

        const title = element.getAttribute('title')
        images.push({
            type: 'image',
            'data-id': dataId,
            content: altText + (title ? ` ${title}` : ''),
            isFallbackText: false
        });
    });
    return images
}

export default refAndGetHeadings
