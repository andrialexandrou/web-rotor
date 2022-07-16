import * as React from 'react';
import ReactDOM from 'react-dom';

import { Message, NodeId, PageContent } from "../index"
import Popup from './Popup';

const debug = process.env.NODE_ENV ===  "development"

ReactDOM.render(<div >Loading.</div>, document.getElementById('popup-root'));

/*
**  Connect to popup script and set up listener/handler
*/
const chrome = window.chrome
let tabPort: chrome.runtime.Port

async function getCurrentTab(): Promise<chrome.tabs.Tab | undefined> {
    let queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function connectToTab() {
    const tab = await getCurrentTab()
    if (typeof tab === 'undefined' || !tab.id) return

    tabPort = chrome.tabs.connect(tab.id,
        {name: "webpage-rotor-popup"}
    )
    tabPort.onMessage.addListener(contentScriptMsgHandler)
    requestDOMData()
}

function contentScriptMsgHandler (message: Message) {
    if (debug) console.log('RECEIVING', message, new Date())
    if (message.id === 'page_content') {
        if (message.content) paintPopup(message.content)
    }
}

function sendMessage(message: Message) {
    if (debug) console.log('SENDING', message, new Date())
    tabPort.postMessage(message);
}

function requestDOMData() {
    sendMessage({id: 'init'})
}

connectToTab()
    
function paintPopup(content: PageContent) {
    ReactDOM.render(<Popup headings={content.headings} />, document.getElementById('popup-root'));
}

function jumpToDOMNode(nodeId: NodeId) {
    sendMessage({id: 'jump', node: nodeId})
}

export {
    jumpToDOMNode
}