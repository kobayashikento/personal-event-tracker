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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { icons, titleCase } from '../../assets/styles/masterStyle.js';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { setEntries } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import db from '../../firebase.js';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(styles);

export default function GymManageSchedule(props) {
    const classes = useStyles();
    const data = useSelector((reducer) => reducer.dataReducer)
    const [schedule, setSchedule] = React.useState(data.schedule)

    const handleAutoComplete = (event, value) => {

        console.log(event, value)
    }

    const makeTableCells = () => {
        const container = [];
        if (schedule === undefined || schedule === null) {
            let temp = {
                "monday": { "primary": undefined, "secondary": undefined, "routineIndex": 0 },
                "tuesday": { "primary": undefined, "secondary": undefined, "routineIndex": 1 },
                "wednesday": { "primary": undefined, "secondary": undefined, "routineIndex": 2 },
                "thursday": { "primary": undefined, "secondary": undefined, "routineIndex": 3 },
                "friday": { "primary": undefined, "secondary": undefined, "routineIndex": 4 },
                "saturday": { "primary": undefined, "secondary": undefined, "routineIndex": 5 },
                "sunday": { "primary": undefined, "secondary": undefined, "routineIndex": 6 },
            }
            setSchedule(temp);
        }
        for (var key in schedule) {
            container.push(
                < TableRow key={key}>
                    <TableCell component="th" scope="row">{titleCase(key)}</TableCell>
                    <TableCell align="right">
                        <Autocomplete
                            options={
                                data.allRoutines
                            }
                            getOptionLabel={(option) => titleCase(option.routineName)}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            value
                            onChange={handleAutoComplete}
                        />
                    </TableCell>
                    <TableCell align="right">
                        <Autocomplete
                            options={
                                data.allRoutines
                            }
                            getOptionLabel={(option) => titleCase(option.routineName)}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                        //onChange={handleAutoComplete}
                        />
                    </TableCell>
                </TableRow >
            )
        }
        //db.child("schedule").set(temp);
        return container;
    }

    return (
        <Card >
            <CardContent style={{ display: "flex", flexDirection: "column", paddingBottom: "0px" }}>
                <TableContainer component={Paper} style={classes.manageDataTable} style={{ marginTop: "16px", maginBottom: "16px" }}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell width="30%" align="right">Primary Workout</TableCell>
                                <TableCell width="30%" align="right">Secondary Workout (Stretches)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {makeTableCells()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ marginLeft: "auto" }}>
                    <Button
                        variant="outlined"
                        style={{ margin: "16px" }}
                    >
                        Cancel
                </Button>
                    <Button
                        variant="contained" color="primary"
                        style={{ margin: "16px" }}
                    >
                        Save
                </Button>
                </div>
            </CardContent>
        </Card>
    )
}