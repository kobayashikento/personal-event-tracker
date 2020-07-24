import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// import dashbaord componenets files 


import styles from '../assets/jss/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

export default function DashBoardView() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid
                container
                justify="space-evenly"
                alignItems="center"
                className={classes.grid}
                spacing={4}
            >
                <Grid item xs={12} >
                    <Paper elevation={3}>
                        HELLO
                </Paper>
                </Grid>
            </Grid>
        </div>
    );
}