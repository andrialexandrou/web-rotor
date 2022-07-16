import * as React from "react";
import { jumpToDOMNode } from "./index";
import { Headings, NodeId } from '../index'

import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import "./styles.scss";

function selectItem(nodeId: NodeId) {
  jumpToDOMNode(nodeId)
  window.close()
}

// @ts-ignore
const Popup: React.FC = ({headings}: {headings: Headings}) => {
  return (
    <section id="popup">
      <h1>HEADINGS</h1>
      <Paper sx={{ width: 320 }}>
        <MenuList dense>
          {headings.map((heading, i) => {
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
