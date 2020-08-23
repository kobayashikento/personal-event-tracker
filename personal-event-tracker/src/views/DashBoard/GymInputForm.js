import React from 'react';
import { forwardRef } from 'react';

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

// material ui icons 
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import MaterialTable from 'material-table'

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
        workouts: props.workouts,
        routine: props.routine.routineName
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({ ...state, [name]: event.target.value });
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // styles
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

    // settings for the material table
    const tableIcons = {
        Delete: forwardRef((props, ref) => <DeleteForeverIcon {...props} ref={ref} />),
        Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    };
    const tableColumns = [
        { title: 'Set', field: 'set', editable: 'never' },
        { title: 'Reps', field: 'reps', type: 'numeric' },
        { title: 'Weight', field: 'weight', type: 'numeric' }
    ];
    const tableData = []
    for (var i = 1; i <= state.workouts.sets; i++) {
        tableData.push({ set: i, reps: 0, weight: 0 })
    }
    const [data, setData] = React.useState(tableData)

    return (
        <Paper className={classes.paper}>
            <div className={classes.select}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl variant="outlined" className={classes.formcontrol}>
                        <StyleInputLabel >Workout</StyleInputLabel>
                        <StyledSelect
                            native
                            value={state.workouts.workout.name}
                            onChange={handleChange}
                            label="Workout"
                            name="workout"
                        >
                            <option >{state.workouts.workout.name}</option>
                            {workouts.map((workout, index) => {
                                if (workout.name !== state.workouts.workout.name) {
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
            <MaterialTable
                icons={tableIcons}
                columns={tableColumns}
                data={data}
                options={{
                    search: false,
                    showTitle: false,
                    filtering: false,
                    sorting: false,
                    paging: false
                }}
                editable={{
                    onRowAdd: newData => {
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);
                                resolve();
                            }, 1000)
                        })
                    },
                    onRowDelete: oldData => {
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);
                                resolve()
                            }, 1000)
                        })
                    },
                }}
                cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise((resolve, reject) => {
                            console.log('newValue: ' + newValue);
                            setTimeout(resolve, 1000);
                        });
                    }
                }}
            />
        </Paper>
    );
}