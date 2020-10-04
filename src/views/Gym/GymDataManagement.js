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

// Tab panel
import GymManageWorkout from './GymManageWorkout.js';
import GymManageRoutine from './GymManageRoutine.js';
import GymManageEntries from './GymManageEntries.js';
import GymManageSchedule from './GymManageSchedule.js';

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

export default function GymContainer(props) {
    const classes = useStyles();

    // states 
    const [state, setState] = React.useState({
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
            <AppBar position="static" color="default" style={{zIndex: "2"}}>
                <Tabs
                    value={state.tabIndex}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="auto"
                >
                    <Tab className={classes.tab} label="Manage Entries" {...a11yProps(0)} />
                    <Tab className={classes.tab} label="Manage Schedule" {...a11yProps(1)} />
                    <Tab className={classes.tab} label="Manage Workouts" {...a11yProps(2)} />
                    <Tab className={classes.tab} label="Manage Routines" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={0} >
               {/* <GymManageEntries /> */}
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={1} >
                {/* <GymManageSchedule /> */}
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={2}>
                <GymManageWorkout />
            </TabPanel>
            <TabPanel className={classes.tabpanel} value={state.tabIndex} index={3}>
               <GymManageRoutine />
            </TabPanel>
        </Grid>);
}





