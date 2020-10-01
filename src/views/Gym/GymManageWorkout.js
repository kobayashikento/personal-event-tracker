import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import { connect } from 'react-redux';
import { deleteWorkout, addWorkout, updateWorkout } from '../../redux/actions/dataAction.js';

import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

const GymManageWorkout = (props) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const workoutExists = (newData) => {
        if (props.workout !== undefined) {
            props.workout.map(prop => {
                let tempnewData = newData.name.replace(/\s+/g, '');
                let tempProp = prop.name.replace(/\s+/g, '');
                if (tempnewData === tempProp) {
                    return true;
                }
            })
        }
        return false;
    }

    const validInput = (input) => {
        if (Object.keys(input).length !== 4) {
            setMessage("Complete all inputs")
            setSnackbarOpen(true);
            return false;
        } else {
            if (input.name.length < 3) {
                setMessage("Workout Name has to be longer than 3 letters")
                setSnackbarOpen(true);
                return false;
            } else if (input.musclegroup.length < 3) {
                setMessage("Muscle group has to be longer than 3 letters")
                setSnackbarOpen(true);
                return false;
            } else if (input.movement.length < 3) {
                setMessage("Movement has to be longer than 3 letters")
                setSnackbarOpen(true);
                return false;
            }
        }
        return true;
    }

    if (props.workout === undefined) {
        return (
            <CircularProgress style={{ position: "relative", top: "15rem", left: "50%" }} color="primary" />
        )
    } else {
        return (
            <React.Fragment>
                <MaterialTable
                    className={classes.manageDataTable}
                    columns={[
                        { title: 'Name', field: 'name', grouping: false, },
                        { title: 'Muscle Group', field: 'musclegroup', },
                        { title: 'Movement', field: 'movement', },
                    ]}
                    data={props.workout.map(prop =>{
                        return {
                            name: titleCase(prop.name),
                            musclegroup: titleCase(prop.musclegroup),
                            movement: titleCase(prop.movement),
                            id: prop.id
                        }
                    })}
                    options={{
                        grouping: true,
                        showTitle: false,
                        pageSize: 10
                    }}
                    icons={icons}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (workoutExists(newData)) {
                                        setMessage("Workout already exists")
                                        setSnackbarOpen(true);
                                        reject();
                                    } else if (validInput(newData)) {
                                        newData.name.replace(/ /g, '').trim()
                                        newData.musclegroup.replace(/ /g, '').trim()
                                        newData.movement.replace(/ /g, '').trim()
                                        props.addWorkout(newData)
                                        setMessage("Workout Added")
                                        setSnackbarOpen(true)
                                        resolve();
                                    } else {
                                        setSnackbarOpen(true);
                                        reject();
                                    }
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (!validInput(newData)) {
                                        reject();
                                    } else if (workoutExists(newData)) {
                                        setMessage("Workout already exists")
                                        setSnackbarOpen(true);
                                        reject();
                                    } else {
                                        const dataUpdate = [...props.workout];
                                        const index = oldData.tableData.id;
                                        newData.name.replace(/ /g, '')
                                        newData.name.trim()
                                        newData.musclegroup.replace(/ /g, '')
                                        newData.musclegroup.trim()
                                        newData.movement.replace(/ /g, '')
                                        newData.movement.trim()
                                        dataUpdate[index] = newData;
                                        props.updateWorkout(dataUpdate, newData)
                                        resolve();
                                    }
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...props.workout];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    props.deleteWorkout(dataDelete, oldData.id);
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workout: state.dataReducer.workout,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addWorkout: (workout) => dispatch(addWorkout(workout)),
        deleteWorkout: (workout, id) => dispatch(deleteWorkout(workout, id)),
        updateWorkout: (workout, newObj) => dispatch(updateWorkout(workout, newObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymManageWorkout)