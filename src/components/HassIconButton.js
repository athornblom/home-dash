import React from 'react'
import { IconButton } from '@material-ui/core'
import { HassObj } from '../hooks/Store';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
// import useToggle from '../hassFunctions/hassFunctions';
import { hassToggle } from '../hassFunctions/hassToggle';

const useStyles = makeStyles((theme) => ({
    buttonOff:{
      color: theme.palette.error.main
    },
    buttonOn:{
      color: theme.palette.success.main
  
    }
  }));
  

function HassIconButton({ children, stateName, lockedIcon }) {
   
    const [store, setStore] = useContext(HassObj)
    const stateObj = store.hass.states[stateName]
    if(!stateObj){
        return ("Error " + stateName)
    }
    const classes = useStyles();
    return (
        <div>
            <IconButton onClick={() => hassToggle(stateName, store.hass)} className={stateObj.state === "on" ? classes.buttonOn : classes.buttonOff}>
                {lockedIcon ? (stateObj.state === "on" ? children : lockedIcon) : children}
            </IconButton>
        </div>
    )
}

export default HassIconButton
