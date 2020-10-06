import React from 'react';

import moment from 'moment';

import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';

import { makeStyles } from '@material-ui/core/styles';
import { addEntries, updateEntries, deleteEntries } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import MaterialTable from 'material-table';

import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

const GymManageEnrties = (props) => {
    const classes = useStyles();
    const [message, setMessage] = React.useState("")
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

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
            return {}
        }
    }

    const getEntryData = () => {
        const temp = [];
        if (props.entries !== undefined && props.entries !== null) {
            props.entries.map(entry => {
                temp.push({
                    date: moment(entry.date).format('MM.DD.YYYY'),
                    workout: entry.workout,
                    reps: entry.reps,
                    weight: entry.weight,
                    id: entry.id
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

    if (props.entries === undefined) {
        return (
            <CircularProgress style={{ position: "relative", top: "15rem", left: "45%" }} color="primary" />
        )
    } else {
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
                                    if (validEntry(newData)) {
                                        const newEntry = {
                                            workout: newData.workout,
                                            weight: newData.weight,
                                            reps: newData.reps,
                                            date: newData.date.getTime()
                                        }
                                        props.addEntries(newEntry);
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    if (validEntry(newData)) {
                                        const newEntry = {
                                            workout: newData.workout,
                                            weight: newData.weight,
                                            reps: newData.reps,
                                            date: newData.date.getTime()
                                        }
                                        props.updateEntries(newData.id, newEntry, newData.tableData.id)
                                        resolve();
                                    } else {
                                        reject();
                                    }
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    const dataDelete = [...props.entries];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    props.deleteEntries(dataDelete, oldData.id);
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
        entries: state.dataReducer.entries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEntries: (entry) => dispatch(addEntries(entry)),
        updateEntries: (docId, newEntry, rowId) => dispatch(updateEntries(docId, newEntry, rowId)),
        deleteEntries: (entry, docId) => dispatch(deleteEntries(entry, docId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymManageEnrties)