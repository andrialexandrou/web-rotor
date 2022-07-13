// @ts-nocheck
console.log('helloworld from content script and again and again', new Date());
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
    console.log('RECEIVING', message, new Date())
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
    console.log('SENDING MESSAGE', message)
    contentPort.postMessage(message)
}

////////////////////////////////////////////////////////////////////////////

export {};
