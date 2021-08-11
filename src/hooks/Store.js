import React, {useState, useEffect } from 'react'


const initialState = {name: 'allan ballan'};

export const HassObj = React.createContext();

const Store = ({hass,children}) => {
    const [state, setSate] = useState(hass)
    useEffect(() =>{
        setSate(hass)
    },[hass])

    return (
        <HassObj.Provider value={[state, setSate]}>{children}</HassObj.Provider>
    )
}

export default Store
