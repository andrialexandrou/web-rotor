// @ts-nocheck

import isVisible from "./isVisible";
import {LandmarkNodeId, Landmark} from "../index"

function capitalizeWord(stringy) {
    return stringy.toLowerCase().split('').map((letter, i) => {
        if (i === 0) {
            return letter.toUpperCase()
        }
        return letter
    }).join('')
}

const landmarksSelectorString = 'main,[role=main],[role=search],[role=banner],nav,[role=navigation],aside,footer,[role=contentinfo]'

function refAndGetLandmarks(document: Document, {dataPrefix}: {dataPrefix: string}): Landmarks {
    const landmarks: Array<Landmark> = []
    const landmarksFromDOM = document.querySelectorAll(landmarksSelectorString) as NodeListOf<HTMLElement|HTMLDivElement>;
    landmarksFromDOM.forEach((element: HTMLElement, i: number) => {
        if (!isVisible(element)) return

        const dataId: LandmarkNodeId = `l-${i}`
        element.setAttribute(dataPrefix, dataId);
        const type = element.role || element.tagName.toLowerCase()
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
            type: 'landmark',
            content: visibleLabel,
            role: type
        });
    });
    return landmarks
}

export default refAndGetLandmarks