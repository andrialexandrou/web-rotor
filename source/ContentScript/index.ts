import refAndGetHeadings from "./headings"
import jump from "./jumpToContent";
import {Message} from '../index'

const dataPrefix = 'data-rotor'

const chrome = window.chrome
let debug = true
let contentPort: chrome.runtime.Port

chrome.runtime.onConnect.addListener(connectionHandler);
function connectionHandler (port: chrome.runtime.Port) {
    if (debug) console.log(`port.name: ${port.name}`);
    contentPort = port;
    contentPort.onMessage.addListener(portMessageHandler);
}
function portMessageHandler (message: Message) {
    if (message.id === 'init') {
        const headings = refAndGetHeadings(document, {dataPrefix})
        const message: Message = {
            id: 'page_content',
            content: {
                headings
            }
        }
        sendMessage(message);
    }
    if (message.id === 'jump') {
        jump(message.node)
    }
}

function sendMessage(message: Message) {
    contentPort.postMessage(message)
}

export {};
