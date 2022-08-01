// @ts-nocheck

document.querySelectorAll('main,[role=main],[role=banner],nav,[role=navigation],footer,[role=contentinfo]').forEach(node => {
    console.log(node)
    console.log(node.getAttribute('aria-label'))
})

import {LandmarkNodeId, Landmark} from "../index"

function capitalizeWord(stringy) {
    return stringy.toLowerCase().split('').map((letter, i) => {
        if (i === 0) {
            return letter.toUpperCase()
        }
        return letter
    }).join('')
}

const landmarksSelectorString = 'main,[role=main],[role=banner],nav,[role=navigation],footer,[role=contentinfo]'

function refAndGetLandmarks(document: Document, {dataPrefix}: {dataPrefix: string}) {
    const landmarks: Array<Landmark> = []
    const landmarksFromDOM = document.querySelectorAll(landmarksSelectorString) as NodeListOf<HTMLElement|HTMLDivElement>;
    landmarksFromDOM.forEach((element: HTMLElement, i: number) => {
        const dataId: LandmarkNodeId = `l-${i}`
        element.setAttribute(dataPrefix, dataId);
        const type = element.role || element.tagName.toLowerCase
        let visibleLabel
        if (type === 'nav') {
            visibleLabel = 'navigation'
        } else {
            visibleLabel = type
        }
        visibleLabel = capitalizeWord(visibleLabel)
        if (element.ariaLabel) {
            visibleLabel += `: ${ element.ariaLabel }`
        }
        // next to annotate the content from aria-labelledby
        landmarks.push({
            'data-id': dataId,
            content: visibleLabel
        });
    });
    return landmarks
}

export default refAndGetLandmarks