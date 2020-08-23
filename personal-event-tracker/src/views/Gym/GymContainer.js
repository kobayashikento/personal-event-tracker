import React from 'react'
import { useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MaterialTable from 'material-table';

import styles from '../../assets/styles/views/gym/gymcontainerStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';
import GymGraph from './GymGraph.js';

import workoutData from '../../assets/data/gymData.json';

const useStyles = makeStyles(styles);

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

export default function GymContainer(props) {
    const classes = useStyles();
    const targetRef = useRef();

    // states 
    const [state, setState] = React.useState({ width: 0, height: 0, })
    const handleChange = (event, newValue) => {
        console.log(event);
        props.handleChange(newValue);
    };

    useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    // Functions 
    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    };


    const getManageData = () => {
        var temp = [];
        workoutData.map(workout => {
            workout.data.map(prop => {
                temp.push({
                    date: prop.date,
                    workout: titleCase(workout.workout.name),
                    group: titleCase(workout.workout.musclegroup),
                    movement: titleCase(workout.workout.movement),
                    weight: prop.weight
                })
            })
        })
        return temp;
    }

    return (
        <Paper elevation={3} className={props.fullView ? classes.paper : classes.paperHidden} ref={targetRef}>
            <AppBar position="static" color="default">
                <Tabs
                    value={props.value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab className={classes.tab} label="Statistics" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="Manage Data" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="Manage Workouts" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="Manage Routines" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel className={classes.tabpanel} value={props.value} index={0} >
                <GymGraph
                    data={props.selectedData}
                    start={props.start}
                    end={props.end}
                    theme={props.theme}
                    width={state.width}
                    height={state.height}
                />
            </TabPanel>
            <TabPanel value={props.value} index={1} >
                <MaterialTable
                    className={classes.manageDataTable}
                    title="Basic Grouping Preview"
                    columns={[
                        { title: 'Date', field: 'date', type: 'date' },
                        { title: 'Workout', field: 'workout' },
                        { title: 'Muscle Group', field: 'group' },
                        { title: 'Movement', field: 'movement' },
                        { title: 'Weight', field: 'weight', type: 'numeric' },
                    ]}
                    data={getManageData()}
                    options={{
                        grouping: true,
                        showTitle: false,
                        pageSize: 8
                    }}
                    icons={icons}
                />
            </TabPanel>
            <TabPanel value={props.value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={props.value} index={3}>
                Item Three
            </TabPanel>
        </Paper>
    );
}