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

import { useSelector } from 'react-redux';
import sheetData from '../../assets/data/sheetmusic.json';

import db from '../../firebase.js';

import EntryContent from '../../components/EntryContent.js';

const useStyle = makeStyles(styles);

export default function DashContainer(props) {
    // variables
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const theme = useTheme(styles);
    const targetRef = React.useRef();
    const classes = useStyle();
    const data = useSelector((reducer) => reducer.dataReducer)
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    // states 
    const [state, setState] = React.useState(
        {
            width: "30vh",
            buttonLocation: 0,
            liftsIndex: 0,
            modalOpen: false,
            workoutModalOpen: false,
            selectedWorkout: undefined,
            entry: undefined,
            allEntries: data.entries,
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
            setSnackbarOpen(true)
        } else if (state.selectedModalSets === undefined) {
            setSnackbarOpen(true)
        } else {
            let items = [...state.entry]
            let temp = [];
            for (var i = 0; i < state.selectedModalSets; i++) {
                temp.push({
                    workoutName: state.selectedModalWorkout.name,
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
                    object[i].date = selectedDate.toString()
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
                    if (data.entries === undefined) {
                        console.log("paased")
                        db.child("gymEntries").set(dbEntry);
                        setState({ ...state, modalOpen: false, entry: undefined, selectedWorkout: undefined });
                        setSelectedDate(new Date());
                    } else {
                        const temp = [data.entries];
                        temp.push(dbEntry);
                        db.child("gymEntries").set(temp);
                        setState({ ...state, modalOpen: false, entry: undefined, selectedWorkout: undefined });
                        setSelectedDate(new Date());
                    }
                }
            } else {
                setSnackbarCompletedOpen(true);
            }
        } else {
            let items = [...state.entry[index]]
            for (var i = 0; i < items.length; i++) {
                let item = { ...items[i] }
                object[i].date = selectedDate.toString()
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
            console.log(items)
            if (item.length < 7) {
                let temp = item[0]
                item.push(temp);
                items[index] = item
                console.log(items)
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
            } else {
                setState({ ...state, disableRemoveWorkout: true })
            }
        } else if (type === "add") {
            setState({ ...state, workoutModalOpen: true })
        }
    }

    const handleLiftClick = (direction) => {
        if (direction === "left" && state.liftsIndex !== 0) {
            setState({ ...state, liftsIndex: state.liftsIndex - 1 });
        } else if (direction === "right" && state.liftsIndex !== getPrevLiftsData().length - 1) {
            setState({ ...state, liftsIndex: state.liftsIndex + 1 });
        }
    }

    React.useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                buttonLocation: (targetRef.current.offsetWidth * 0.50),
                sheetHeight: (targetRef.current.offsetWidth * 0.75),
                pageWidth: (targetRef.current.offsetWidth * 0.5),
            });
        }
    }, [targetRef])

    // Create Stepper
    React.useEffect(() => {
        // Need to create an object [{ date: "", weight: 0, reps: 0, workoutName: ""}, {}...]
        if (state.selectedWorkout !== undefined) {
            let temp = [];
            if (state.selectedWorkout.workouts !== undefined) {
                state.selectedWorkout.workouts.map(prop => {
                    let workoutObj = [];
                    for (var i = 0; i < parseInt(prop.sets); i++) {
                        workoutObj.push({
                            workoutName: (prop.workout.name),
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

    const addGymEntryModal = () => {
        return (
            <Modal
                open={state.modalOpen}
                onClose={() => setState({ ...state, modalOpen: false, selectedWorkout: undefined, entry: undefined })}
                style={{ overflow: "scroll" }}
            >
                <Card className={classes.modalCard}>
                    <CardContent>
                        <Autocomplete
                            options={
                                data.allRoutines
                            }
                            getOptionLabel={(option) => titleCase(option.routineName)}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            onChange={handleAutoComplete}
                        />
                        <div>
                            <Button
                                style={{ display: state.selectedWorkout === undefined ? "none" : "" }}
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
                                    <Step key={label[0].workoutName}>
                                        <StepLabel>{titleCase(label[0].workoutName)}</StepLabel>
                                        <StepContent>
                                            <div>
                                                <Button
                                                    disabled={state.disableRemoveSet}
                                                    variant="outlined"
                                                    className={classes.button}
                                                    onClick={() => handleSetChange("remove", index)}
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
                                                />
                                            </MuiPickersUtilsProvider>
                                            <EntryContent
                                                entry={label}
                                                maxLength={state.entry.length}
                                                index={index}
                                                handleNext={(obj, index, type) => handleNext(obj, index, type)}
                                                handleBack={(obj, index, type) => handleBack(obj, index, type)}
                                                name={label[0].workoutName}
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
                                        data.workout
                                    }
                                    getOptionLabel={(option) => titleCase(option.name)}
                                    renderInput={(params) => <TextField {...params} label="Workouts" variant="outlined" />}
                                    onChange={handleWorkoutAutoComplete}
                                />
                                <TextField type="number" placeholder="Number of sets" name="sets" variant="standard"
                                    onChange={handleWorkoutTextChange}
                                    InputProps={{ endAdornment: <InputAdornment position="end">Sets</InputAdornment>, }} defaultValue={0} />
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    onClick={() => setState({ ...state, workoutModalOpen: false, selectedModalWorkout: undefined })}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outlined"
                                    className={classes.button}
                                    onClick={handleAddWorkout}
                                >
                                    Add Workout
                                </Button>
                                <Snackbar
                                    open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                                    message={"Select a workout"}
                                />
                            </CardContent>
                        </Card>
                    </Modal>
                </Card>
            </Modal >
        );
    }

    const getMostRecent = (props) => {
        let recentDate = moment('2010-10-20');
        let recentEntry = null;
        props.data.map(data => {
            if (recentDate.isBefore(data.date)) {
                recentDate = moment(data.date);
                recentEntry = data;
            }
        })
        return recentEntry;
    }

    const getPrevLiftsData = () => {
        let lifts = [];
        // workoutRoutine[0].workouts.map(workout => {
        //     let temp = null;
        //     gymData.map(props => {
        //         if (workout.workout.name === props.workout.name) {
        //             temp = getMostRecent(props);
        //         }
        //     })
        //     lifts.push({
        //         name: workout.workout.name,
        //         data: temp
        //     })
        // })
        return lifts;
    }

    return (
        <Grid
            container
            spacing={5}
        >
            <Typography className={classes.typo} variant="h5" component="h1">Music</Typography>
            <Grid item xs={7} ref={targetRef}>
                <MediaPlayer
                    theme={props.theme}
                    width={state.width}
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
                        <Typography variant="subtitle1" color="textSecondary" component="h3" className={classes.subTypo} >
                            Next workout day is : {titleCase(data.routine.routineName)}
                        </Typography>
                        <Grid container>
                            <Grid item xs={7}>
                                {data.routine.workouts.map((routine, index) => {
                                    return (
                                        <Typography key={routine.workout.name + index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                            {(index + 1)} : {titleCase(routine.workout.name)}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                            <Grid item xs={5}>
                                {data.routine.workouts.map((routine, index) => {
                                    return (
                                        <Typography key={index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                            Sets: {routine.sets} / Reps: {routine.reps}
                                        </Typography>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            {/* <Grid item xs={4} >
                <Card style={{ height: "100%" }}>
                    <CardContent style={{ height: "100%" }}>
                        <div className={classes.cardColumn}>
                            <Grid container>
                                <Grid item xs={12} style={{ display: "inline-flex" }}>
                                    <HistoryIcon style={{ marginRight: "16px" }} />
                                    <Typography gutterBottom variant="body1" component="h2"> Previous Lifts </Typography>
                                </Grid>
                                <Grid item xs={12} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                                    <IconButton onClick={() => handleLiftClick('left')}>
                                        <ChevronLeftIcon fontSize="small" />
                                    </IconButton>
                                    <Typography variant="body1" component="h1" style={{ textAlign: "center", marginLeft: theme.spacing(2), marginRight: theme.spacing(2) }}>
                                        {titleCase(getPrevLiftsData()[state.liftsIndex].name)}
                                    </Typography>
                                    <IconButton onClick={() => handleLiftClick('right')}>
                                        <ChevronRightIcon fontSize="small" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </div>
                        {getPrevLiftsData()[state.liftsIndex].data === null ?
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
                                <Typography display="inline" gutterBottom variant="h5" component="h1">
                                    No Data
                                 </Typography>
                            </div> : <div>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
                                    <Typography display="inline" gutterBottom variant="h5" component="h1">
                                        {getPrevLiftsData()[state.liftsIndex].data.weight} lbs
                                         </Typography>
                                    <Typography display="inline" style={{ marginLeft: "8px" }} variant="subtitle1" color="textSecondary">
                                        / {getPrevLiftsData()[state.liftsIndex].data.rep} reps
                                            </Typography>
                                </div>
                                <Typography style={{ textAlign: "center", marginTop: "2rem" }} variant="subtitle1" color="textSecondary">
                                    Last Workout: {getPrevLiftsData()[state.liftsIndex].data.date}
                                </Typography>
                            </div>
                        }
                    </CardContent>
                </Card>
            </Grid> */}
            <Grid item xs={3}>
                {/* <Card>
                        <CardActionArea onClick={() => handleCardClick(2)}>
                            <CardContent>
                                <div className={classes.cardColumn}>
                                    <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                    <Typography gutterBottom variant="h5" component="h2"> Quick Progress Check</Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card> */}
            </Grid>
        </Grid >
    );
}