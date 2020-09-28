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

import { useSelector } from 'react-redux';


import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../assets/styles/views/gym/gymstatisticsStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';
import GymGraph from './GymGraph.js';

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

export default function GymStatistics(props) {
    const data = useSelector((reducer) => reducer.dataReducer)

    const classes = useStyles();
    // states 
    const targetRef = useRef();
    //states 
    const [state, setState] = React.useState({
        tabIndex: 0,
        cardIndex: 0,
        personalbest: undefined,
        selectedWorkout: undefined
    })
    const handleAutoComplete = (event, values) => {
        if (values !== null) {
            getPersonalBest(values)
        } else {
            setState({ ...state, personalbest: undefined, selectedWorkout: undefined });
        }
    }
    // react state for tabs 
    const handleTabChange = (event, index) => [
        setState({ ...state, tabIndex: index })
    ];

    const getPersonalBest = (workout) => {
        if (data.entries !== undefined || data.entries !== null) {
            const workouts = [];
            data.entries.map(entry => {
                if (titleCase(workout.name).replace(/ /g, '') === titleCase(entry.workout).replace(/ /g, '')) {
                    workouts.push(entry)
                }
            })
            if (workouts.length !== 0) {
                setState({ ...state, personalbest: getEntryData(workouts), selectedWorkout: workouts })
                return;
            }
            setState({ ...state, personalbest: workouts, selectedWorkout: workouts })
            return;
        }
    }

    const getEntryData = (array) => {
        // index 0 - personal best, index 1 - most recent date
        let personalbest = array[0]
        let recent = array[0].date;
        array.map(entry => {
            if (entry.weight > personalbest.weight && moment(entry.date).isBefore(personalbest.date)) {
                personalbest = entry;
            }
            if (moment(entry.date).isBefore(recent)) {
                recent = entry;
            }
        })
        return [personalbest, moment(recent).format('MMMM Do YYYY')];
    }

    const getPersonalBestText = () => {
        return (state.personalbest[0].weight + " lbs " + state.personalbest[0].reps + " reps" + "\n" + "Set on - " + state.personalbest[1]);
    }

    const getAutoCompleteList = () => {
        let options = [];
        if (data.workout !== undefined) {
            data.workout.map((option) => {
                options.push({
                    name: titleCase(option.name), group: titleCase(option.musclegroup)
                })
            })
            return options;
        } else {
            return options;
        }
    }

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
                                data={state.selectedWorkout}
                                theme={props.theme}
                                start={moment().subtract(14, 'days')}
                                end={moment()}
                                type={'days'}
                                amount={14}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={1} >
                            <GymGraph
                                data={state.selectedWorkout}
                                theme={props.theme}
                                start={moment().subtract(1, 'months')}
                                end={moment()}
                                type={'months'}
                                amount={1}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={2}>
                            <GymGraph
                                data={state.selectedWorkout}
                                theme={props.theme}
                                start={moment().subtract(3, 'months')}
                                end={moment()}
                                type={'months'}
                                amount={3}
                            />
                        </TabPanel>
                        <TabPanel value={state.tabIndex} index={3}>

                        </TabPanel>

                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={5}>
                <Grid
                    container
                    spacing={5}
                    style={{ height: "100%", width: "100%", margin: "0px" }}
                >
                    <Grid item xs={12}>
                        <Autocomplete
                            limitTags={1}
                            options={getAutoCompleteList().sort((a, b) => -b.group.localeCompare(a.group))}
                            id="multiple-limit-tags"
                            groupBy={(option) => titleCase(option.group)}
                            getOptionLabel={(option) => titleCase(option.name)}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Workouts" placeholder="Workout" />
                            )}
                            onChange={handleAutoComplete}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Card style={{ height: "20vh" }}>
                            <CardContent>
                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary"> Last Worked On </Typography>
                                <Typography className={classes.daysTypo} gutterBottom variant="h5" component="h1">
                                    {state.personalbest === undefined ? "No Workout Selected" : state.personalbest.length === 0 ? "No Data For The Workout" : state.personalbest[1]}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card >
                            <CardContent>
                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary"> Personal Best </Typography>
                                <Typography className={classes.daysTypo} gutterBottom variant="h5" component="h1" >
                                    {state.personalbest === undefined ? "No Workout Selected" : state.personalbest.length === 0 ? "No Data For The Workout" : ""}
                                </Typography>
                                {state.personalbest === undefined ? null : state.personalbest.length === 0 ? null :
                                    <div>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <Typography display="inline" className={classes.daysTypo} gutterBottom variant="h5" component="h1">
                                                {state.personalbest[0].weight} lbs
                                             </Typography>
                                            <Typography display="inline" className={classes.typo} variant="subtitle1" color="textSecondary">
                                                / {state.personalbest[0].reps} reps
                                                </Typography>
                                        </div>
                                        <Typography className={classes.typo} variant="subtitle1" color="textSecondary">
                                            Set on - {state.personalbest[1]}
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
}