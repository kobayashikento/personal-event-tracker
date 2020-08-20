import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// generate random events for the calendar 
import data from '../../assets/data/dashEvents.json';

import styles from '../../assets/styles/views/gym/gymStyle.js';

import GymSelection from './GymSelection.js';
import GymContainer from './GymContainer.js';

const useStyles = makeStyles(styles);

export default function GymView(props) {
    const classes = useStyles();

    //states 
    const [state, setState] = React.useState({
        selectedData: [],
        tabIndex: 0
    })

    // react state for tabs 
    const handleChange = (newValue) => {
        setState({ ...state, tabIndex: newValue });
    };
    const handleDataSelection = (data) => {
        setState({ ...state, selectedData: data })
    };

    return (
        <div className={classes.container}>
            <section className={"section", classes.section}>
                <div className={"square", classes.square}>
                    <GymContainer
                        value={state.tabIndex}
                        handleChange={(value) => handleChange(value)}
                        selectedData={state.selectedData}
                    />
                </div>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        <GymSelection
                            handleDataSelection={(data) => handleDataSelection(data)}
                            theme={props.theme}
                        />
                    </div>
                    <div className="wide-rect">

                    </div>
                </div>
            </section>
        </div>
    );
}