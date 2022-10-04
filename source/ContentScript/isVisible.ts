// @ts-nocheck
function isVisible (element: HTMLElement): Boolean {
    function isVisibleRec (el: HTMLElement | null): Boolean {
        if (!el) return true
        if (el.nodeType === Node.DOCUMENT_NODE) return true;

        let computedStyle = window.getComputedStyle(el, null);
        let display = computedStyle.getPropertyValue('display');
        let visibility = computedStyle.getPropertyValue('visibility');
        let hidden = el.getAttribute('hidden');
        let ariaHidden = el.getAttribute('aria-hidden');

        if ((display === 'none') || (visibility === 'hidden') ||
            (hidden !== null) || (ariaHidden === 'true')) {
            return false;
        }
        return isVisibleRec(el.parentNode);
    }
    return isVisibleRec(element);
}

export default isVisible