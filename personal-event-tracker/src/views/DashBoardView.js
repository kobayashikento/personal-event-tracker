import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import dashbaord componenets files 
import Calendar from '../components/ProgressCalendar.js';
import styles from '../assets/jss/views/dashboardStyle.js';
import CalendarList from '../components/list/DashList.js';

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
                <Grid item xs={10} sm={10}>
                    <Paper className={classes.paperCalendar} elevation={3}>
                        <Typography className={classes.calTitle} variant="h6">Daily Activity</Typography>
                        <Calendar
                            margin={{ top: 60, right: 40, bottom: 40, left: 40 }}
                            align="top"
                            translateY={-40}
                            itemTextColor="transparent"
                            itemCount={0}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Paper elevation={3}>
                       <CalendarList 

                       />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}