import React, { Fragment } from 'react';

// import material ui cores 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';

import styles from '../../assets/styles/views/dashboard/dashboardStyle.js';
import DashContainer from './DashContainer.js';
import DashGraph from './DashGraph.js';

// import function used to generate the arrays for the calendar
import gymData from '../../assets/data/gymData.json';
import workRoutine from '../../assets/data/workoutRoutine.json';
import CountDownTimer from '../../components/CountDownTimer.js';
import InputForm from './GymInputForm.js';

const useStyles = makeStyles(styles);

export default function DashBoardView(props) {
    const classes = useStyles();
    const theme = useTheme(styles);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    // set states
    // need to have a json file that keeps tracks of current workout day probably a user setting file

    return (
        <Grid
            container
            className={classes.container}
        >
            <Grid item xs={12} style={{ padding: "24px", zoom: "0.9" }}>
                <DashContainer
                    theme={props.theme}
                />
            </Grid>
        </Grid>
    );
}