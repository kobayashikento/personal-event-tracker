import React from 'react';

// import material ui cores
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// import material ui icons 
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import workoutRoutine from '../../assets/data/workoutRoutine.json';

import CountDownTimer from '../../components/CountDownTimer.js';
import styles from '../../assets/styles/views/dashboard/dashcontainerStyle.js';

const useStyle = makeStyles(styles);

export default function DashContainer(props) {
    // variables
    const theme = useTheme(styles);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));


    // states 
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel, index) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        props.handleIndexChange(index);
    }

    // styles 
    const classes = useStyle();
    const StyledTableCell = withStyles(theme => ({
        head: {
            backgroundColor: props.theme.colors.secondary,
            color: props.theme.colors.primarytext
        },
        body: {
            fontSize: "0.8rem",
            [theme.breakpoints.up("sm")]: {
                fontSize: "1.2rem",
            }
        },
    }))(TableCell)
    const StyledTableRow = withStyles({
        root: {
            [`&:nth-of-type(${props.selectedCell})`]: {
                backgroundColor: props.theme.colors.tertiary,
            },
        },
    })(TableRow)

    return (
        <div className={classes.container}>
            <div className={classes.toggleText}>
                <Typography color="textPrimary" className={classes.typo} variant="h5">Gym</Typography>
                <FormGroup row>
                    <FormControlLabel
                        className={classes.typo}
                        control={<Switch color="primary" checked={props.state.checkedSwitch} onChange={props.handleSwitchChange} name="checkedSwitch" />}
                        label={<Typography className={classes.switchTypo} variant="h4">In the gym</Typography>}
                    />
                </FormGroup>
            </div>
            {props.state.checkedSwitch && !matches? <CountDownTimer /> : null}
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1', 1)}
                className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <ScheduleIcon className={classes.icon} />
                        <Typography className={classes.heading}>Next Workout</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Muscle Group : {workoutRoutine[0].routineName}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exercise</StyledTableCell>
                                <StyledTableCell align="right">Sets</StyledTableCell>
                                <StyledTableCell align="right">Reps</StyledTableCell>
                                <StyledTableCell align="right">Rest</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workoutRoutine[0].workouts.map((routine, index) => {
                                return (
                                    <StyledTableRow onClick={() => { props.handleCellChange(index + 1) }} key={index}>
                                        <StyledTableCell className={classes.tableitem} component="th" scope="row">{routine.workout.name}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.sets}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.reps}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.rest}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="large">More Details</Button>
                </AccordionActions>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2', 2)} className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <ScheduleIcon className={classes.icon} />
                        <Typography className={classes.heading}>Progress History</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Muscle Group : {workoutRoutine[0].routineName}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exercise</StyledTableCell>
                                <StyledTableCell align="right">Sets</StyledTableCell>
                                <StyledTableCell align="right">Reps</StyledTableCell>
                                <StyledTableCell align="right">Rest</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workoutRoutine[0].workouts.map((routine, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className={classes.tableitem} component="th" scope="row">{routine.workout.name}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.sets}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.reps}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.rest}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="large">More Details</Button>
                </AccordionActions>
            </Accordion>
            <Typography className={classes.typo} variant="h5">Piano</Typography>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3', 3)} className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <ScheduleIcon className={classes.icon} />
                        <Typography className={classes.heading}>Pieces</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>In Progress</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exercise</StyledTableCell>
                                <StyledTableCell align="right">Sets</StyledTableCell>
                                <StyledTableCell align="right">Reps</StyledTableCell>
                                <StyledTableCell align="right">Rest</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workoutRoutine[0].workouts.map((routine, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell className={classes.tableitem} component="th" scope="row">{routine.workout.name}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.sets}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.reps}</StyledTableCell>
                                        <StyledTableCell className={classes.tableitem} align="right">{routine.rest}</StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="large">More Details</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}