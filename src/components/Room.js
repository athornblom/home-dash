import React from 'react'
import { useContext } from 'react'
import { HassObj } from '../hooks/Store'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { height, width } from '@material-ui/system'
import LigthSwitch from '../components/LigthSwitch';


const useStyles = makeStyles((theme) => ({
    test: {
        marginBottom: theme.spacing(1),
    },
    test2: {
        background: 'yellow'
    },
    Card: {

    },
    roomHeader: {
        
    }
}));

function Room({ roomObj }) {
    const classes = useStyles()
    const [store, setStore] = useContext(HassObj)

    if (roomObj !== undefined && store) {
        const lightGroupName = roomObj.attributes.entity_id.find(entity => entity.startsWith('light.'))
        if (!store.hass.states[lightGroupName].attributes.entity_id)
            console.log("You have a light group in your Room group that does not exist")
        else {
            const lightGroup = store.hass.states[lightGroupName].attributes.entity_id


            return (
                <Grid item xs={12} md={6} >
                    <Grid container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Grid item xs={12} className={classes.roomHeader}>
                            <Typography variant="h5" > {roomObj.attributes.friendly_name}</Typography>
                        </Grid>
                        <Grid item container 
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            className={classes.test}
                        >
                            {lightGroup.map(light =>
                                <Grid key={light} item className={classes.Card}>
                                    <LigthSwitch lightObj={store.hass.states[light]} />
                                </Grid>
                            )}
                        </Grid>

                    </Grid>

                </Grid>
            )
        }
    }
    return (null)
}

export default Room
