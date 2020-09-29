import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { setAllRoutine } from '../../redux/actions/dataAction.js';

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
    const dispatch = useDispatch();

    React.useEffect(() => {
        db.child("workoutRoutine").once('value', snap => {
            dispatch(setAllRoutine(snap.val()))
        })
    }, [])

    const routineExists = (newData, id) => {
        let temp
        if (routine[id].workouts !== undefined) {
            routine[id].workouts.map(prop => {
                
                let tempnewData = getLookUp()[newData.workout].replace(/\s+/g, '');
                let tempProp = prop.workout.name.replace(/\s+/g, '');
                if (titleCase(tempnewData) === titleCase(tempProp)) {
                    temp = true;
                }
            })
        } else {
            temp = false;
        }
        return temp;
    }

    const validInput = (input) => {
        if (Object.keys(input).length !== 4) {
            setMessage("Complete all forms")
            setSnackbarOpen(true);
            return false;
        } else {
            if (input.workout === undefined) {
                setMessage("Please Select a workout")
                setSnackbarOpen(true);
                return false;
            } else if (input.sets === 0 || input.sets > 10) {
                setMessage("Invalid number of sets. Sets must be greater 0 and less than 10")
                setSnackbarOpen(true);
                return false;
            } else if (!/\d+\-+\d+/ | /\d+/.test(input.reps) === false) {
                setMessage("Reps must match the format 'digit' + '-' 'digit' or 'digit'")
                setSnackbarOpen(true);
                return false;
            } else if (/\d+\-+\d+/ | /\d+/.test(input.rest) === false) {
                setMessage("Rest must match the format 'digit' + '-' 'digit' or 'digit'")
                setSnackbarOpen(true);
                return false;
            }
        }
        setMessage("")
        return true;
    }

    const getRoutineInfo = () => {
        let temp = [];
        if (routine !== undefined) {
            routine.map(prop => {
                temp.push(
                    {
                        name: titleCase(prop.routineName)
                    }
                )
            })
        }
        return temp;
    }

    const getLookUp = () => {
        let temp = []
        if (data.workout !== undefined) {
            data.workout.map(prop => {
                temp.push(
                    {
                        [prop.tableData.id]: titleCase(prop.name)
                    }
                )
            })
            let temp1 = {};
            temp.map(prop => Object.assign(temp1, prop))
            return temp1
        } else {
            return temp
        }
    }

    const validRoutine = (newData) => {
        if (Object.keys(newData).length !== 1) {
            setMessage("Complete all forms")
            setSnackbarOpen(true);
            return false;
        } else if (newData.name.length < 3) {
            setMessage("Routine Name must be longer than 3 letters")
            setSnackbarOpen(true);
            return false;
        }
        return true;
    }

    const getIdFromWorkout = (name) => {
        let temp = getLookUp();
        for (var i = 0; i < Object.keys(temp).length; i++) {
            if (temp[i] === titleCase(name)) {
                return i;
            }
        }
        return 0;
    }

    const getWorkoutFromId = (newData) => {
        const id = newData.workout
        let name = getLookUp()[id];
        if (data.workout !== undefined) {
            data.workout.map(prop => {
                if (titleCase(name).replace(/\s+/g, '') === titleCase(prop.name).replace(/\s+/g, '')) {
                    newData.workout = prop;
                    return newData;
                }
            })
        }
        return newData;
    }

    const getDataInnerTable = (rowData) => {
        let temp = [];
        if (routine[rowData.tableData.id].workouts !== undefined) {
            routine[rowData.tableData.id].workouts.map(prop => {
                temp.push({
                    workout: getIdFromWorkout(prop.workout.name),
                    sets: prop.sets,
                    reps: prop.reps,
                    rest: prop.rest
                })
            })
        } else {

        }
        return temp;
    }

    return (
        <React.Fragment>
            <MaterialTable
                className={classes.manageDataTable}
                columns={[
                    { title: 'Routine', field: 'name' },
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
                                    data={getDataInnerTable(rowData)}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    if (routineExists(newData, rowData.tableData.id)) {
                                                        setMessage("Workout already exists")
                                                        setSnackbarOpen(true);
                                                        reject();
                                                    } else if (validInput(newData)) {
                                                        const temp = [...routine]
                                                        const addData = temp[rowData.tableData.id]
                                                        const convertData = getWorkoutFromId(newData)
                                                        if (addData.workouts !== undefined) {
                                                            addData.workouts.push(convertData)
                                                            temp[rowData.tableData.id] = addData
                                                        } else {
                                                            addData["workouts"] = [convertData]
                                                            temp[rowData.tableData.id] = addData
                                                        }
                                                        setRoutine(temp)
                                                        db.child('workoutRoutine').set(temp)
                                                        resolve();
                                                    } else {
                                                        reject();
                                                    }
                                                    reject();
                                                }, 1000)
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    if (routineExists(newData, rowData.tableData.id)) {
                                                        setMessage("Workout already exists")
                                                        setSnackbarOpen(true);
                                                        reject();
                                                    } else if (validInput(newData)) {
                                                        const temp = [...routine];
                                                        const dataUpdate = temp[rowData.tableData.id]
                                                        dataUpdate[oldData.tableData.id] = newData
                                                        temp[rowData.tableData.id] = dataUpdate
                                                        setRoutine(temp)
                                                        db.child('workoutRoutine').set(temp)
                                                        resolve();
                                                    } else {
                                                        reject();
                                                    }
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
                                                    resolve();
                                                }, 1000)
                                            }),
                                    }}
                                />
                            );
                        }
                    }
                ]}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (validRoutine(newData)) {
                                    let newRoutine = {
                                        routineName: newData.name.trim(),
                                        workouts: []
                                    }
                                    let temp = [...routine]
                                    temp.push(newRoutine)
                                    setRoutine(temp)
                                    db.child('workoutRoutine').set(temp)
                                    resolve();
                                } else {
                                    reject();
                                }
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...routine];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setRoutine(dataDelete);
                                db.child('workoutRoutine').set(dataDelete)
                                resolve();
                            }, 1000)
                        }),
                }}
            />
            <Snackbar
                open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                message={message}
            />
        </React.Fragment>
    );
}