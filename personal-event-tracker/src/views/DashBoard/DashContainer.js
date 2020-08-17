import React, { Fragment } from 'react';
import { forwardRef } from 'react';

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
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

import MaterialTable from 'material-table';

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
    React.useEffect(() => {
        if (props.checkedSwitch && expanded !== 'panel1') {
            setExpanded('panel1');
        } else if (!props.checkedSwitch & expanded !== false) {
            setExpanded(false)
            props.handleIndexChange(0)
        }
    }, [props.checkedSwitch])

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
            {props.state.checkedSwitch && !matches ? <CountDownTimer /> : null}
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
                    <Button color="secondary" size="large">More Details</Button>
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
                        <LibraryMusicIcon className={classes.icon} />
                        <Typography className={classes.heading}>Pieces</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>In Progress</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails >
                    <MaterialTable
                        style={{ width: "100%" }}
                        columns={[
                            { title: 'Piece Name', field: 'name', },
                            { title: 'Composer', field: 'composer' },
                            { title: 'Date Added', field: 'date', type: 'numeric' },
                        ]}
                        data={[
                            { name: 'Waltz in C Sharp Minor (Op. 64 No. 2)', composer: 'Chopin', url: 'https://www.youtube.com/embed/SUT_0c2QVzo' },
                            { name: 'Howls Moving Castle', composer: 'Joe Hisaishi', url: 'https://www.youtube.com/embed/5u5oCjrIu60' },
                            { name: 'Chopin - Nocturne in E Flat Major (Op. 9 No. 2)', composer: 'Chopin', url: 'https://www.youtube.com/embed/p29JUpsOSTE'},
                            { name: 'Joe Hisaishi - One Summers Day', composer: 'Joe Hisaishi', url: 'https://www.youtube.com/embed/TK1Ij_-mank'},
                            { name: 'Kioku', composer: 'Unknown', url: 'https://www.youtube.com/embed/nj93DxZdwUs'}
                        ]}
                        options={{
                            showTitle: false,
                        }}
                        icons={{
                            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                        }}
                        detailPanel={rowData => {
                            return (
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={rowData.url}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            )
                        }}
                        onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="large">More Details</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}