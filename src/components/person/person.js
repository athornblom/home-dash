import React from 'react'
import { useContext , useState} from 'react'
import {HassObj} from '../../hooks/Store'
import cssFile from './person.module.css'
import avatar from '../../img/persons/adam_thornblom.png';

function Person({name, className}) {
    const [hass, setHass] = useContext(HassObj)
    if(hass.states["person."+ name])
        return (
            <div className={hass.states["person."+ name].state != "home" ? `${className} ${cssFile.person}` : `${className} ${cssFile.person} ${cssFile.home} `}>
                <div className={cssFile.avatarContainer}>
                    <img className={cssFile.avatar} src={avatar} alt="" />
                </div> 
            </div>
        )
    return <></>
    
}

export default Person
