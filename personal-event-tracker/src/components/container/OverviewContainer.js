import React from 'react';

// import material ui 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Grid item xs={12} sm={12}>
                <Paper elevation={3}>
                    <Typography className={classes.statTitle} variant="h5">{props.name}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Paper elevation={3}>
                    <Typography className={classes.statTitle} variant="h5">Total Activity</Typography>
                    <Typography className={classes.statTitle} variant="h5">{props.totalDays}</Typography>
                    <Typography className={classes.statTitle} variant="h6">Days</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Paper elevation={3}>
                    <Typography className={classes.statTitle} variant="h5">Average Activity Per Month</Typography>
                    {/* <Typography className={classes.statTitle} variant="h5">{props.avgDays}</Typography> */}
                    <Typography className={classes.statTitle} variant="h6">Days</Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}