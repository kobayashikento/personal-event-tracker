import React from 'react';

import moment from 'moment';

import Snackbar from '@material-ui/core/Snackbar';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';


import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { setEntries } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import db from '../../firebase.js';

const useStyles = makeStyles(styles);

export default function GymManageSchedule(props) {
    const classes = useStyles();
    const [schedule, setSchedule] = React.useState(db.schedule)

    const makeTableCells = () =>{
        // if (schedule === undefined){
        //     db.child("gymEntries").once('value', snap => {
        //         dispatch(setEntries(snap.val()))
        //     })
        // }
    }

    return (
        <TableContainer component={Paper} style={classes.manageDataTable}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Primary Workout</TableCell>
                        <TableCell align="right">Secondary Workout (Streches)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {makeTableCells()}
                    {/* <TableRow >
                        <TableCell component="th" scope="row">
                            Monday
                            </TableCell>
                        <TableCell align="right">Primary</TableCell>
                        <TableCell align="right">Secondary</TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}