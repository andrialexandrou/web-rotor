import jump from "./jumpToContent";
import refAndGetLinks from "./links";
import refAndGetImages from "./images";
import refAndGetHeadings from "./headings"
import refAndGetLandmarks from "./landmarks"
import {Message} from '../index'

const dataPrefix = 'data-rotor'

const chrome = window.chrome
let debug = true
let contentPort: chrome.runtime.Port

chrome.runtime.onConnect.addListener(connectionHandler);
function connectionHandler (port: chrome.runtime.Port) {
    if (debug) console.log(`port.name: ${port.name}`);
    if (!port && debug) console.log('could not find port')
    contentPort = port;
    contentPort.onMessage.addListener(portMessageHandler);
}
function portMessageHandler (message: Message) {
    if (message.id === 'init') {
        if (debug) console.log('init')
        const headings = refAndGetHeadings(document, {dataPrefix})
        const landmarks = refAndGetLandmarks(document, {dataPrefix})
        const links = refAndGetLinks(document, {dataPrefix})
        const images = refAndGetImages(document, {dataPrefix})
        const message: Message = {
            id: 'page_content',
            content: {
                headings,
                landmarks,
                links,
                images
            }
        }
        sendMessage(message);
    }
    if (message.id === 'jump') {
        if (message.node) jump(message.node)
    }
}

function sendMessage(message: Message) {
    contentPort.postMessage(message)
}

export {};
