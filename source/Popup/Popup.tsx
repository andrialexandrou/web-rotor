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
      <h1>Headings</h1>
      <Paper sx={{ width: 320 }}>
        <MenuList dense>
          {props.headings.map((heading, i) => {
            return <MenuItem onClick={() => selectItem(heading['data-id'])}>
              <ListItemText key={i}>{heading.level} {heading.textContent}</ListItemText>
            </MenuItem>
          })}
        </MenuList>
      </Paper>
    </section>
  );
};

export default Popup;
