// @ts-nocheck
import * as React from 'react';
import ReactDOM from 'react-dom';

import Popup from './Popup';

ReactDOM.render(<div>Hello</div>, document.getElementById('popup-root'));

/*
**  Connect to popup script and set up listener/handler
*/
const chrome = window.chrome
let tabPort

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function connectToTab() {
    const tab = await getCurrentTab()
    if (typeof tab === 'undefined') return

    tabPort = chrome.tabs.connect(tab.id,
        {name: "page-sailor-popup"}
    );
    tabPort.onMessage.addListener(contentScriptMsgHandler)
    requestDOMData()
}

function contentScriptMsgHandler (message) {
    console.log('RECEIVING', message, new Date())
    if (message.id === 'page_content') {
        paintPopup(message.content)
    }
}

function sendMessage(message) {
    console.log('SENDING', message, new Date())
    tabPort.postMessage(message);
}

function requestDOMData() {
    sendMessage({id: 'init'})
}

connectToTab()//.then(requestDOMData)
    
function paintPopup(content) {
    ReactDOM.render(<Popup headings={content.headings} />, document.getElementById('popup-root'));
}

function jumpToDOMNode(nodeId) {
    sendMessage({id: 'jump', node: nodeId})
}

export {
    jumpToDOMNode
}