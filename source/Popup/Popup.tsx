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
      <h1>Headings</h1>
      <ul role="listbox" aria-label="something">
        {props.headings.map((heading, i) => {
          return <li 
            role="option" 
            tabIndex="-1" 
            key={i}>
              {heading.level} {heading.textContent}
          </li>
        })}
      </ul>
    </section>
  );
};

export default Popup;
