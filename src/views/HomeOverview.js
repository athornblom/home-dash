import {cssFile} from './HomeOverview.module.css'
import React from 'react'
import { useContext } from 'react'
import { HassObj } from '../hooks/Store'
import SidePanel from '../components/sidePanel/SidePanel'


function HomeOverview() {
    const [Hass, setHassObj] = useContext(HassObj)

    return (
        <div>
            <SidePanel></SidePanel>
           
        </div>
    )
}

export default HomeOverview
