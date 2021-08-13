import React, {useContext, useState} from 'react'
import cssFile from "./sidePanel.module.css"
import {HassObj} from "../../hooks/Store"
import Person from '../person/person'
import { Home, LockOpen, Lock, HomeOutlined, InfoOutlined, SecurityOutlined, GraphicEq} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import { mdiCctv } from '@mdi/js';
import Icon from '@mdi/react';



function SidePanel({className}) {
    const [hass,setHass] = useContext(HassObj)
    return (
        <div className = {`${className} ${cssFile.wrapper}`}>
    
            <div>
                <div className={cssFile.clock}>{(hass.states["sensor.time"].state)}</div>
                <div className={cssFile.date}>{(hass.states["sensor.date"].state)}</div>
            </div>
            <div>
                <h2><HomeOutlined style={{fontSize: 30}} color="primary" /> Hem</h2>
                <h2><Icon path={mdiCctv}
        size={2}
        color="red"/> Säkerhet</h2>
                <h2><GraphicEq style={{fontSize: 30}} color="primary" /> Musik</h2>
                <h2><HomeOutlined style={{fontSize: 30}} color="primary" /> Hem</h2>
            </div>
            <div className={cssFile.StickToBottom}>
           
                <div className={cssFile.peopleContainer}> 
                    <Person className={cssFile.personBox} name="adam_thornblom"></Person>
                    <Person className={cssFile.personBox} name="adam_thornblom"></Person>
     
                </div>
                <div className={cssFile.iconBtns}>
                <IconButton aria-label="Home" >
                    <HomeOutlined style={{fontSize: 30}} color="primary" />
                </IconButton>
            
                <IconButton aria-label="Detailed Info" >
                    <InfoOutlined style={{fontSize: 30}} color="primary" />
                </IconButton>
                <IconButton aria-label="Alarm" >
                    <SecurityOutlined style={{fontSize: 30}} color="primary" />
                </IconButton>
                <IconButton aria-label="Lock Panel" >
                    <LockOpen style={{fontSize: 30}} color="primary" />
                </IconButton>
                </div>
            </div>
            
        </div>
    )
}

export default SidePanel
