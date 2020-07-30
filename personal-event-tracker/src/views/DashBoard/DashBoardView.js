import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import dashbaord componenets files 
import Calendar from '../../components/ProgressCalendar.js';
import styles from '../../assets/jss/views/dashboardStyle.js';
import DashList from '../../components/list/DashList.js';

// import function used to generate the arrays for the calendar
import dashFunc from './dashFunctions.js';

const useStyles = makeStyles(styles);

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
                            data={dashFunc.getAllActivity()[calendarIndex]}
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