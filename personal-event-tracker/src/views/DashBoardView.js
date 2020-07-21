import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// import js files 
import Calendar from '../components/Calendar.js';

import styles from '../assets/jss/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function DashBoardView() {
    const classes = useStyles();

    return (
        // implement gird with breakpoints to adjust for chagne in window size 
        <Grid 
            container 
            justify="space-evenly"
            alignItems="flex-start"
            className={classes.grid}
        >
            <Grid item xs={6} sm={3}>
               <Paper className={classes.paper}>
                    <Calendar/>
                   </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
               <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
               <Paper className={classes.paper}>xs=6 sm=3</Paper>
            </Grid>
        </Grid>
    );
}