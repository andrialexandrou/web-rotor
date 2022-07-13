// @ts-nocheck
console.log('hello world from content script and again and again', new Date());
// import refAndGetHeadings from "./headings"

// const dataPrefix = 'data-rotor'


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
  console.log('message', message, new Date())
}

////////////////////////////////////////////////////////////////////////////

// function onPopupOpened() {
//     const headings = refAndGetHeadings(document, {dataPrefix})
//     const message = {
//         purpose: 'dom_deliver',
//         content: {
//             headings
//         }
//     }
//     popupPort.postMessage(message);
// }

// onPopupOpened()


export {};
