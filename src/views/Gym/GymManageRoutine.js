import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { deleteRoutine, addRoutine, updateRoutine, addRoutineWorkout, deleteRoutineWorkout } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import { connect } from 'react-redux';

import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

const GymManageRoutine = (props) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState("")
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const workoutExists = (newData, index) => {
        let temp = false;
        if (props.routine[index].workouts !== undefined) {
            props.routine[index].workouts.map(prop => {
                if (titleCase(prop.workout).replace(/\s+/g, '').trim() === titleCase(newData.workout).replace(/\s+/g, '').trim()) {
                    temp = true;
                }
            })
        } else { }
        return temp;
    }

    const routineExists = (newData) => {
        props.routine.map(prop => {
            if (prop.routineName.replace(/\s+/g, '').trim() === newData.name.replace(/\s+/g, '').trim()) {
                return true;
            }
        })
        return false;
    }

    const validRoutine = (newData, type) => {
        if (type === "add") {
            if (Object.keys(newData).length !== 1) {
                setMessage("Complete all forms")
                setSnackbarOpen(true);
                return false;
            }
        } else if (type === "edit") {
            if (Object.keys(newData).length !== 1) {
                setMessage("Complete all forms")
                setSnackbarOpen(true);
                return false;
            }
        } else {
            if (newData.name.length < 3) {
                setMessage("Routine Name must be longer than 3 letters")
                setSnackbarOpen(true);
                return false;
            }
        }
        return true;
    }

    const validInput = (input, type) => {
        if (type === "add") {
            if (Object.keys(input).length !== 4) {
                setMessage("Complete all forms")
                setSnackbarOpen(true);
                return false;
            }
        } else if (type === "edit") {
            if (Object.keys(input).length !== 5) {
                setMessage("Complete all forms")
                setSnackbarOpen(true);
                return false;
            }
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
        return true;
    }

    const getLookUp = () => {
        let temp = []
        if (props.workout !== undefined) {
            props.workout.map(prop => {
                temp.push(
                    {
                        [prop.id]: titleCase(prop.name)
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

    const checkValidEdit = (changes, routineIndex) => {
        // need to temporary create the updated routine to compare 
        let workouts = Object.assign([], props.routine[routineIndex].workouts);
        Object.keys(changes).map((key, index) => { 
            console.log(workouts[key])
            workouts[key] = {
                workout: changes[key].newData.workout,
                sets: changes[key].newData.sets,
                reps: changes[key].newData.reps,
                rest: changes[key].newData.rest
            }
        });
        console.log(workouts)
        return true;
    }

    const getDataInnerTable = (rowData) => {
        let temp = [];
        if (props.routine[rowData.tableData.id].workouts !== undefined) {
            props.routine[rowData.tableData.id].workouts.map(prop => {
                temp.push({
                    workout: prop.workout,
                    sets: prop.sets,
                    reps: prop.reps,
                    rest: prop.rest
                })
            })
        } else { }
        return temp;
    }

    if (props.routine === undefined) {
        return (
            <div>
                <p>loading...</p>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <MaterialTable
                    className={classes.manageDataTable}
                    columns={[
                        { title: 'Routine', field: 'name' },
                    ]}
                    data={
                        props.routine.map(prop => {
                            return {
                                name: titleCase(prop.routineName)
                            }
                        })
                    }
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
                                                        if (workoutExists(newData, rowData.tableData.id)) {
                                                            setMessage("Workout already exists")
                                                            setSnackbarOpen(true);
                                                            reject();
                                                        } else if (!validInput(newData)) {
                                                            reject();
                                                        } else {
                                                            // need docId, new workout obj to add
                                                            const docId = props.routine[rowData.tableData.id].id
                                                            console.log(docId, newData, rowData.tableData.id)
                                                            props.addRoutineWorkout(docId, newData, rowData.tableData.id)
                                                            resolve();
                                                        }
                                                        reject();
                                                    }, 1000)
                                                }),
                                            onBulkUpdate: changes =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        if (Object.keys(changes).length !== 0) {
                                                            if (!checkValidEdit(changes, rowData.tableData.id)) {
                                                                setMessage("Duplicate of workout exists");
                                                                setSnackbarOpen(true);
                                                                reject();
                                                            }

                                                        }
                                                        // if (routineExists(newData, rowData.tableData.id)) {
                                                        //     setMessage("Workout already exists")
                                                        //     setSnackbarOpen(true);
                                                        //     reject();
                                                        // } else if (!validInput(newData)) {
                                                        //     reject();
                                                        // } else {
                                                        //     const temp = [...routine];
                                                        //     const dataUpdate = temp[rowData.tableData.id]
                                                        //     dataUpdate[oldData.tableData.id] = newData
                                                        //     temp[rowData.tableData.id] = dataUpdate
                                                        //     setRoutine(temp)
                                                        //     db.child('workoutRoutine').set(temp)
                                                        //     resolve();
                                                        // }
                                                        resolve();
                                                    }, 1000);
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        let dataDelete = props.routine;
                                                        const docId = props.routine[rowData.tableData.id].id
                                                        const index = oldData.tableData.id;
                                                        props.deleteRoutineWorkout(docId, index, rowData.tableData.id);
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
                                    if (!validRoutine(newData, "add")) {
                                    } else if (routineExists(newData)) {
                                        setMessage("Routine exists")
                                        setSnackbarOpen(true);
                                    } else {
                                        newData.name.trim()
                                        props.addRoutine(newData)
                                        resolve();
                                    }
                                    reject();
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (!validRoutine(newData, "edit")) {
                                        reject();
                                    } else if (routineExists(newData)) {
                                        setMessage("Routine exists")
                                        setSnackbarOpen(true);
                                        reject();
                                    } else {
                                        const index = oldData.tableData.id;
                                        const docId = props.routine[index].id
                                        props.updateRoutine(newData, index, docId)
                                        resolve();
                                    }
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...props.routine];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    props.deleteRoutine(dataDelete, oldData.id);
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
}

const mapStateToProps = (state) => {
    return {
        workout: state.dataReducer.workout,
        routine: state.dataReducer.allRoutines
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addRoutine: (routine) => dispatch(addRoutine(routine)),
        deleteRoutine: (routine, id) => dispatch(deleteRoutine(routine, id)),
        updateRoutine: (routine, index, docId) => dispatch(updateRoutine(routine, index, docId)),
        addRoutineWorkout: (docId, workout, rowId) => dispatch(addRoutineWorkout(docId, workout, rowId)),
        deleteRoutineWorkout: (docId, index, rowId) => dispatch(deleteRoutineWorkout(docId, index, rowId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymManageRoutine)
