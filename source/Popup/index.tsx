// @ts-nocheck
import * as React from 'react';
import ReactDOM from 'react-dom';

import Popup from './Popup';
console.log('popup/index.tsx', new Date())



/*
**  Connect to popup script and set up listener/handler
*/
const chrome = window.chrome

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    // return new Promise(resolve => {
    // })
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

console.log('testing')
async function connectToTab() {
    const tab = await getCurrentTab()
    console.log('tab', typeof tab)
    if (typeof tab === 'undefined') {
        console.log('FAILED TO GET TAB')
        return
    }
    const number = tab.id
    console.log("trying to connect")
    const tabData = { 
        tabId: number,
        connectInfo: 'hello',
        name: 'content' 
    }
    console.log('tabData', tabData)
    // chrome.tabs.connect(tabData).then(connection => {
    //     popupPort.onMessage.addListener(messageHandler);
    //     function messageHandler (message) {
    //         console.log('message', message)
    //     }
    // });
    let examplePort = chrome.tabs.connect(
        number,
        {name: "tabs-connect-example"}
      );
      examplePort.postMessage({greeting: "Hi from background script"});
}

connectToTab()


///////////////////////////////////////////////////////////////////////////
/*
**  Initiate processing in content script
*/
// function initProcessing () {
//     console.log('initProcessing: ');
//     contentPort.postMessage({ id: 'storage' });
//   }
  
//   setTimeout(() => {
//     console.log("trying to send")
//     contentPort.postMessage({
//       content: 'hello from the popup'
//     })
//   }, 1000)
  




ReactDOM.render(<Popup />, document.getElementById('popup-root'));
