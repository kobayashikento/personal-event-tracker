import React from 'react';
import { pdfjs } from 'react-pdf';
import moment from 'moment';
import { useForm } from 'react-hook-form';

// import material ui cores
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Autocomplete from '@material-ui/lab/Autocomplete'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// import material ui icons 
import FileCopyIcon from '@material-ui/icons/FileCopy';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import HistoryIcon from '@material-ui/icons/History';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

// import material table 
import MaterialTable from 'material-table';
import MediaPlayer from '../../components/MediaPlayer.js'
// import style
import styles from '../../assets/styles/views/dashboard/dashcontainerStyle.js';
import { icons, titleCase } from '../../assets/styles/masterStyle.js';

import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { addEntries } from '../../redux/actions/dataAction.js';

import EntryContent from '../../components/EntryContent.js';

const useStyle = makeStyles(styles);

const DashContainer = (props) => {
    // variables
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const theme = useTheme(styles);
    const targetRef = React.useRef();
    const classes = useStyle();

    // states 
    const [state, setState] = React.useState(
        {
            width: 0,
            buttonLocation: 0,
            liftsIndex: 0,
            modalOpen: false,
            workoutModalOpen: false,
            selectedWorkout: undefined,
            entry: undefined,
            disableRemoveSet: false,
            disableAddSet: false,
            disableRemoveWorkout: false,
            selectedModalWorkout: undefined,
            selectedModalSets: undefined
        }
    );
    const [activeStep, setActiveStep] = React.useState(0);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarCompletedOpen, setSnackbarCompletedOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleAutoComplete = (event, values) => {
        if (values === null) {
            setState({ ...state, selectedWorkout: undefined, entry: undefined })
        } else {
            setState({ ...state, selectedWorkout: values })
        }
    }

    const handleWorkoutAutoComplete = (event, values) => {
        if (values === null) {
            setState({ ...state, selectedModalWorkout: undefined })
        } else {
            setState({ ...state, selectedModalWorkout: values })
        }
    }

    const handleAddWorkout = () => {
        if (state.selectedModalWorkout === undefined) {
            setSnackbarMessage("Select a workout")
            setSnackbarOpen(true)
        } else if (state.selectedModalSets === undefined) {
            setSnackbarMessage("Number of sets must be greater than 0")
            setSnackbarOpen(true)
        } else {
            let items = [...state.entry]
            let temp = [];
            for (var i = 0; i < state.selectedModalSets; i++) {
                temp.push({
                    workout: state.selectedModalWorkout.name,
                    date: "",
                    reps: 0,
                    weight: 0
                })
            }
            items.push(temp)
            setState({ ...state, selectedModalWorkout: undefined, workoutModalOpen: false, selectedModalSets: undefined, entry: items })
        }
    }

    const checkFormCompleted = (object) => {
        let completed = true;
        object.map(prop => {
            if (prop.reps === 0 || prop.weight === 0) {
                completed = false;
            }
        })
        return completed;
    }

    const handleNext = (object, index, type) => {
        if (type !== "update") {
            if (checkFormCompleted(object)) {
                let items = [...state.entry[index]]
                for (var i = 0; i < items.length; i++) {
                    let item = { ...items[i] }
                    object[i].date = selectedDate.getTime()
                    item = object[i]
                    items[i] = item
                }
                let copyEntry = [...state.entry]
                let entryItem = [...copyEntry[index]]
                entryItem = items
                copyEntry[index] = entryItem
                setState({ ...state, entry: copyEntry })
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                if (type === "finish") {
                    let dbEntry = [];
                    if (copyEntry !== undefined) {
                        copyEntry.map(prop => {
                            if (prop !== undefined) {
                                prop.map(entry => {
                                    dbEntry.push(entry)
                                })
                            }
                        })
                    }
                    if (props.entries === undefined || props.entries === null) {
                        props.addEntries(dbEntry);
                        setState({ ...state, modalOpen: false, entry: undefined, selectedWorkout: undefined });
                        setSelectedDate(new Date());
                        setActiveStep(0);
                        return;
                    } else {
                        dbEntry.map(entry => {
                            props.addEntries(entry);
                        })
                        setState({ ...state, modalOpen: false, entry: undefined, selectedWorkout: undefined });
                        setSelectedDate(new Date());
                        setActiveStep(0);
                        return;
                    }
                }
            } else {
                setSnackbarCompletedOpen(true);
            }
        } else {
            let items = [...state.entry[index]]
            for (var i = 0; i < items.length; i++) {
                let item = { ...items[i] }
                object[i].date = selectedDate.getTime();
                item = object[i]
                items[i] = item
            }
            let copyEntry = [...state.entry]
            let entryItem = [...copyEntry[index]]
            entryItem = items
            copyEntry[index] = entryItem
            setState({ ...state, entry: copyEntry })
        }
    };


    const handleBack = (object, index) => {
        let items = [...state.entry[index]]
        for (var i = 0; i < items.length; i++) {
            let item = { ...items[i] }
            item = object[i]
            items[i] = item
        }
        let copyEntry = [...state.entry]
        let entryItem = [...copyEntry[index]]
        entryItem = items
        copyEntry[index] = entryItem
        setState({ ...state, entry: copyEntry })
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSetChange = (type, index) => {
        if (type === "remove") {
            let items = [...state.entry]
            let item = items[index]
            if (item.length > 1) {
                item.pop()
                items[index] = item
                setState({ ...state, entry: items, disableAddSet: false })
            } else {
                setState({ ...state, disableRemoveSet: true });
            }
        } else if (type === "add") {
            let items = [...state.entry]
            let item = items[index]
            if (item.length < 7) {
                let temp = item[0]
                item.push(temp);
                items[index] = item
                setState({ ...state, entry: items, disableRemoveSet: false })
            } else {
                setState({ ...state, disableAddSet: true });
            }
        }
    }

    const handleWorkoutTextChange = (event) => {
        setState({ ...state, selectedModalSets: parseInt(event.target.value) })
    }

    const handleWorkoutChange = (type) => {
        if (type === "remove") {
            if (state.entry.length !== 0) {
                let items = [...state.entry]
                items.splice([activeStep], 1)
                setState({ ...state, entry: items })
                if (activeStep !== 0) {
                    setActiveStep(activeStep - 1)
                }
                return;
            } else {
                setState({ ...state, disableRemoveWorkout: true })
                return;
            }
        } else if (type === "add") {
            setState({ ...state, workoutModalOpen: true })
            return;
        }
    }

    React.useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                width: (targetRef.current.offsetWidth),
            });
        }
    }, [targetRef])

    // Create Stepper
    React.useEffect(() => {
        // Need to create an object [{ date: "", weight: 0, reps: 0, workout: ""}, {}...]
        if (state.selectedWorkout !== undefined) {
            let temp = [];
            if (state.selectedWorkout.workouts !== undefined) {
                state.selectedWorkout.workouts.map(prop => {
                    let workoutObj = [];
                    for (var i = 0; i < parseInt(prop.sets); i++) {
                        workoutObj.push({
                            workout: (prop.workout.name),
                            date: "",
                            reps: 0,
                            weight: 0
                        });
                    }
                    temp.push(workoutObj);
                })
                setState({ ...state, entry: temp })
            } else {
                setState({ ...state, entry: temp })
            }
        } else {
            setState({ ...state, entry: undefined })
        }
    }, [state.selectedWorkout])

    const handleModalClose = () => {
        setState({ ...state, modalOpen: false, selectedWorkout: undefined, entry: undefined })
        setActiveStep(0)
    }

    const addGymEntryModal = () => {
        return (
            <Modal
                open={state.modalOpen}
                onClose={() => handleModalClose()}
                style={{ overflow: "scroll" }}
            >
                <Card className={classes.modalCard}>
                    <CardContent>
                        <Autocomplete
                            options={
                                props.routine
                            }
                            getOptionLabel={(option) => titleCase(option.routineName)}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            onChange={handleAutoComplete}
                        />
                        <div className={classes.changeWorkout}>
                            <Button
                                style={{ display: state.selectedWorkout === undefined ? "none" : "", marginRight: theme.spacing(2) }}
                                variant="outlined"
                                className={classes.button}
                                onClick={() => handleWorkoutChange("remove")}
                            >
                                Remove Workout
                                            </Button>
                            <Button
                                style={{ display: state.selectedWorkout === undefined ? "none" : "" }}
                                variant="outlined"
                                className={classes.button}
                                onClick={() => handleWorkoutChange("add")}
                            >
                                Add Workout
                                            </Button>
                        </div>
                        {state.selectedWorkout !== undefined && state.entry !== undefined ?
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {state.entry.map((label, index) => (
                                    <Step key={label[0].workout}>
                                        <StepLabel>{titleCase(label[0].workout)}</StepLabel>
                                        <StepContent>
                                            <div className={classes.date}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        label="Date picker dialog"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                        style={{ margin: theme.spacing(2) }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                                <Button
                                                    disabled={state.disableRemoveSet}
                                                    variant="outlined"
                                                    className={classes.button}
                                                    onClick={() => handleSetChange("remove", index)}
                                                    style={{ marginRight: theme.spacing(2) }}
                                                >
                                                    Remove Set
                                            </Button>
                                                <Button
                                                    disabled={state.disableAddSet}
                                                    variant="outlined"
                                                    className={classes.button}
                                                    onClick={() => handleSetChange("add", index)}
                                                >
                                                    Add Set
                                            </Button>
                                            </div>
                                            <EntryContent
                                                entry={label}
                                                maxLength={state.entry.length}
                                                index={index}
                                                handleNext={(obj, index, type) => handleNext(obj, index, type)}
                                                handleBack={(obj, index, type) => handleBack(obj, index, type)}
                                                name={label[0].workout}
                                            />
                                            <Snackbar
                                                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbarCompletedOpen} autoHideDuration={5000} onClose={() => setSnackbarCompletedOpen(false)}
                                                message={"Form incomplete"}
                                            />
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper> : null}
                    </CardContent>
                    <Modal
                        open={state.workoutModalOpen}
                        onClose={() => setState({ ...state, workoutModalOpen: false, selectedModalWorkout: undefined })}
                        style={{ overflow: "scroll" }}
                    >
                        <Card className={classes.modalCard}>
                            <CardContent>
                                <Autocomplete
                                    options={
                                        props.workout
                                    }
                                    getOptionLabel={(option) => titleCase(option.name)}
                                    renderInput={(params) => <TextField {...params} label="Workouts" variant="outlined" />}
                                    onChange={handleWorkoutAutoComplete}
                                />
                                <TextField type="number" placeholder="Number of sets" name="sets" variant="standard"
                                    onChange={handleWorkoutTextChange} style={{ padding: "16px" }}
                                    InputProps={{ endAdornment: <InputAdornment position="end">Sets</InputAdornment>, }} defaultValue={0} />
                                <Button
                                    variant="outlined"
                                    className={classes.addWorkoutModalButton}
                                    onClick={() => setState({ ...state, workoutModalOpen: false, selectedModalWorkout: undefined })}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.addWorkoutModalButton}
                                    onClick={handleAddWorkout}
                                >
                                    Add Workout
                                </Button>
                                <Snackbar
                                    open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                                    message={snackbarMessage}
                                />
                            </CardContent>
                        </Card>
                    </Modal>
                </Card>
            </Modal >
        );
    }

    const getMostRecent = () => {
        let recentDate = moment('2010-10-20');
        props.entries.map(entry => {
            if (recentDate.isBefore(entry.date)) {
                recentDate = moment(entry.date);
            }
        })
        return recentDate;
    }

    const getPrevLiftsData = () => {
        let lifts = [];
        const recentDate = getMostRecent();
        //Get all entries with the most recent datae
        props.entries.map(prop => {
            if (recentDate.isSame(moment(prop.date))) {
                lifts.push(prop)
            }
        })
        return lifts
    }

    const getNextWorkout = () => {
        const today = new Date();
        const schedule = props.schedule[0].schedule[moment(new Date()).weekday() - 1];
        if (schedule[Object.keys(schedule)].primary === "") {
            return false;
        } else {
            return schedule[Object.keys(schedule)].primary
        }
    }

    const getRoutineFromId = (id) => {
        let temp = null
        props.routine.map(prop => {
            if (prop.id === id) {
                temp = prop;
            }
        })
        return temp;
    }

    const getWorkoutFromId = (id) => {
        let temp = null
        props.workout.map(prop => {
            if (prop.id === id) {
                temp = prop;
            }
        })
        return temp;
    }

    if (props.entries !== undefined && props.schedule !== undefined) {
        return (
            <Grid
                container
                spacing={5}
            >
                <Typography className={classes.typo} variant="h5" component="h1">Music</Typography>
                <Grid item xs={7} ref={targetRef}>
                    <MediaPlayer
                        theme={props.theme}
                        mode={"dash"}
                    />
                </Grid>
                <Grid item xs={3} >
                    <Card>
                        <CardActionArea onClick={() => setState({ ...state, modalOpen: true })}>
                            <CardContent>
                                <div className={classes.cardColumn}>
                                    <AddToPhotosIcon size="large" style={{ marginRight: "32px" }} />
                                    <Typography gutterBottom variant="body1" component="h2"> Add Gym Entry </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    {addGymEntryModal()}
                </Grid>
                <Typography className={classes.typo} variant="h5" style={{ paddingTop: theme.spacing(2) }}>Gym</Typography>
                <Grid item xs={5}>
                    <Card style={{ height: "100%" }}>
                        <CardContent>
                            <div className={classes.cardColumn}>
                                <InsertInvitationIcon style={{ marginRight: "16px" }} />
                                <Typography gutterBottom variant="body1" component="h2"> Next Workout </Typography>
                            </div>
                            {getNextWorkout() === false ?
                                <Typography variant="subtitle1" color="textSecondary" component="h3" className={classes.subTypo} >
                                    There are no workouts planned for today. Manage routines in Manage Data menu.
                                </Typography>
                                : <div>
                                    <Typography variant="subtitle1" color="textSecondary" component="h3" className={classes.subTypo} >
                                        Workout routine for {moment(new Date()).format("dddd")} is : {titleCase(getRoutineFromId(getNextWorkout()).routineName)}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={7}>
                                            <Typography variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                Workout Name:
                                            </Typography>
                                            {getRoutineFromId(getNextWorkout()).workouts.map((prop, index) => {
                                                return (
                                                    <Typography key={prop.workout + index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                        {(index + 1)} : {titleCase(getWorkoutFromId(prop.workout).name)}
                                                    </Typography>
                                                );
                                            })}
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                Sets: / Reps:
                                            </Typography>
                                            {getRoutineFromId(getNextWorkout()).workouts.map((prop, index) => {
                                                return (
                                                    <Typography key={index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                        Sets: {prop.sets} / Reps: {prop.reps}
                                                    </Typography>
                                                );
                                            })}
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={5} >
                    <Card style={{ height: "100%", background: props.theme.colors.primary }}>
                        <CardContent >
                            <div className={classes.cardColumn}>
                                <InsertInvitationIcon style={{ marginRight: "16px" }} />
                                <Typography gutterBottom variant="body1" component="h2"> Previous Weights </Typography>
                            </div>
                            {props.entries === undefined ?
                                <Typography gutterBottom variant="body1" component="h2"> No Gym entries... Go hit the gym... </Typography>
                                :
                                <div>
                                    <Typography variant="subtitle1" color="textSecondary" component="h3" className={classes.subTypo} >
                                        Most recent session on : {getMostRecent().format("MMMM Do dddd")} {console.log(getPrevLiftsData())}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={7}>
                                            <Typography variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                Workout Name:
                                     </Typography>
                                            {getPrevLiftsData().map((prop, index) => {
                                                return (
                                                    <Typography key={prop.workout + index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                        {(index + 1)} : {titleCase(getWorkoutFromId(prop.workout).name)}
                                                    </Typography>
                                                );
                                            })}
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                Weight: / Reps:
                                     </Typography>
                                            {getPrevLiftsData().map((prop, index) => {
                                                return (
                                                    <Typography  variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                                         {prop.weight} / {prop.reps}
                                                    </Typography>
                                                );
                                            })}
                                        </Grid>
                                    </Grid>
                                </div>
                            }
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >
        );
    } else {
        return (
            <CircularProgress style={{ position: "relative", top: "15rem", left: "45%" }} color="primary" />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        workout: state.dataReducer.workout,
        entries: state.dataReducer.entries,
        routine: state.dataReducer.allRoutines,
        schedule: state.dataReducer.schedule
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEntries: (entry) => dispatch(addEntries(entry)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashContainer)