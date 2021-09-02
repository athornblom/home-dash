import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { HomeAssistant, Cctv, AlertCircleOutline, EvPlugChademo, BusMarker } from 'mdi-material-ui'
import HomeIcon from '@material-ui/icons/Home';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory, useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    maxHeight: `calc(100vh - 300px)`
  },
  tabs: {
    width: "100%",

  },
  tab: {
    maxWidth: "100%"
  },
  tabContainer: {
    display: "flex",
    alignItems: "center",
  },
  tabIcon: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  }
}));

export default function ViewSelector({setMobileOpen}) {
  const IndexToTabName = {
    0: "/home-dash/overview",
    1: "/home-dash/music",
    2: "/home-dash/security",
    3: "/home-dash/devices",
    4: "/home-dash/busses",
    5: "/home-dash/other",
    6: "/home-dash/demo"
    
  }
  let history = useHistory();
  let location = useLocation();

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(parseInt(Object.keys(IndexToTabName).find(key => IndexToTabName[key] === location.pathname)));


  const handleChange = (event, newSelectedTab) => {
    history.push(`${IndexToTabName[newSelectedTab]}`)
    setSelectedTab(newSelectedTab);
    setMobileOpen(false);
  };


  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleChange}
        className={classes.tabs}>
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><DashboardIcon className={classes.tabIcon} /> Översikt</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><GraphicEqIcon className={classes.tabIcon} /> Musik</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><Cctv className={classes.tabIcon} /> Säkerhet</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><DevicesOtherIcon className={classes.tabIcon} /> Enheter</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><BusMarker className={classes.tabIcon} /> Bussar</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><AlertCircleOutline className={classes.tabIcon} /> Annat</div>} />
        <Tab className={classes.tab} label={<div className={classes.tabContainer}><EvPlugChademo className={classes.tabIcon} /> Demo</div>} />
      </Tabs>
    </div>
  );
}
