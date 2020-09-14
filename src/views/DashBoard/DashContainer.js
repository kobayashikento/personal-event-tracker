import React from 'react';
import { pdfjs } from 'react-pdf';
import moment from 'moment';
import db from '../../firebase.js';

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

import gymData from '../../assets/data/gymData.json';
import { useSelector } from 'react-redux';
import sheetData from '../../assets/data/sheetmusic.json';

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
            selectedWorkout: { workouts: [] }
        }
    );
    const handleAutoComplete = (event, values) => {
        setState({ ...state, selectedWorkout: values.prop })
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

    const getEntryData = () => {
        let temp = [];
        state.selectedWorkout.workouts.map(prop => {
            for (var i = 0; i < parseInt(prop.sets); i++) {
                temp.push({
                    workout: titleCase(prop.workout.name),
                    weight: 0,
                    reps: 0
                })
            }
        })
        return temp;
    }

    const addGymEntryModal = () => {
        return (
            <Modal
                open={state.modalOpen}
                onClose={() => setState({ ...state, modalOpen: false })}
            >
                <Card className={classes.modalCard}>
                    <CardContent>
                        <Autocomplete
                            options={
                                data.allRoutines.map(props => {
                                    return { prop: props }
                                })
                            }
                            getOptionLabel={(option) => titleCase(option.prop.routineName)}
                            renderInput={(params) => <TextField {...params} label="Routines" variant="outlined" />}
                            onChange={handleAutoComplete}
                        />
                        <MaterialTable
                            columns={[
                                { title: "Workout", field: "workout", editable: 'never', defaultGroupOrder: 0},
                                { title: "Weight", field: "weight", type: "numeric", validate: rowData => rowData.weight > 0 },
                                { title: "Reps", field: "reps", type: "numeric", validate: rowData => rowData.reps > 0 }
                            ]}
                            data={getEntryData()}
                            icons={icons}
                            options={{
                                showTitle: false,
                                grouping: false,
                                sorting: false,
                                draggable: false
                            }}
                            cellEditable={{
                                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                  return new Promise((resolve, reject) => {
                                    setTimeout(resolve, 1000);
                                  });
                                }
                              }}
                        />
                    </CardContent>
                </Card>
            </Modal>
        );
    }

    const displaySheetLibrary = () => {
        return (
            <Grid container direction="column">
                <Grid item>
                    <MaterialTable
                        style={{ width: "100%" }}
                        columns={state.sheetColumns}
                        data={
                            sheetData.map((sheet) => {
                                return {
                                    name: sheet.name,
                                    composer: sheet.composer
                                }
                            })
                        }
                        options={{
                            showTitle: false,
                            rowStyle: rowData => ({
                                backgroundColor:
                                    state.sheetSelected &&
                                        rowData.tableData.id === state.sheetIndex ? props.theme.colors.primary : "#fff"
                            })
                        }}
                        icons={icons}
                        onRowClick={(event, rowData) => {
                            setState({ ...state, sheetCurrentRow: rowData });
                            if (rowData.tableData.id === state.pianoSelectedRowId) {
                                setState({ ...state, sheetSelected: false });
                                setState({ ...state, sheetSelectedRowId: null });
                            } else {
                                setState({ ...state, sheetSelected: true });
                                setState({ ...state, sheetIndex: rowData.tableData.id });
                            }
                        }}
                    />
                </Grid>
                <Grid item style={{ display: "flex" }}>
                    <Divider />
                    <Button style={{ marginLeft: "auto", marginTop: "16px" }} color="secondary" size="large" variant="outlined">More Details</Button>
                </Grid>
            </Grid>
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
            <Grid item xs={4} >
                <Card style={{ height: "100%" }}>
                    {/* <CardContent style={{ height: "100%" }}>
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
                    </CardContent> */}
                </Card>
            </Grid>
            <Grid item xs={3}>
                <Card>
                    <CardActionArea onClick={() => setState({ ...state, modalOpen: true })}>
                        <CardContent>
                            <div className={classes.cardColumn}>
                                <AddToPhotosIcon size="large" style={{ marginRight: "32px" }} />
                                <Typography gutterBottom variant="body1" component="h2"> Add a Gym Entry </Typography>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
                {addGymEntryModal()}
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