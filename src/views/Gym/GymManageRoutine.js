import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import db from '../../firebase.js';

import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

export default function GymManageWorkout(props) {
    const classes = useStyles();
    const data = useSelector((reducer) => reducer.dataReducer)
    const [routine, setRoutine] = React.useState(data.allRoutines);
    const [message, setMessage] = React.useState("")
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const routineExists = (newData) => {
        routine.map(prop => {
            let tempnewData = newData.name.replace(/\s+/g, '');
            let tempProp = prop.name.replace(/\s+/g, '');
            if (tempnewData === tempProp) {
                return true;
            }
        })
        return false;
    }

    const getRoutineInfo = () => {
        let temp = [];
        if (routine !== undefined) {
            routine.map(prop => {
                temp.push({
                    name: titleCase(prop.routineName),
                    numWork: prop.workouts.length
                })
            })
        }
        return temp;
    }

    const getLookUp = () => {
        let temp = []
        data.workout.map(prop => {
            temp[0].splice(
                {
                    [prop.tableData.id]: titleCase(prop.name)
                }
            )
        })
        
        console.log(temp)
        return Object.fromEntries(temp)
    }

    const getIdFromWorkout = (name) => {
        // for (var i = 0; i < getRoutineInfo().length; i++) {
        //     if (Object.values(getRoutineInfo()[i]) === titleCase(name)) {
        //         console.log(parseInt(Object.keys(getRoutineInfo()[i])))
        //         return parseInt(Object.keys(getRoutineInfo()[i]))
        //     }
        // }
        // return 0
    }

    return (
        <React.Fragment>
            <MaterialTable
                className={classes.manageDataTable}
                columns={[
                    { title: 'Routine', field: 'name' },
                    { title: 'Number of workouts', field: 'numWork', type: "numeric" }
                ]}
                data={getRoutineInfo()}
                options={{
                    grouping: false,
                    showTitle: false,
                    pageSize: 10
                }}
                icons={icons}
                detailPanel={[
                    {
                        tooltip: "Show Details",
                        render: rowData => {
                            return (
                                <MaterialTable
                                    className={classes.manageDataTable}
                                    columns={[
                                        { title: 'Workout', field: 'workout', lookup: getLookUp() },
                                        { title: 'Sets', field: 'sets', type: 'numeric' },
                                        { title: 'Reps', field: 'reps', },
                                        { title: 'Rest', field: 'rest', }
                                    ]}
                                    options={{
                                        grouping: false,
                                        showTitle: false,
                                        pageSize: 5
                                    }}
                                    icons={icons}
                                    data={
                                        routine[rowData.tableData.id].workouts.map(prop => {
                                            return {
                                                workout: 0,
                                                sets: prop.sets,
                                                reps: prop.reps,
                                                rest: prop.rest
                                            }
                                        })
                                    }
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    // if (validInput(newData)) {
                                                    //     const temp = [...workout]
                                                    //     temp.push(newData)
                                                    //     setWorkout(temp)
                                                    //     db.child('workouts').set(temp)
                                                    //     resolve()
                                                    // } else if (workoutExists(newData)) {
                                                    //     setMessage("Workout already exists")
                                                    //     setSnackbarOpen(true);
                                                    // } else {
                                                    //     setSnackbarOpen(true);
                                                    //     reject();
                                                }, 1000)
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataDelete = [...routine];
                                                    const index = oldData.tableData.id;
                                                    dataDelete[rowData.tableData.id].workouts.splice(index, 1);
                                                    setRoutine(dataDelete);
                                                    db.child('workoutRoutine').set(dataDelete)
                                                    resolve()
                                                }, 1000)
                                            }),
                                    }}
                                />
                            );
                        }
                    }
                ]}
            />
            <Snackbar
                open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                message={message}
            />
        </React.Fragment>
    );
}