import cssFile from './HomeOverview.module.css'
import React from 'react'
import { useContext } from 'react'
import { HassObj } from '../hooks/Store'
import SidePanel from '../components/sidePanel/SidePanel'


function HomeOverview() {
    const [Hass, setHassObj] = useContext(HassObj)

    return (
        <div className={cssFile.container}>
            <SidePanel className={cssFile.sidePanel}></SidePanel>
            <div>heaj</div>
        </div>
    )
}

export default HomeOverview
