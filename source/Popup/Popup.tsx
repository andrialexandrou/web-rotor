import * as React from "react";
// import { browser, Tabs } from "webextension-polyfill-ts";

import "./styles.scss";
console.log('Popup.tsx', new Date())

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
