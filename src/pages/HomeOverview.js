import React from 'react'
import { useContext } from 'react'
import { HassObj } from '../hooks/Store'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root:{
    width: "100%",
    height: "100%",
  },
  gridContainer:{
    height: "100%"
  }
}));

function HomeOverview() {

    const [store, setStore] = useContext(HassObj)
    //gets the rooms by finding all groups
    const rooms = Object.keys(store.hass.states).filter(key => key.startsWith('group.room_') )
    // console.log(rooms)
    const classes = useStyles();
  

    const theme = useTheme();
    return (
        <div className={classes.root}>
            
            <Grid className={classes.gridContainer}
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              {
               
                rooms.map(room => {
                  //console.log( store.hass.states[room].attributes.friendly_name);
                  let roomObj = store.hass.states[room];
                  return (
                  <Grid key={roomObj.entity_id} item xs={12} md={6} >
                       <Typography variant="h5" > {roomObj.attributes.friendly_name}</Typography>
                 </Grid>)
                })
              }

            </Grid>

        </div>
    )
}

export default HomeOverview
