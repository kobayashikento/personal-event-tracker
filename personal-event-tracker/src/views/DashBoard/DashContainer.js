import React from 'react';
import { Link } from 'react-router-dom';

// import material ui cores
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails'
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

import MaterialTable from 'material-table';

import workoutRoutine from '../../assets/data/workoutRoutine.json';

import CountDownTimer from '../../components/CountDownTimer.js';
import styles from '../../assets/styles/views/dashboard/dashcontainerStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';

const useStyle = makeStyles(styles);

export default function DashContainer(props) {
    // styles 
    const classes = useStyle();
    // variables
    const theme = useTheme(styles);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    // states 
    const [state, setState] = React.useState(
        {
            currentRow: {},
            selected: true,
            selectedRowId: 0,
            pianoCurrentRow: {},
            pianoSelected: false,
            pianoSelectedRowId: null
        }
    );
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

    // functions 
    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

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
                    className={classes.accordionSummary}
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
                    <MaterialTable
                        style={{ width: "100%" }}
                        columns={[
                            { title: 'Exercise', field: 'exercise', },
                            { title: 'Sets', field: 'sets' },
                            { title: 'Reps', field: 'reps' },
                            { title: 'Rest', field: 'rest' },
                        ]}
                        data={
                            (workoutRoutine[0].workouts.map((routine, index) => {
                                return {
                                    exercise: titleCase(routine.workout.name),
                                    sets: titleCase(routine.sets),
                                    reps: titleCase(routine.reps),
                                    rest: titleCase(routine.rest)
                                };
                            }))
                        }
                        options={{
                            showTitle: false,
                            search: false,
                            toolbar: false,
                            rowStyle: rowData => ({
                                backgroundColor:
                                    state.selected &&
                                        rowData.tableData.id === state.selectedRowId ? props.theme.colors.primary : "#fff"
                            })
                        }}
                        icons={icons}
                        onRowClick={(event, rowData) => {
                            setState({ ...state, currentRow: rowData });
                            if (rowData.tableData.id === state.selectedRowId) {
                                setState({ ...state, selected: false });
                                setState({ ...state, selectedRowId: null });
                            } else {
                                setState({ ...state, selected: true });
                                setState({ ...state, selectedRowId: rowData.tableData.id });
                                props.handleCellChange(rowData.tableData.id + 1)
                            }
                        }}
                    />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Link
                        to={"/main-menu/gym-routine"}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button color="secondary" size="large">More Details</Button>
                    </Link>
                </AccordionActions>
            </Accordion>
            <Typography className={classes.typo} variant="h5">Music</Typography>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3', 3)} className={classes.accordion}>
                <AccordionSummary
                    className={classes.accordionSummary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <LibraryMusicIcon className={classes.icon} />
                        <Typography className={classes.heading}>Piano Pieces</Typography>
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
                            { name: 'Chopin - Nocturne in E Flat Major (Op. 9 No. 2)', composer: 'Chopin', url: 'https://www.youtube.com/embed/p29JUpsOSTE' },
                            { name: 'Joe Hisaishi - One Summers Day', composer: 'Joe Hisaishi', url: 'https://www.youtube.com/embed/TK1Ij_-mank' },
                            { name: 'Kioku', composer: 'Unknown', url: 'https://www.youtube.com/embed/nj93DxZdwUs' }
                        ]}
                        options={{
                            showTitle: false,
                            rowStyle: rowData => ({
                                backgroundColor:
                                    state.pianoSelected &&
                                        rowData.tableData.id === state.pianoSelectedRowId ? props.theme.colors.primary : "#fff"
                            })
                        }}
                        icons={icons}
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
                        onRowClick={(event, rowData) => {
                            setState({ ...state, pianoCurrentRow: rowData });
                            if (rowData.tableData.id === state.selectedRowId) {
                                setState({ ...state, pianoSelected: false });
                                setState({ ...state, pianoSelectedRowId: null });

                            } else {
                                setState({ ...state, pianoSelected: true });
                                setState({ ...state, pianoSelectedRowId: rowData.tableData.id });
                            }
                        }}
                    />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button color="secondary" size="large">More Details</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}