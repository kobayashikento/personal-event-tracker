import React from 'react';

import moment from 'moment';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { setEntries } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import db from '../../firebase.js';

import MaterialTable from 'material-table';

const useStyles = makeStyles(styles);

export default function GymManageEnrties(props) {
    const classes = useStyles();
    const data = useSelector((reducer) => reducer.dataReducer)
    const [entries, setAllEntries] = React.useState(data.entries);
    const [message, setMessage] = React.useState("")
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        db.child("gymEntries").once('value', snap => {
            dispatch(setEntries(snap.val()))
        })
    }, [])

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
            return null
        }
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

    const getEntryData = (rowData) => {
        const temp = [];
        if (entries !== undefined && entries !== null) {
            entries.map(entry => {
                temp.push({
                    date: moment(entry.date).format('MM.DD.YYYY'),
                    workout: getIdFromWorkout(entry.workout),
                    reps: entry.reps,
                    weight: entry.weight
                })
            })
        }
        return temp;
    }

    const validEntry = (newData) => {
        if (Object.keys(newData).length !== 4) {
            setMessage("Complete all forms")
            setSnackbarOpen(true);
            return false;
        } 
        return true;
    }

    const getWorkoutFromId = (newData) => {
        const id = newData.workout
        let name = getLookUp()[id];
        if (data.workout !== undefined) {
            data.workout.map(prop => {
                if (titleCase(name).replace(/\s+/g, '') === titleCase(prop.name).replace(/\s+/g, '')) {
                    newData.workout = prop.name;
                    return newData;
                }
            })
        }
        return newData.workout;
    }

    return (
        <React.Fragment>
            <MaterialTable
                className={classes.manageDataTable}
                columns={[
                    { title: 'Date', field: 'date', type: 'date' },
                    { title: 'Workout', field: 'workout', lookup: getLookUp() },
                    { title: 'Reps', field: 'reps', type: 'numeric', grouping: false },
                    { title: 'Weight', field: 'weight', type: 'numeric', grouping: false }
                ]}
                data={getEntryData()}
                options={{
                    grouping: false,
                    showTitle: false,
                    pageSize: 10
                }}
                icons={icons}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (validEntry(newData)){
                                    const newEntry = {
                                        workout: getWorkoutFromId(newData),
                                        weight: newData.weight,
                                        reps: newData.reps,
                                        date: newData.date.getTime()
                                    }
                                    const temp = [...entries]
                                    temp.push(newEntry);
                                    setAllEntries(temp)
                                    db.child('gymEntries').set(temp)
                                    resolve();   
                                } else {
                                    reject();
                                }
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (validEntry(newData)){
                                    const temp = [...entries]
                                    const index = oldData.tableData.id
                                    temp[index] = newData
                                    setAllEntries(temp)
                                    db.child('gymEntries').set(temp)
                                    resolve();
                                } else {
                                    reject();
                                }
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...entries];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setAllEntries(dataDelete);
                                db.child('gymEntries').set(dataDelete)
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
