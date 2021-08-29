import React, {useState, useEffect } from 'react'


const initialState = {name: 'allan ballan'};

export const HassObj = React.createContext();

const Store = ({hass,panel,children}) => {
    const [state, setSate] = useState({ hass: hass,panel: panel})
    useEffect(() =>{
        setSate({ hass: hass,panel: panel})
    },[hass])

    return (
        <HassObj.Provider value={[state, setSate]}>{children}</HassObj.Provider>
    )
}

export default Store
