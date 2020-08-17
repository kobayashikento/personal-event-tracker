import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import components
import NormalCalendar from '../../components/StandardCalendar.js';
import ProgressCalendar from '../../components/ProgressCalendar.js';
import LineGraph from '../../components/LineGraph.js';

// generate random events for the calendar 
import data from '../../assets/data/dashEvents.json';

import styles from '../../assets/styles/views/gym/gymStyle.js';

import GymSelection from './GymSelection.js';

const useStyles = makeStyles(styles);

export default function GymView() {
    const classes = useStyles();

    //states 
    const [selcetedData, setSelectedData] = React.useState()

    return (
        <div className={classes.container}>
            <section className={"section", classes.section}>
                <div className={"square", classes.square}>

                </div>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        <GymSelection />
                    </div>
                    <div className="wide-rect">
        
                    </div>
                </div>
            </section>
        </div>
    );
}