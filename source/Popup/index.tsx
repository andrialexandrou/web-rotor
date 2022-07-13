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
    return new Promise(resolve => {
        chrome.tabs.query(queryOptions, result => {
            console.log('getCurrentTab result', result)
            resolve(result)
        });
    })
    // return tab;
  }
console.log('testing')
async function connectToTab() {
    return new Promise ((resolve, reject) => {
        getCurrentTab().then(tabs => {
            console.log('tabs', tabs.length)
            if (tabs.length === 0) {
                console.log('FAILED TO GET TAB')
                reject('FAILED TO GET TAB')
            }
            const number = tabs[0].id
            chrome.tabs.sendMessage(number, {greeting: "hello"}, function(response) {
                // WARNING! Might be evaluating an evil script!
                console.log('response', response)
              });
            // console.log("trying to connect")
            // const tabData = { 
            //     tabId: number,
            //     connectInfo: 'hello',
            //     name: 'content' 
            // }
            // console.log('tabData', tabData)
            // chrome.tabs.connect(tabData).then(connection => {
            //     popupPort.onMessage.addListener(messageHandler);
            //     function messageHandler (message) {
            //         console.log('message', message)
            //     }
            // });
        })
    })
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
