import React from 'react';

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

    return (
        <Paper className={classes.paper}>
            <Autocomplete
                className={classes.autocomplete}
                multiple
                limitTags={6}
                options={options.sort((a,b)=> -b.group.localeCompare(a.group))}
                id="multiple-limit-tags"
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Workouts" placeholder="Workout" />
                )}
            />
        </Paper>
    );
}