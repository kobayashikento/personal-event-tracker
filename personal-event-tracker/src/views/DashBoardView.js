import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import dashbaord componenets files 
import Calendar from '../components/ProgressCalendar.js';
import styles from '../assets/jss/views/dashboardStyle.js';
import DashList from '../components/list/DashList.js';

// generate random events for the calendar 
import data from '../assets/data/dashEvents.json';
import {activities} from '../assets/jss/masterStyle.js';

const useStyles = makeStyles(styles);

// function that takes in the events json file and seperates the events  
// into the same events
// 0=none, 1=piano, 2=gym, 3=both
function getEvents() {
    var unsortedEvents = [];
    for(var i = 0; i < activties.length; i++){
        unsortedEvents.push([])
    }
    data.forEach(event => {
        
    })
}

export default function DashBoardView() {
    const classes = useStyles();

    const [calendarIndex, setCalendarIndex] = React.useState(0);

    const handleItemClicked = (index) => {
        setCalendarIndex(index);
    }

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
                            colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                            align="top"
                            translateY={-40}
                            itemTextColor="transparent"
                            itemCount={0}
                            data={getEvents()[calendarIndex]}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Paper elevation={3}>
                        <DashList
                            handleChange={(index) => handleItemClicked(index)}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}