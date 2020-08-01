import React from 'react';

// import material ui 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// import files
import styles from '../../assets/jss/components/list/dashlistStyle.js';
const useStyles = makeStyles(styles);

// props the event should be passed to this class so it could populate the data accordingly 
export default function OverContainer(props) {
    const classes = useStyles();
    // 4 boxes stats per row and 2 rows = 8 boxes 

    // box 1 total days of activity 

    // box 2 avg days of activity per month 

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="left"
        >
            <Grid xs={6} sm={6}>
                <Typography className={classes.statTitle} variant="h5">Total {props.name}</Typography>
                <Typography className={classes.statTitle} variant="h5">{props.totalDays}</Typography>
                <Typography className={classes.statTitle} variant="h6">Days</Typography>
            </Grid>
            <Grid xs={6} sm={6}>
                <Typography className={classes.statTitle} variant="h5">Average {props.name}</Typography>
                <Typography className={classes.statTitle} variant="h5">{props.avgDays}</Typography>
                <Typography className={classes.statTitle} variant="h6">Days</Typography>
            </Grid>
        </Grid>
    );
}