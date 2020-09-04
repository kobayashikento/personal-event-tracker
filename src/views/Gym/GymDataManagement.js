import React from 'react'
import { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types';
import {
    titleCase
} from '../../assets/styles/masterStyle.js';

// import material ui core
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MaterialTable from 'material-table';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';
import GymGraph from './GymGraph.js';
import routineJson from '../../assets/data/workoutRoutine.json';

// data
import workoutData from '../../assets/data/gymData.json';
import workoutJson from '../../assets/data/workouts.json';

const useStyles = makeStyles(styles);

// tabpanel setting 
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

// Functions 
const getManageData = () => {
    let temp = [];
    workoutData.map(workout => {
        workout.data.map(prop => {
            temp.push({
                date: prop.date,
                workout: titleCase(workout.workout.name),
                group: titleCase(workout.workout.musclegroup),
                movement: titleCase(workout.workout.movement),
                rep: prop.rep,
                weight: prop.weight
            })
        })
    })
    return temp;
};

const getWorkoutData = () => {
    let temp = [];
    workoutJson.map(prop => {
        temp.push({
            name: titleCase(prop.name),
            group: titleCase(prop.musclegroup),
            movement: titleCase(prop.movement)
        })
    })
    return temp;
};

const getRoutineData = () => {
    let temp = [];
    routineJson.map(routine => {
        routine.workouts.map(workout => {
            temp.push({
                routine: titleCase(routine.routineName),
                workout: titleCase(workout.workout.name),
                group: titleCase(workout.workout.musclegroup),
                sets: workout.sets,
                reps: workout.reps,
                rest: workout.rest
            })
        })
    })
    return temp;
};

const getWorkoutInfo = () => {
    let temp = {
        workouts: [],
        movement: [],
        musclegroup: [],
    };
    workoutJson.map((prop, index) => {
        if (!temp.workouts.includes(prop.name)) {
            temp.workouts.push(
                {
                    "something": prop.name
                });
        }
        if (!temp.movement.includes(prop.movement)) {
            temp.movement.push(prop.movement);
        }
        if (!temp.musclegroup.includes(prop.musclegroup)) {
            temp.musclegroup.push(prop.musclegroup);
        }
    })
    return temp;
};

export default function GymContainer(props) {
    const classes = useStyles();

    // states 
    const [state, setState] = React.useState({
        dataColumn: [
            { title: 'Date', field: 'date', type: 'date' },
            {
                title: 'Workout', field: 'workout',
                lookup: getWorkoutInfo.workouts
            },
            { title: 'Muscle Group', field: 'group' },
            { title: 'Movement', field: 'movement' },
            { title: 'Reps', field: 'rep', type: 'numeric' },
            { title: 'Weight', field: 'weight', type: 'numeric', grouping: false }],
        data: getManageData(),
        workoutColumn: [
            { title: 'Name', field: 'name', grouping: false },
            { title: 'Muscle Group', field: 'group' },
            { title: 'Movement', field: 'movement' },
        ],
        workoutData: getWorkoutData(),
        routineColumn: [
            { title: 'Routine', field: 'routine', defaultGroupOrder: 0 },
            { title: 'Workout', field: 'workout' },
            { title: 'Muscle Group', field: 'group' },
            { title: 'Sets', field: 'sets', type: 'numeric' },
            { title: 'Reps', field: 'reps', type: 'numeric' },
            { title: 'Rest', field: 'rest', type: 'numeric' }
        ],
        routineData: getRoutineData(),
        pageSize: 9,
        tabIndex: 0
    });

    const handleChange = (event, newValue) => {
        setState({ ...state, tabIndex: newValue });
    };

    // styles 
    useLayoutEffect(() => {
        if (matchesXLUp) {
            return setState({ ...state, pageSize: 15 });
        } else if (matchesLgUp) {
            return setState({ ...state, pageSize: 9 });
        } else if (matchesSmUp) {
            return setState({ ...state, pageSize: 5 });
        }
    }, []);

    const theme = useTheme(styles);
    const matchesSmUp = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
    const matchesLgUp = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const matchesXLUp = useMediaQuery(theme.breakpoints.up('xl'));

    return (
        <Grid
            container
            className={classes.container}
            spacing={5}
            style={{ zoom: "0.8" }}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={state.tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="auto"
                >
                    <Tab className={classes.tab} label="Manage Entries" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="Manage One Time Max" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="Manage Workouts" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="Manage Routines" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={0} >
                <MaterialTable
                    className={classes.manageDataTable}
                    columns={state.dataColumn}
                    data={state.data}
                    options={{
                        grouping: true,
                        showTitle: false,
                        pageSize: state.pageSize
                    }}
                    icons={icons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setState({ ...state, data: newData });

                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...state.data];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setState({ ...state, data: dataUpdate });

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...state.data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setState({ ...state, data: dataDelete });

                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={1} >
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={2}>
                <MaterialTable
                    className={classes.manageDataTable}
                    columns={state.workoutColumn}
                    data={state.workoutData}
                    options={{
                        grouping: true,
                        showTitle: false,
                        pageSize: state.pageSize
                    }}
                    icons={icons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setState({ ...state, workoutData: newData });

                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...state.workoutData];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setState({ ...state, workoutData: dataUpdate });

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...state.workoutData];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setState({ ...state, workoutData: dataDelete });

                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={3}>
                <MaterialTable
                    className={classes.manageDataTable}
                    columns={state.routineColumn}
                    data={state.routineData}
                    options={{
                        grouping: false,
                        showTitle: false,
                        pageSize: state.pageSize
                    }}
                    icons={icons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    setState({ ...state, routineData: newData });

                                    resolve();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataUpdate = [...state.routineData];
                                    const index = oldData.tableData.id;
                                    dataUpdate[index] = newData;
                                    setState({ ...state, routineData: dataUpdate });

                                    resolve();
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...state.routineData];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    setState({ ...state, routineData: dataDelete });

                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </TabPanel>
        </Grid>);
}