import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import nivo 
import { BoxLegendSvg } from '@nivo/legends';
import { ThemeProvider, SvgWrapper } from '@nivo/core';


// import dashbaord componenets files 
import Calendar from '../../components/ProgressCalendar.js';
import styles from '../../assets/jss/views/dashboardStyle.js';
import DashList from '../../components/list/DashList.js';
import {
    activities
} from '../../assets/jss/masterStyle.js';

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
                <Grid item xs={6} sm={3}>
                    <Paper elevation={3} className={classes.allActBackground}>
                        <Typography className={classes.statTitle} variant="h5">Total Activity</Typography>
                        <Typography className={classes.statTitle} variant="h5">{dashFunc.getAllActivity()[0].length}</Typography>
                        <Typography className={classes.statTitle} variant="h6">Days</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper elevation={3} className={classes.pianoBackground}>
                    <Typography className={classes.statTitle} variant="h5">Piano</Typography>
                    <Typography className={classes.statTitle} variant="h5">{dashFunc.getAllActivity()[1].length}</Typography>
                    <Typography className={classes.statTitle} variant="h6">Days</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper elevation={3} className={classes.gymBackground}>
                    <Typography className={classes.statTitle} variant="h5">Gym</Typography>
                    <Typography className={classes.statTitle} variant="h5">{dashFunc.getAllActivity()[2].length}</Typography>
                    <Typography className={classes.statTitle} variant="h6">Days</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper elevation={3} className={classes.noActBackground}>
                    <Typography className={classes.statTitle} variant="h5">No Activity</Typography>
                    <Typography className={classes.statTitle} variant="h5">{dashFunc.getAllActivity()[3].length}</Typography>
                    <Typography className={classes.statTitle} variant="h6">Days</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={10} sm={10}>
                    <Paper className={classes.paperCalendar} elevation={3}>
                        <Typography className={classes.calTitle} variant="h5">Daily Activity</Typography>
                        <ThemeProvider>
                            <SvgWrapper
                                height={70}
                                width={400}
                                margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                            >
                                <BoxLegendSvg
                                    anchor="center"
                                    containerWidth={400}
                                    containerHeight={70}
                                    height={100}
                                    width={400}
                                    data={activities[calendarIndex].legends}
                                    direction="row"
                                    itemWidth={90}
                                    itemHeight={20}
                                    itemsSpacing={15}
                                    padding={10}
                                    symbolSize={20}
                                    symbolShape="square"
                                    fontSize="30px"
                                />
                            </SvgWrapper>
                        </ThemeProvider>
                        <Calendar
                            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                            colors={activities[calendarIndex].color}
                            align="top"
                            translateY={-40}
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