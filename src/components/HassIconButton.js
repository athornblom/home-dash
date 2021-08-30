import React from 'react'
import { IconButton } from '@material-ui/core'
import { HassObj } from '../hooks/Store';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    buttonOff:{
      color: theme.palette.error.main
    },
    buttonOn:{
      color: theme.palette.success.main
  
    }
  }));
  

function HassIconButton({ children, stateObj, lockedIcon }) {
    const [store, setStore] = useContext(HassObj)
    const domain = stateObj.entity_id.substr(0, stateObj.entity_id.indexOf('.'));
    const canToggle = 'toggle' in (store.hass.services[domain] || {})
    const classes = useStyles();

    const handleToggle = () => {
        if (canToggle) {
            store.hass.callService(domain, 'toggle', {
                entity_id: stateObj.entity_id,
            })
        }
    }

    return (
        <div>
            <IconButton onClick={handleToggle} className={stateObj.state === "on" ? classes.buttonOn : classes.buttonOff}>
                {lockedIcon ? (stateObj.state === "on" ? children : lockedIcon) : children}
            </IconButton>
        </div>
    )
}

export default HassIconButton
