import {NodeId} from '../index'
const dataPrefix = 'data-rotor'

const debug = process.env.NODE_ENV ===  "development"

function getHeadingTarget (element: HTMLElement) {
    // First choice: anchor descendant
    const anchorDescendant = element.querySelector('a');
    if (anchorDescendant !== null) return anchorDescendant;
    // Second choice: anchor ancestor
    const anchorAncestor = element.closest('a');
    if (anchorAncestor !== null) return anchorAncestor;
    // Default: heading element
    return element;
}

function jump(dataId: NodeId) {
    let selector = `[${dataPrefix}="${dataId}"]`;
    let target = null;
    let element = document.querySelector(selector) as HTMLElement;
    const getter = getHeadingTarget
    if (element) {
        target = getter(element);
        if (target) {
            let options = { block: 'center' } as ScrollIntoViewOptions;
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.scrollIntoView(options);
        } else {
            if (debug) console.log('couldnt find')
        }
    }
}

export default jump