import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';

// let contentPort

// browser.runtime.onConnect.addListener(connectionHandler);

// function connectionHandler (port) {
//   contentPort = port;
//   contentPort.onMessage.addListener(messageHandler);
// }

// function messageHandler (message) {
//   switch (message.purpose) {
//     case 'dom_deliver':
//       console.log('message', message)
//       break;
//   }
// }

// setTimeout(() => {
//   console.log("trying to send")
//   contentPort.postMessage({
//     content: 'hello'
//   })
// }, 1000)

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
});

/*
**  Helper Functions
*/
// function getActiveTab () {
//   return new Promise (function (resolve, reject) {
//     let promise = chrome.tabs.query({ currentWindow: true, active: true });
//     promise.then(
//       tabs => { resolve(tabs[0]) },
//       msg => { reject(new Error(`getActiveTab: ${msg}`)); }
//     )
//   });
// }

// // Generic error handler
// function onError (error) {
//   console.log(`Error: ${error}`);
// }

// window.addEventListener('unload', evt => {
//   if (debug) console.log('popup unloaded');
//   skipToMenu.removeGroups();
//   contentPort.postMessage({ id: 'cleanup' });
// });