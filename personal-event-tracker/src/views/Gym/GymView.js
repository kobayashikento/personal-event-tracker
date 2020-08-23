import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// generate random events for the calendar 
import data from '../../assets/data/dashEvents.json';

import styles from '../../assets/styles/views/gym/gymStyle.js';

import moment from 'moment';

import GymSelection from './GymSelection.js';
import GymContainer from './GymContainer.js';

const useStyles = makeStyles(styles);

export default function GymView(props) {
    const classes = useStyles();

    //states 
    const [state, setState] = React.useState({
        selectedData: [],
        selectedStartDate: moment().subtract(29, 'days'),
        selectedEndDate: moment(),
        tabIndex: 0,
        fullView: true
    })

    // react state for tabs 
    const handleChange = (newValue) => {
        setState({ ...state, tabIndex: newValue });
    };
    const handleDataSelection = (data) => {
        setState({ ...state, selectedData: data })
    };
    const handleDateChange = (start, end) => {
        setState({ ...state, selectedStartDate: start, selectedEndDate: end })
    };
    React.useEffect(() => {
        if (state.tabIndex === 0){
            setState({...state, fullView: true})
        } else {
            setState({...state, fullView: false})
        }
    }, [state.tabIndex]);

    return (
        <div className={classes.container}>
            <section className={"section", classes.section}>
                <div className={"square", classes.square}>
                    <GymContainer
                        value={state.tabIndex}
                        handleChange={(value) => handleChange(value)}
                        selectedData={state.selectedData}
                        start={state.selectedStartDate}
                        end={state.selectedEndDate}
                        theme={props.theme}
                        fullView={state.fullView}
                    />
                </div>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        <GymSelection
                            handleDataSelection={(data) => handleDataSelection(data)}
                            theme={props.theme}
                            start={state.selectedStartDate}
                            end={state.selectedEndDate}
                            handleDateChange={(start, end) => handleDateChange(start, end)}
                            fullView={state.fullView}
                        />
                    </div>
                    <div className="wide-rect">

                    </div>
                </div>
            </section>
        </div>
    );
}