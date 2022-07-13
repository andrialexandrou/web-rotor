// @ts-nocheck
import * as React from "react";
import { jumpToDOMNode } from "./index";

import "./styles.scss";

const Popup: React.FC = (props) => {
  console.log("opened popup", props)

  setTimeout(() => {
    console.log("trying to jump")
    jumpToDOMNode('h-22')
  }, 1000)

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
