function refAndGetHeadings(document: any) {
    const headings: any[] = []
    const headingsFromDOM = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingsFromDOM.forEach((element: any, i: any) => {
        const dataId = 'h-' + i
        element.setAttribute('something', dataId);
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