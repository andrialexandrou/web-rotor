function refAndGetHeadings(document, {dataPrefix}) {
    const headings = []
    const headingsFromDOM = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingsFromDOM.forEach((element, i) => {
        const dataId = 'h-' + i
        element.setAttribute(dataPrefix, dataId);
        // console.log('element', element)
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