// @ts-ignore

import * as React from "react";

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';

import "./styles.scss";
import { jumpToDOMNode } from "./index";
import { NodeId, PageContent } from '../index';

function selectItem(nodeId: NodeId) {
  jumpToDOMNode(nodeId)
  window.close()
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Popup: React.FC<PageContent> = props => {
  const { headings, landmarks } = props
  const [value, setValue] = React.useState(0);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log('event', event)
    setValue(newValue);
  };
  return (
    <section id="popup">
      <Paper sx={{ width: 320 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Headings" {...a11yProps(0)} />
            <Tab label="Landmarks" {...a11yProps(1)} />
            <Tab label="Options" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {headings && headings.length 
          ? <MenuList dense>
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
          : <div className="no-headings">No headings found.</div> }
        </TabPanel>

        <TabPanel value={value} index={1}>
          {landmarks && landmarks.length 
            ? <MenuList dense>
              {landmarks.map((landmark, i) => {
                return <MenuItem
                  className={['heading'].join(' ')}
                  onClick={() => selectItem(landmark['data-id'])}
                  autoFocus={i === 0}
                  key={landmark['data-id']}
                >
                  {landmark.content}
                </MenuItem>
              })}
            </MenuList>
            : <div className="no-headings">No landmarks found.</div>}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <div className="options">
            Please visit <Link href="https://www.github.com/andrialexandrou/web-rotor">web-rotor repository</Link>.
          </div>
        </TabPanel>
      </Paper>
    </section>
  );
};

export default Popup;
