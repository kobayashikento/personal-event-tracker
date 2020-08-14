import React from 'react';

import { makeStyles, withStyles } from '@material-ui/styles';

import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import styles from '../../assets/styles/components/forms/gyminputformStyle.js';

import workouts from '../../assets/data/workouts.json';
import routines from '../../assets/data/workoutRoutine.json';

const useStyle = makeStyles(styles);

export default function GymInputForm(props) {
    //props workout = workoutRoutine object
    const classes = useStyle();

    // states 
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [state, setState] = React.useState({
        workout: props.workout.workout.name,
        routine: props.routine.routineName
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const StyleInputLabel = withStyles({
        root: {
            fontSize: "1rem"
        },
    })(InputLabel)

    const StyledSelect = withStyles({
        root: {
            textTransform: "capitalize"
        }
    })(Select)


    return (
        <Paper className={classes.paper}>
            <div className={classes.select}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl variant="outlined" className={classes.formcontrol}>
                        <StyleInputLabel >Workout</StyleInputLabel>
                        <StyledSelect
                            native
                            value={state.workout}
                            onChange={handleChange}
                            label="Workout"
                            name="workout"
                        >
                            <option >{state.workout}</option>
                            {workouts.map((workout, index) => {
                                if (workout.name !== state.workout) {
                                    return (
                                        <option key={index}>{workout.name}</option>
                                    )
                                }
                            })}
                        </StyledSelect>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formcontrol}>
                        <StyleInputLabel >Routine</StyleInputLabel>
                        <StyledSelect
                            native
                            value={state.routine}
                            onChange={handleChange}
                            label="Workout"
                            name="routine"
                        >
                            <option >{state.routine}</option>
                            {routines.map((routine, index) => {
                                if (routine.routineName !== state.routine) {
                                    return (
                                        <option key={index}>{routine.routineName}</option>
                                    )
                                }
                            })}
                        </StyledSelect>
                    </FormControl>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        InputProps={{ className: classes.datepicker }}
                    />
                </MuiPickersUtilsProvider>
            </div>
        </Paper>
    );
}