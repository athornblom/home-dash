export function hassRestCommand(service, hassObj) {
    if( hassObj === undefined || hassObj === null){
        console.log("The hass object is wrong " + hassObj)
    }else{
        const domain = 'rest_command'
        const canCallService = service in (hassObj.services[domain] || {})
        
        if (canCallService) {
            hassObj.callService(domain, service, {})
    }
        
    }
}
