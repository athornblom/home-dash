import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { LightbulbOutline } from 'mdi-material-ui';
import { hassToggle } from '../hassFunctions/hassToggle';
import { useContext } from 'react'
import { HassObj } from '../hooks/Store'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '120px',
        height: '120px',
        color :  props => props.state === "on" ? theme.palette.primary.main : null,
        // background: lightObj && (lightObj.state === "on" ? theme.palette.text.primary :  'red') ,
        backgroundColor: props => props.state === "on" ? theme.palette.grey[50] : null,
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        cursor: "pointer",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        fontWeight: 500
    },
    pos: {
        marginBottom: 12,
    },
}));

function lightSwitch({lightObj}) {
    const classes = useStyles({state: lightObj.state});
    const [store, setStore] = useContext(HassObj)
    //  console.log(lightObj)
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <Card className={classes.root} onClick={() => hassToggle(lightObj.entity_id, store.hass)} >
            {lightObj !== undefined ?
             <CardContent>

                <LightbulbOutline fontSize="large" />
                <Typography align={"center"} className={classes.title} gutterBottom>
                    {lightObj.attributes.friendly_name}
                </Typography>
                {/* <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
              
                
            </CardContent> : "Error LightObj"}
{/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card >
    )
}

export default lightSwitch
