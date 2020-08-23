import React from 'react';

// import files for the date range picker 
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

// import material ui 
import { makeStyles } from '@material-ui/core/styles';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import workoutData from '../../assets/data/gymData.json'

import styles from '../../assets/styles/views/gym/gymselectionStyle.js';

const useStyles = makeStyles(styles);

export default function GymSelection(props) {
    const classes = useStyles();

    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

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
        <Paper className={props.fullView ? classes.paper : classes.paperHidden}>
            <Autocomplete
                className={classes.autocomplete}
                multiple
                limitTags={6}
                options={options.sort((a, b) => -b.group.localeCompare(a.group))}
                id="multiple-limit-tags"
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Workouts" placeholder="Workout" />
                )}
                onChange={handleAutoComplete}
            />
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
                <input type="text" className={"form-control" && classes.datepicker} />
            </DateRangePicker>
        </Paper>
    );
}