
import { HassObj } from '../hooks/Store';
import { useContext } from 'react';


export function hassToggle(stateName, hassObj) {
    if( hassObj === undefined || hassObj === null){
        console.log("The hass object is wrong " + hassObj)
    }else{
        const stateObj = hassObj.states[stateName]
        if(stateObj){
            const domain = stateObj.entity_id.substr(0, stateObj.entity_id.indexOf('.'));
            const canToggle = 'toggle' in (hassObj.services[domain] || {})
        
             if (canToggle) {
                 hassObj.callService(domain, 'toggle', {
                     entity_id: stateObj.entity_id,
                 })
             }
        }else{
            console.log("The stateName does not exists in the hassObj " + stateName)
        }
    }
}

