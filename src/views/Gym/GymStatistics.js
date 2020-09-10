import React from 'react'
import { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    titleCase
} from '../../assets/styles/masterStyle.js';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';

import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../assets/styles/views/gym/gymstatisticsStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';
import GymGraph from './GymGraph.js';
import routineJson from '../../assets/data/workoutRoutine.json';

// data
import workoutData from '../../assets/data/gymData.json';
import workoutJson from '../../assets/data/workouts.json';

const useStyles = makeStyles(styles);

// Functions for tab panel
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ height: "100%" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

// Functions for display 
const countGymDays = () => {
    let days = [];
    workoutData.map(workout => {
        workout.data.map(day => {
            if (!days.includes(day.date)) {
                days.push(day.date)
            }
        })
    })
    return days.length;
}

const options = workoutData.map((option) => {
    return {
        name: titleCase(option.workout.name), group: titleCase(option.workout.musclegroup),
        ...option
    };
});

const GymStatistics = (props) => {
    const classes = useStyles();
    // states 
    const targetRef = useRef();
    //states 
    const [state, setState] = React.useState({
        tabIndex: 0,
        cardIndex: 0,
        selectedData: null,
        personalbest: []
    })
    const handleAutoComplete = (event, values) => {
        setState({ ...state, selectedData: values });
    }
    // react state for tabs 
    const handleTabChange = (event, index) => [
        setState({ ...state, tabIndex: index })
    ];

    React.useEffect(() => {
        if (state.selectedData !== null) {
            let pb;
            let maxWeight = 0;
            state.selectedData.data.map(workout => {
                if (workout.weight > maxWeight) {
                    pb = workout;
                } else if (workout.weight === maxWeight) {
                    if (moment(workout.date).isBefore(moment(pb.date))) {
                        pb = workout;
                    }
                }
            })
            setState({ ...state, personalbest: pb })
        } else {
            setState({ ...state, personalbest: [] })
        }
    }, [state.selectedData])

    return (
        <Grid
            container
            className={classes.container}
            spacing={5}
            style={{ zoom: "0.9", height: "90vh" }}
        >
            <Grid item xs={7} style={{ height: "inherit" }}>
                <Card style={{ height: "inherit" }}>
                    <CardContent style={{ padding: "0px" }}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={state.tabIndex}
                                onChange={handleTabChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                <Tab className={classes.tab} label="2 Weeks" {...a11yProps(0)} />
                                <Tab className={classes.tab} label="1 Month" {...a11yProps(1)} />
                                <Tab className={classes.tab} label="3 Months" {...a11yProps(2)} />
                                <Tab className={classes.tab} label="Custom" {...a11yProps(3)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={state.tabIndex} index={0} >
                            <GymGraph
                                data={state.selectedData}
                                theme={props.theme}
                                start={moment().subtract(14, 'days')}
                                end={moment()}
                                selectedData={state.selectedData}
                                type={'days'}
                                amount={14}
                                playing={props.playing}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={1} >
                            <GymGraph
                                data={state.selectedData}
                                theme={props.theme}
                                start={moment().subtract(1, 'months')}
                                end={moment()}
                                selectedData={state.selectedData}
                                type={'months'}
                                amount={1}
                                playing={props.playing}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={2}>
                            <GymGraph
                                data={state.selectedData}
                                theme={props.theme}
                                start={moment().subtract(3, 'months')}
                                end={moment()}
                                selectedData={state.selectedData}
                                type={'months'}
                                amount={3}
                                playing={props.playing}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={3}>

                        </TabPanel>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={5} ref={targetRef}>
                <Grid
                    container
                    spacing={5}
                    style={{ height: "100%", width: "100%", margin: "0px" }}
                >
                    <Grid item xs={12}>
                        <Autocomplete
                            limitTags={1}
                            options={options.sort((a, b) => -b.group.localeCompare(a.group))}
                            id="multiple-limit-tags"
                            groupBy={(option) => option.group}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Workouts" placeholder="Workout" />
                            )}
                            onChange={handleAutoComplete}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={{ height: "20vh" }}>
                            <CardContent>
                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary"> One Rep Max </Typography>
                                <Typography className={classes.daysTypo} gutterBottom variant="h5" component="h1"> {countGymDays()} </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={{ height: "20vh" }}>
                            <CardContent>
                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary"> Personal Best </Typography>
                                {state.personalbest.length === 0 ?
                                    <Typography className={classes.daysTypo} gutterBottom variant="h5" component="h1"> No Workout Selected </Typography> :
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Typography display="inline" className={classes.daysTypo} gutterBottom variant="h5" component="h1">
                                                {state.personalbest.weight} lbs
                                             </Typography>
                                            <Typography display="inline" className={classes.typo} variant="subtitle1" color="textSecondary">
                                                / {state.personalbest.rep} reps
                                                </Typography>
                                        </div>
                                        <Typography className={classes.typo} variant="subtitle1" color="textSecondary">
                                            Set on - {state.personalbest.date}
                                        </Typography>
                                    </div>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GymStatistics;