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
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { connect } from 'react-redux';

import styles from '../../assets/styles/views/gym/gymstatisticsStyle.js';

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

const GymStatistics = (props) => {
    const classes = useStyles();
    // states 
    const targetRef = useRef();
    //states 
    const [state, setState] = React.useState({
        tabIndex: 0,
        cardIndex: 0,
        personalbest: undefined,
        selectedWorkout: undefined
    });
    const [modalOpen, setModalOpen] = React.useState(true);
    const [selectedDate, setSelectedDate] = React.useState(
        {
            startDate: new Date() - 1,
            endDate: new Date()
        });

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
        const workouts = [];
        props.entries.map(entry => {
            if (workout.id === entry.workout) {
                workouts.push({
                    ...entry,
                    name: workout.name
                })
            }
        })
        if (workouts.length !== 0) {
            setState({ ...state, personalbest: getEntryData(workouts), selectedWorkout: workouts })
            return;
        } else {
            setState({ ...state, personalbest: workouts, selectedWorkout: workouts })
            return;
        }
    }

    const getEntryData = (workouts) => {
        // workouts contains entries object
        // index 0 - personal best, index 1 - most recent date
        let personalbest = workouts[0]
        let recent = workouts[0].date;
        workouts.map(entry => {
            if (entry.weight > personalbest.weight && moment(entry.date).isBefore(personalbest.date)) {
                personalbest = entry;
            }
            if (moment(entry.date).isBefore(recent)) {
                recent = entry;
            }
        })
        return [personalbest, moment(recent.date).format('MMMM Do YYYY')];
    }

    const getNameFromId = (id) => {
        let name = "";
        props.workout.map(prop => {
            if (prop.id === id) {
                return prop.name;
            }
        })
        return name;
    }

    const getAutoCompleteList = () => {
        let options = [];
        props.workout.map((option) => {
            options.push({
                workout: getNameFromId(option.name),
                name: titleCase(option.name),
                group: titleCase(option.musclegroup).trim(),
                id: option.id
            })
        })
        return options;
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    React.useEffect(() => {
        if (state.tabIndex === 3) {
            setModalOpen(true);
        }
    }, [state.tabIndex])

    if (props.workout === undefined || props.entries === undefined || props.entries === null) {
        return (
            <CircularProgress style={{ position: "relative", top: "15rem", left: "45%" }} color="primary" />
        )
    } else {
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
                            {console.log(state.selectedWorkout)}
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
                                <Modal
                                    open={modalOpen}
                                    onClose={() => setModalOpen(false)}
                                    style={{ overflow: "scroll" }}
                                >
                                    <Card className={classes.modalCard}>
                                        <CardContent >
                                            <div style={{ display: "flex" }}>
                                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary">
                                                    Start Date:
                                            </Typography>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Start Date"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate.startDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        style={{ margin: "16px" }}
                                                        disableFuture={true}
                                                        variant="dialog"
                                                    />
                                                </MuiPickersUtilsProvider>
                                                <Typography className={classes.typo} variant="subtitle1" color="textSecondary">
                                                    End Date:
                                            </Typography>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="End Date"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate.endDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        style={{ margin: "16px" }}
                                                        disableFuture={true}
                                                        variant="dialog"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Modal>
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
                                PopperComponent={"bottom-start"}
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
}

const mapStateToProps = (state) => {
    return {
        workout: state.dataReducer.workout,
        entries: state.dataReducer.entries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymStatistics)