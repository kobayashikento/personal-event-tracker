import React from 'react'
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from '../../assets/styles/views/gym/gymcontainerStyle.js';

import GymGraph from './GymGraph.js';

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

    // states 
    const handleChange = (event, newValue) => {
        props.handleChange(newValue);
    };

    return (
        <Paper elevation={3} className={classes.paper}>
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
            <TabPanel className={classes.tabpanel} value={props.value} index={0}>
                <GymGraph
                    data={props.selectedData}
                />
            </TabPanel>
            <TabPanel value={props.value} index={1}>
                Item Two
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