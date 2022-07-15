// @ts-nocheck
import * as React from "react";
import { jumpToDOMNode } from "./index";

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import "./styles.scss";

function selectItem(nodeId) {
  jumpToDOMNode(nodeId)
  window.close()
}

const Popup: React.FC = (props) => {
  return (
    <section id="popup">
      <h1>HEADINGS</h1>
      <Paper sx={{ width: 320 }}>
        <MenuList dense>
          {props.headings.map((heading, i) => {
            return <MenuItem 
              className={['heading', `level-${heading.level}`].join(' ')}
              onClick={() => selectItem(heading['data-id'])}
              autoFocus={i === 0}
              key={heading['data-id']}
            >
              {heading.level}. {heading.textContent || '[no text content]'}
            </MenuItem>
          })}
        </MenuList>
      </Paper>
    </section>
  );
};

export default Popup;
