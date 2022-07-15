// @ts-nocheck

const dataPrefix = 'data-rotor'

const debug = true

function getHeadingTarget (element) {
    // First choice: anchor descendant
    const anchorDescendant = element.querySelector('a');
    if (anchorDescendant !== null) return anchorDescendant;
    // Second choice: anchor ancestor
    const anchorAncestor = element.closest('a');
    if (anchorAncestor !== null) return anchorAncestor;
    // Default: heading element
    return element;
  }

function jump(dataId) {
    let selector = `[${dataPrefix}="${dataId}"]`;
    let isHeading = dataId.startsWith('h-');
    let target = null;
    let element = document.querySelector(selector);
    if (element) {
        target = isHeading ? getHeadingTarget(element) : getLandmarkTarget(element);
        if (target) {
            let options = { behavior: 'smooth', block: 'center' };
            target.setAttribute('tabindex', '-1');
            target.setAttribute('style', 'outline: 1px solid green')
            target.focus();
            target.scrollIntoView(options);
        } else {
            let status = (target === null) ? 'null' : !isVisible(target) ? 'not visible' : 'unknown';
            if (debug) console.log(`target: ${target.tagName.toLowerCase()} - status: ${status}`);
        }
    }
}

export default jump