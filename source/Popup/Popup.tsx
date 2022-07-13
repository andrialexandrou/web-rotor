import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";

import "./styles.scss";
console.log('Popup.tsx', new Date())

const contentPort = window.chrome.runtime.connect({ name: 'web-rotor' });

contentPort.onMessage.addListener(messageHandler);

function messageHandler (message) {
    console.log('received message', message)
}


// function messageHandler (message) {
//   switch (message.purpose) {
//     case 'dom_deliver':
//       console.log('message', message)
//       break;
//   }
// }

setTimeout(() => {
  console.log("trying to send")
  contentPort.postMessage({
    content: 'hello from the popup'
  })
}, 1000)

const Popup: React.FC = () => {
  console.log("opened oppup")
  return (
    <section id="popup">
      <h2>Web Content Rotor</h2>
      <button
        id="options__button"
        type="button"
        onClick={() => {}}
      >
        Options Page
      </button>
    </section>
  );
};

export default Popup;
