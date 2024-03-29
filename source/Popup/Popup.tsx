// @ts-nocheck

import * as React from "react";

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import LinkIcon from '@mui/icons-material/Link';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import SettingsIcon from '@mui/icons-material/Settings';


import "./styles.scss";
import { jumpToDOMNode } from "./index";
import { 
  Headings,
  Landmarks,
  NodeId, 
  PageContent 
} from '../index';

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

function sort(elements: Landmarks): Landmarks {
  console.log('elements', elements)
  const mains: Landmarks = []
  const search: Landmarks = []
  const navs: Landmarks = []
  const asides: Landmarks = []
  const footers: Landmarks = []
  elements.forEach(element => {
    switch (element.role) {
      case 'main':
        mains.push(element)
        break;
      case 'search':
        search.push(element)
        break;
      case 'navigation':
        navs.push(element)
        break;
      case 'aside':
        asides.push(element)
        break;
      case 'contentinfo':
        footers.push(element)
        break;
      default:
        break;
    }
  })
  return [...mains, ...search, ...navs, ...asides, ...footers]
}

const Popup: React.FC<PageContent> = props => {
  const { 
    headings, 
    images,
    landmarks,
    links 
  } = props
  const [value, setValue] = React.useState(0);

  const orderedLandmarks = sort(landmarks)
  const headingsAndLandmarks = [...orderedLandmarks, 'break', ...headings]

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);
  return (
    <section id="popup">
      <Paper sx={{ width: 320 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs selectionFollowsFocus value={value} onChange={handleChange} aria-label="entities">
            <Tab autoFocus icon={<LandscapeIcon />} label="Regions & Headings" {...a11yProps(0)} />
            <Tab icon={<LinkIcon />} label="Links" {...a11yProps(1)} />
            <Tab icon={<ImageSearchIcon />} label="Images" {...a11yProps(2)} />
            {/* <Tab icon={<SettingsIcon />} label="Options" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {headingsAndLandmarks && headingsAndLandmarks.length 
            ? <MenuList dense>
              {headingsAndLandmarks.map((entity, i) => {
                if (entity === 'break') {
                  return <li><Divider sx={{ my: 0.5 }} /></li>
                }

                const classes = ['heading']
                if (entity.level) classes.push(`level-${entity.level}`)

                let visibleText
                switch (entity.type) {
                  case 'heading':
                    visibleText = `${entity.level}. ${ entity.content || '[no text content]' }`
                    break;
                  case 'landmark':
                    visibleText = entity.content;
                    break;
                  default:
                    break;
                }

                return <MenuItem
                  className={classes.join(' ')}
                  onClick={() => selectItem(entity['data-id'])}
                  key={entity['data-id']}
                >
                  {visibleText}
                </MenuItem>
              })}
            </MenuList>
            : <div className="no-headings">No entities found.</div>}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {links && links.length
            ? <MenuList dense>
              {links.map((link, i) => {
                return <MenuItem
                  className="heading"
                  onClick={() => selectItem(link['data-id'])}
                  key={link['data-id']}
                >
                  {link.content}
                </MenuItem>
              })}
            </MenuList>
            : <div className="no-headings">No links found.</div>}
        </TabPanel>

        <TabPanel value={value} index={2}>
          {images && images.length
            ? <MenuList dense>
              {images.map((image, i) => {
                const classes = ['heading']
                if (image.isFallbackText) classes.push('is-fallback-text')
                return <MenuItem
                  onClick={() => selectItem(image['data-id'])}
                  className={classes.join(' ')}
                  key={image['data-id']}
                >
                  {image.content}
                </MenuItem>
              })}
            </MenuList>
            : <div className="no-headings">No images found.</div>}
        </TabPanel>

        <TabPanel value={value} index={3}>
          <div className="options">
            Please visit <Link href="https://www.github.com/andrialexandrou/web-rotor">web-rotor repository</Link>.
          </div>
        </TabPanel>
      </Paper>
    </section>
  );
};

export default Popup;
