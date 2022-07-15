// @ts-nocheck
import refAndGetHeadings from "./headings"
import jump from "./jumpToContent";

const dataPrefix = 'data-rotor'

const chrome = window.chrome
let debug = true
let contentPort

chrome.runtime.onConnect.addListener(connectionHandler);
function connectionHandler (port: any) {
    if (debug) console.log(`port.name: ${port.name}`);
    contentPort = port;
    contentPort.onMessage.addListener(portMessageHandler);
}
function portMessageHandler (message: any) {
    if (message.id === 'init') {
        const headings = refAndGetHeadings(document, {dataPrefix})
        const message = {
            id: 'page_content',
            content: {
                headings
            }
        }
        sendMessage(message);
    }
    if (message.id === 'jump') {
        console.log('JUMPING TO', message.node)
        jump(message.node)
    }
}

function sendMessage(message) {
    contentPort.postMessage(message)
}


export {};
