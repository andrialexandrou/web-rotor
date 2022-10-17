import {NodeId} from '../index'
const dataPrefix = 'data-rotor'

const debug = process.env.NODE_ENV ===  "development"

function jump(dataId: NodeId) {
    let selector = `[${dataPrefix}="${dataId}"]`;
    let element = document.querySelector(selector) as HTMLElement;
    if (element) {
        let options = { block: 'center' } as ScrollIntoViewOptions;
        const originalTabIndex = element.getAttribute('tabindex');
        element.setAttribute('tabindex', '-1');
        element.focus();
        element.scrollIntoView(options);

        element.addEventListener('focusout', () => {
            if (originalTabIndex) {
                element.setAttribute('tabindex', originalTabIndex);
            } else {
                element.removeAttribute('tabindex');
            }
        })
    } else {
        if (debug) console.log('couldnt find')
    }
}

export default jump