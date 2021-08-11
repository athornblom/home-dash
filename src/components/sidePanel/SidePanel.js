import React, {useContext, useState} from 'react'
import cssFile from "./sidePanel.module.css"
import {HassObj} from "../../hooks/Store"

function SidePanel({className}) {
    const [hass,setHass] = useContext(HassObj)
    return (
        <div className = {`${className} ${cssFile.wrapper}`}>
            
            <div className={cssFile.clock}>{(hass.states["sensor.time"].state)}</div>
            <div className={cssFile.date}>{(hass.states["sensor.date"].state)}</div>
            <div></div>
        </div>
    )
}

export default SidePanel
