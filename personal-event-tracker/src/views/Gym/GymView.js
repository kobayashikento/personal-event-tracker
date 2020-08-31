import React from 'react';
import { useRef, useLayoutEffect } from 'react'

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// generate random events for the calendar 
import data from '../../assets/data/dashEvents.json';

import styles from '../../assets/styles/views/gym/gymStyle.js';

import moment from 'moment';

import GymSelection from './GymSelection.js';
import GymContainer from './GymContainer.js';

const useStyles = makeStyles(styles);

export default function GymView(props) {
    const classes = useStyles();
    const targetRef = useRef();
    //states 
    const [state, setState] = React.useState({
        selectedData: [],
        selectedStartDate: moment().subtract(29, 'days'),
        selectedEndDate: moment(),
        width: 0, height: 0
    })

    // react state for tabs 
    const handleDataSelection = (data) => {
        setState({ ...state, selectedData: data })
    };
    const handleDateChange = (start, end) => {
        setState({ ...state, selectedStartDate: start, selectedEndDate: end })
    };

    useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, [])

    return (
        <Grid
            container
            className={classes.container}
            spacing={6}
        >
            <Grid ref={targetRef} className={classes.gymContainer} item xs={(props.tabIndex === 0) ? 8 : 12} >
                <GymContainer
                    tabIndex={props.tabIndex}
                    handleTabChange={(value) => props.handleTabChange(value)}
                    selectedData={state.selectedData}
                    start={state.selectedStartDate}
                    end={state.selectedEndDate}
                    theme={props.theme}
                    height={state.height}
                    width={state.height}
                />
            </Grid>
            <Grid className={classes.gymSelection} item xs={4}>
                <GymSelection
                    handleDataSelection={(data) => handleDataSelection(data)}
                    theme={props.theme}
                    start={state.selectedStartDate}
                    end={state.selectedEndDate}
                    handleDateChange={(start, end) => handleDateChange(start, end)}
                    tabIndex={props.tabIndex}
                />
            </Grid>
        </Grid>
    );
}