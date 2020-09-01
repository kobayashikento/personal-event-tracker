import React from 'react';
import {
    titleCase
} from '../../assets/styles/masterStyle.js';

// import files for the date range picker 
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

// import material ui 
import { makeStyles } from '@material-ui/core/styles';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import workoutData from '../../assets/data/gymData.json'

import styles from '../../assets/styles/views/gym/gymselectionStyle.js';

const useStyles = makeStyles(styles);

export default function GymSelection(props) {
    const classes = useStyles();

    const options = workoutData.map((option) => {
        return {
            name: titleCase(option.workout.name), group: titleCase(option.workout.musclegroup),
            ...option
        };
    });

    const handleAutoComplete = (event, values) => {
        props.handleDataSelection(values)
    }

    const handleCallback = (start, end) => {
        props.handleDateChange(start, end);
    };

    // styles

    return (
        <Grid container className={classes.container} spacing={5}>
            <Grid item xs={8} className={classes.autocomplete}>
               
            </Grid>
            <Grid item xs={4} className={classes.daterangecontainer}>
                <DateRangePicker initialSettings={{
                    showDropdowns: true,
                    startDate: props.start.toDate(),
                    endDate: props.end.toDate(),
                    ranges: {
                        'Last 7 Days': [
                            moment().subtract(6, 'days').toDate(),
                            moment().toDate(),
                        ],
                        'Last 30 Days': [
                            moment().subtract(29, 'days').toDate(),
                            moment().toDate(),
                        ],
                        'This Month': [
                            moment().startOf('month').toDate(),
                            moment().endOf('month').toDate(),
                        ],
                        'Last Month': [
                            moment().subtract(1, 'month').startOf('month').toDate(),
                            moment().subtract(1, 'month').endOf('month').toDate(),
                        ],
                    },
                }}
                    onCallback={handleCallback}
                >
                    <input style={{ height: "100%", width: "100%" }} type="text" className={"form-control"} />
                </DateRangePicker>
            </Grid>
        </Grid>
    );
}