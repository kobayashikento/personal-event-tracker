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
import CircularProgress from '@material-ui/core/CircularProgress';

import { titleCase } from '../../assets/styles/masterStyle.js';

import { makeStyles } from '@material-ui/core/styles';
import { updateSchedule } from '../../redux/actions/dataAction.js';

import styles from '../../assets/styles/views/gym/gymdatamanagementStyle.js';

import { connect } from 'react-redux';

import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(styles);

const GymManageSchedule = (props) => {
    const classes = useStyles();

    const handleAutoCompletePrimary = (event, values, index, key) => {
        let clone = Object.assign({}, props.schedule[0].schedule[index][key])
        if (values === null) {
            clone.primary = ""
        } else {
            clone.primary = values.id
        }
        let tempDay = Object.assign({}, props.schedule[0].schedule[index])
        tempDay[key] = clone
        let tempSchedule = Object.assign([], props.schedule[0].schedule)
        tempSchedule[index] = tempDay
        props.updateSchedule(tempSchedule, props.schedule[0].id)
    }

    const handleAutoCompleteSecondary = (event, values, index, key) => {
        let clone = Object.assign({}, props.schedule[0].schedule[index][key])
        if (values === null) {
            clone.secondary = ""
        } else {
            clone.seconday = values.id
        }
        let tempDay = Object.assign({}, props.schedule[0].schedule[index])
        tempDay[key] = clone
        let tempSchedule = Object.assign([], props.schedule[0].schedule)
        tempSchedule[index] = tempDay
        props.updateSchedule(tempSchedule, props.schedule[0].id)
    }

    const getDefaultValue = (optionsArry, value) => {
        let defaultValue = null
        if (value === undefined || value === null || value.length === 0) {
        } else {
            optionsArry.map((prop, index) => {
                if (prop.id === value) {
                    defaultValue = index;
                }
            })
        }
        return defaultValue;
    }

    const makeTableCells = () => {
        const container = [];
        const options = props.routine.map(prop => {
            return {
                id: prop.id,
                name: titleCase(prop.routineName)
            }
        })
        props.schedule[0].schedule.map((prop, index) => {
            const day = prop[Object.keys(prop)];
            container.push(
                < TableRow key={Object.keys(prop)}>
                    <TableCell component="th" scope="row">{Object.keys(prop)}</TableCell>
                    <TableCell align="right">
                        <Autocomplete
                            PopperComponent={"bottom-start"}
                            options={options}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            defaultValue={getDefaultValue(options, prop[Object.keys(prop)].primary) === null ? null : options[getDefaultValue(options, day.primary)]}
                            onChange={(event, values) => handleAutoCompletePrimary(event, values, index, Object.keys(prop))}
                        />
                    </TableCell>
                    <TableCell align="right">
                        <Autocomplete
                            PopperComponent={"bottom-start"}
                            options={options}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            defaultValue={getDefaultValue(options, prop[Object.keys(prop)].secondary) === null ? null : options[getDefaultValue(options, day.secondary)]}
                            onChange={(event, values) => handleAutoCompleteSecondary(event, values, index, Object.keys(prop))}
                        />
                    </TableCell>
                </TableRow >
            )
        })
        return container;
    }

    if (props.schedule === undefined || props.routine.length === 0) {
        return (
            <CircularProgress style={{ position: "relative", top: "15rem", left: "45%" }} color="primary" />
        )
    } else {
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
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        schedule: state.dataReducer.schedule,
        routine: state.dataReducer.allRoutines
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSchedule: (object, docId) => dispatch(updateSchedule(object, docId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GymManageSchedule)