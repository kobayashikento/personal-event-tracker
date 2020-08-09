import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';

// import nivo 
import { BoxLegendSvg } from '@nivo/legends';
import { ThemeProvider, SvgWrapper } from '@nivo/core';

// import dashbaord componenets files 
import Calendar from '../../components/ProgressCalendar.js';
import styles from '../../assets/jss/views/dashboardStyle.js';
import DashList from '../../components/list/DashList.js';
import Overview from '../../components/container/OverviewContainer.js';
import {
    activities
} from '../../assets/jss/masterStyle.js';

// import function used to generate the arrays for the calendar
import dashFunc from './dashFunctions.js';

const useStyles = makeStyles(styles);

export default function DashBoardView() {
    const classes = useStyles();

    const [calendarIndex, setCalendarIndex] = React.useState(0);

    // set states
    const [isActive, setActive] = React.useState(false);
    const [activeIndex, setactiveIndex] = React.useState(0);

    const handleItemClicked = (index) => {
        setCalendarIndex(index);
        for (var i = 0; i < activities.length; i++) {
            if (i === 0 && i === index) {
                setActive(false);
                setactiveIndex(0);
            } else if (i === index) {
                setActive(true);
                setactiveIndex(i);
            } else { }
        }
    }

    var allActDisplay = (
        activities.map((prop, index) => {
            return (
                <Zoom in={!isActive} key={index}>
                    <Grid item xs={6} sm={3}>
                        <Paper
                            elevation={3}
                            className={
                                classes[prop.id + "Background"]
                            }
                        >
                            <Typography className={classes.statTitle} variant="h5">{prop.name}</Typography>
                            <Typography className={classes.statTitle} variant="h5">{dashFunc.getAllActivity()[index].length}</Typography>
                            <Typography className={classes.statTitle} variant="h6">Days</Typography>
                        </Paper>
                    </Grid>
                </Zoom>
            );
        })
    );


    return (
        <div className={classes.container}>
            <Typography className={classes.title} variant="h5">Dashboard</Typography>
            <Divider />
            <section>
                <div className="flex-col-2">
                    <div className="tall-rect">

                    </div>
                    <div className="wide-rect">

                    </div>
                </div>
                <div className="square">

                </div>
            </section>
        </div>
        /* <Grid
            container
            justify="space-evenly"
            alignItems="center"
            spacing={4}
        >
            {isActive ?
                <Overview
                    totalDays={dashFunc.getAllActivity()[activeIndex].length}
                    name={activities[activeIndex].name}
                    avgDays={null}
                /> 
                : allActDisplay}
            <Grid
                item
                xs={10} sm={10}
                className={
                    isActive ? classes.moveCal : null
                }
            >
                <Paper
                    className={classes.paperCalendar}
                    elevation={3}
                >
                    <Typography className={classes.calTitle} variant="h5">Daily Activity</Typography>
                    <ThemeProvider>
                        <SvgWrapper
                            height={70}
                            width={400}
                            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
                        >
                            <BoxLegendSvg
                                anchor="center"
                                data={activities[calendarIndex].legends}
                                containerWidth={400}
                                containerHeight={70}
                                height={100}
                                width={400}
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
            <Grid
                item
                xs={2} sm={2}
                className={
                    isActive ? classes.moveSidebar : null
                }
            >
                <Paper elevation={3}>
                    <DashList
                        handleChange={(index) => handleItemClicked(index)}
                    />
                </Paper>
            </Grid>
        </Grid> */
    );
}