import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import db from '../../firebase.js';
import { connect } from 'react-redux';
import { setWorkout } from '../../redux/actions/dataAction.js';

import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

const GymManageWorkout = (props, {workout, setWorkout}) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const dispatch = useDispatch();

    const workoutExists = (newData) => {
        if (workout !== undefined){
            workout.map(prop => {
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
        if (Object.keys(input).length !== 3) {
            return false;
        } else {
            if (input.name.length < 3) {
                setMessage("Workout Name has to be longer than 3 letters")
                return false;
            } else if (input.musclegroup.length < 3) {
                setMessage("Muscle group has to be longer than 3 letters")
                return false;
            } else if (input.movement.length < 3) {
                setMessage("Movement has to be longer than 3 letters")
                return false;
            }
        }
        setMessage("")
        return true;
    }

    return (
        // <div>
        //     {"workout" !== undefined ? 
        <React.Fragment>
            <MaterialTable
                className={classes.manageDataTable}
                columns={[
                    { title: 'Name', field: 'name', grouping: false, },
                    { title: 'Muscle Group', field: 'musclegroup', },
                    { title: 'Movement', field: 'movement', },
                ]}
                data={workout}
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
                                    setWorkout(newData)
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
                                if (validInput(newData)) {
                                    const dataUpdate = [...workout];
                                    const index = oldData.tableData.id;
                                    newData.name.replace(/ /g, '')
                                    newData.name.trim()
                                    newData.musclegroup.replace(/ /g, '')
                                    newData.musclegroup.trim()
                                    newData.movement.replace(/ /g, '')
                                    newData.movement.trim()
                                    dataUpdate[index] = newData;
                                    //setCurrWorkout(dataUpdate);
                                    db.child('workouts').set(dataUpdate)
                                    resolve();
                                } else if (workoutExists(newData)) {
                                    setMessage("Workout already exists")
                                    setSnackbarOpen(true);
                                } else {
                                    reject();
                                }
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...workout];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                //setCurrWorkout(dataDelete);
                                db.child('workouts').set(dataDelete)
                                resolve()
                            }, 1000)
                        }),
                }}
            />
            <Snackbar
                open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                message={message}
            />
        </React.Fragment>
        // : <CircularProgress style={{ position: "relative", top: "15rem", left: "50%" }} color="primary" />}
        // </div>
    )
}

const mapStateToProps = (state) => {
    return {
        workout: state.dataReducer.workout
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWorkout: (workout) => dispatch(setWorkout(workout))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymManageWorkout)