console.log('helloworld from content script');
import refAndGetHeadings from "./headings"

const dataPrefix = 'data-rotor'

let popupPort

window.chrome.runtime.onConnect.addListener(connectionHandler);

function connectionHandler (port) {
  popupPort = port;
  popupPort.onMessage.addListener(messageHandler);
}

// const popupPort = window.chrome.runtime.connect({ name: 'web-rotor' });

// popupPort.onMessage.addListener(messageHandler);

// function messageHandler (message) {
//     console.log('received message', message)
// }

function onPopupOpened() {
    const headings = refAndGetHeadings(document, {dataPrefix})
    const message = {
        purpose: 'dom_deliver',
        content: {
            headings
        }
    }
    popupPort.postMessage(message);
}

onPopupOpened()


export {};
