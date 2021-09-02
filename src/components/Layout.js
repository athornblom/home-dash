import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
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
import { HomeAssistant, LockOpen, Lock, Door } from 'mdi-material-ui';
import { SecurityOutlined } from '@material-ui/icons';
import HassIconButton from './hassIconButton';
import { hassRestCommand } from '../hassFunctions/hassRestCommand';


const drawerWidth = 260;

const useStyles = makeStyles((theme, mobileOpen) => ({
  root: {
    display: 'flex',
    height: '100vh',
    minWidth: '300px',

  },
  drawer: {
    // width: "100%",
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
  },
  pageContainer: {
    height: `calc(100% - 56px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100% - 48px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - 64px)`,
    }
  },
  buttonOff: {
    color: theme.palette.error.main
  },
  buttonOn: {
    color: theme.palette.success.main

  },
  secondaryIconBtn:{
    color: theme.palette.text.secondary
  }

}));

function ResponsiveDrawer({ window, children }) {
  const [mobileOpen, setMobileOpen] = useState();
  const classes = useStyles(mobileOpen);
  const [store, setStore] = useContext(HassObj)
  const theme = useTheme();
  const xsDevice = useMediaQuery(theme.breakpoints.down('xs'))
  const smDevice = useMediaQuery(theme.breakpoints.down('sm'))

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
            {(store.hass.states["sensor.time"].state)}
          </Typography>
          <Typography color="textSecondary" align="center" variant="h6">
            {(store.hass.states["sensor.date"].state)}
          </Typography>
        </Grid>

        <Grid item>
          <ViewSelector setMobileOpen={setMobileOpen}/>
        </Grid>

        <Grid container direction="column" className={classes.gridBox}>
          <Grid item direction="row" justifyContent="center" alignItems="center" container >
            <Grid item><IconButton onClick={() => hassRestCommand("sgs_door_rydb", store.hass)} className={classes.secondaryIconBtn}><Door fontSize={"large"}/></IconButton></Grid>
            <Grid item><IconButton onClick={() => hassRestCommand("sgs_door_rich", store.hass)} className={classes.secondaryIconBtn}><Door fontSize={"large"}/></IconButton></Grid>
          </Grid>

          <Grid item direction="row" justifyContent="center" alignItems="center" container >
            <Grid item> <HassIconButton stateName="input_boolean.ai_home"> <HomeAssistant /> </HassIconButton></Grid>
            <Grid item><IconButton className={classes.buttonOn}><SecurityOutlined /></IconButton></Grid>
            <Grid item> <HassIconButton stateName="input_boolean.person_detection"> <PersonIcon /> </HassIconButton></Grid>
            <Grid item> <HassIconButton stateName="input_boolean.guest_mode" lockedIcon={<Lock />}> <LockOpen /> </HassIconButton></Grid>
          </Grid>
        </Grid>
      </Grid>



    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Grid container alignItems='center'>
            <Grid item xs={3}>
              <Typography variant="h4" noWrap>
                {store.hass.config.location_name}
              </Typography>
            </Grid>
            <Grid item xs={9} container alignItems='center' justifyContent='flex-end'>
              <Grid item>
                <IconButton>
                  <Typography>
                    {store.hass.states["sensor.motion_hallway_temp"].state + store.hass.config.unit_system.temperature}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item>
                <AvatarGroup max={smDevice ? (xsDevice ? 2 : 3) : 5}>
                  <Avatar alt="Remy Sharp" src={"/local/home-dash/img/avatars/thomas.png"} />
                  <Avatar alt="Travis Howard" src={"/local/home-dash/img/avatars/arthur.png"} />
                  <Avatar alt="Cindy Baker" src={"/local/home-dash/img/avatars/taylor.png"} />
                  <Avatar alt="Agnes Walker" src={"/local/home-dash/img/avatars/thomas.png"} />
                  <Avatar alt="Trevor Henderson" src={"/local/home-dash/img/avatars/thomas.png"} />
                </AvatarGroup>
              </Grid>

            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={`${classes.drawer}`} >
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
        <Hidden xsDown >
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
        <div className={classes.pageContainer}>
          {children}
        </div>


      </main>
    </div>
  );
}


export default ResponsiveDrawer;
