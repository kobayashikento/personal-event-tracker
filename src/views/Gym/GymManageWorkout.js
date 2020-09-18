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
    const [workout, setWorkout] = React.useState(data.workout);
    const [message, setMessage] = React.useState("")
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const workoutExists = (newData) => {
        workout.map(prop => {
            let tempnewData = newData.name.replace(/\s+/g, '');
            let tempProp = prop.name.replace(/\s+/g, '');
            if (tempnewData === tempProp) {
                return true;
            }
        })
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
                                if (validInput(newData)) {
                                    const temp = [...workout]
                                    temp.push(newData)
                                    setWorkout(temp)
                                    db.child('workouts').set(temp)
                                    resolve()
                                } else if (workoutExists(newData)) {
                                    setMessage("Workout already exists")
                                    setSnackbarOpen(true);
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
                                    dataUpdate[index] = newData;
                                    setWorkout(dataUpdate);
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
                                setWorkout(dataDelete);
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