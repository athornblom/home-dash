import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Grid, Box, Container, useMediaQuery, Paper } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CloseIcon from '@material-ui/icons/Close';
import { HassObj } from '../hooks/Store';
import { useContext } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ViewSelector from './ViewSelector';
import { HomeAssistant, LockOpen } from 'mdi-material-ui';
import { SecurityOutlined } from '@material-ui/icons';

import thomas from './../../public/img/avatars/thomas.png'
import arthur from './../../public/img/avatars/arthur.png'
import taylor from './../../public/img/avatars/taylor.png'

const drawerWidth = 260;

const useStyles = makeStyles((theme, mobileOpen) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: theme.palette.background.default,
      boxShadow: "none",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  closeButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: "100%",
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerGrid: {
    height: "100vh",
    [theme.breakpoints.down('xs')]: {
      height: `calc(100vh - 64px)`,
    }
  },
  gridBox: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

function ResponsiveDrawer({ window, children }) {
  const [mobileOpen, setMobileOpen] = useState();
  const classes = useStyles(mobileOpen);
  const [hass, setHass] = useContext(HassObj)
  const theme = useTheme();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>

      <Hidden smUp className={classes.toolbar}>

        <IconButton
          color="inherit"
          edge="end"
          onClick={handleDrawerToggle}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>

      </Hidden>
      <Grid container direction="column" justifyContent="space-between" className={classes.drawerGrid}>
        <Grid item className={classes.gridBox}>
          <Typography align="center" variant="h2">
            {(hass.states["sensor.time"].state)}
          </Typography>
          <Typography color="textSecondary" align="center" variant="h6">
            {(hass.states["sensor.date"].state)}
          </Typography>
        </Grid>

        <Grid item>
          <ViewSelector />
        </Grid>

        <Grid item direction="row" justifyContent="center" alignItems="center" container className={classes.gridBox}>
          <Grid item><IconButton><HomeAssistant /></IconButton></Grid>
          <Grid item><IconButton><SecurityOutlined /></IconButton></Grid>
          <Grid item><IconButton><PersonIcon /></IconButton></Grid>
          <Grid item><IconButton><LockOpen /></IconButton></Grid>
        </Grid>

      </Grid>



    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h3" noWrap>
                {hass.config.location_name}
              </Typography>
            </Grid>
            <Grid item xs={8} container alignItems='center' justifyContent='flex-end' spacing={2}>
              <Grid item>
                <IconButton>
                <Typography>
                  {hass.states["sensor.hallen_rorelsedeckare_temperature"].state + hass.config.unit_system.temperature}
                </Typography>
                </IconButton>
              </Grid>
              <Grid item>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src={thomas} />
                <Avatar alt="Travis Howard" src={arthur} />
                <Avatar alt="Cindy Baker" src={taylor} />
                <Avatar alt="Agnes Walker" src={thomas} />
                <Avatar alt="Trevor Henderson" src={thomas} />
              </AvatarGroup>
              </Grid>

            </Grid>

          </Grid>


        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} >
        <Hidden smUp >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className={classes.mobileDrawer}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}


export default ResponsiveDrawer;
