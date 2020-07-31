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
import { activities } from '../../assets/jss/masterStyle.js';

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
                            colors={activities[calendarIndex].color}
                            align="top"
                            translateY={-40}
                            itemCount={0}
                            data={dashFunc.getAllActivity()[calendarIndex]}
                        />
                        <ThemeProvider>
                            <SvgWrapper
                                height={100}
                                width={400}
                                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <BoxLegendSvg
                                    anchor="center"
                                    data={activities[calendarIndex].legends}
                                    containerWidth={400}
                                    containerHeight={100}
                                    height={100}
                                    width={400}
                                    direction="row"
                                    // itemDirection="right-to-left"
                                    itemWidth={90}
                                    itemHeight={20}
                                    itemsSpacing={15}
                                    // itemOpacity={.5}
                                    padding={10}
                                    // translateX={-50}
                                    // translateY={-100}
                                    symbolSize={12}
                                    symbolShape="square"
                                />
                            </SvgWrapper>
                        </ThemeProvider>
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