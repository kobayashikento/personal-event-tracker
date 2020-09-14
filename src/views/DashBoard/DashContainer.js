import React from 'react';
import { pdfjs } from 'react-pdf';
import moment from 'moment';
import firebase from 'firebase';

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
import IconButton from '@material-ui/core/IconButton';

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
import musicData from '../../assets/data/musicLibrary.json';
import sheetData from '../../assets/data/sheetmusic.json';

const useStyle = makeStyles(styles);

export default function DashContainer(props) {
    // variables
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const theme = useTheme(styles);
    const targetRef = React.useRef();
    // styles 
    const classes = useStyle();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    // states 
    const [state, setState] = React.useState(
        {
            width: "30vh",
            buttonLocation: 0,
            liftsIndex: 0,
            currRoutine: undefined,
        }
    );

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

    // init database
    const firebaseConfig = {
        apiKey: "AIzaSyBnytW52-pJjw0dl30OCw48vpa2OvV7S00",
        authDomain: "life-tracker-7fb87.firebaseapp.com",
        databaseURL: "https://life-tracker-7fb87.firebaseio.com",
        projectId: "life-tracker-7fb87",
        storageBucket: "life-tracker-7fb87.appspot.com",
        messagingSenderId: "329127552217",
        appId: "1:329127552217:web:bf3b5d72097e98d7be0ac8",
        measurementId: "G-BQN7TSV44R"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const dbRefObjUser = firebase.database().ref().child('userSetting');
    React.useEffect(() => {
        dbRefObjUser.once('value', snap => {
            console.log(snap.val())
            setState({ ...state, currRoutine: snap.routine})
        })
    }, [])

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
                            {/* Next workout day is : {titleCase(dbRefObjUser.routine[dbRefObjUser.routineIndex].name)} */}
                        </Typography>
                        <Grid container>
                            <Grid item xs={7}>
                                {/* {workoutRoutine[0].workouts.map((routine, index) => {
                                    return (
                                        <Typography key={routine.workout.name + index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                            {(index + 1)} : {titleCase(routine.workout.name)}
                                        </Typography>
                                    );
                                })} */}
                            </Grid>
                            <Grid item xs={5}>
                                {/* {workoutRoutine[0].workouts.map((routine, index) => {
                                    return (
                                        <Typography key={index} variant="subtitle2" color="textSecondary" componenet="h4" className={classes.subTypo}>
                                            Sets: {routine.sets} / Reps: {routine.reps}
                                        </Typography>
                                    );
                                })} */}
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
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.cardColumn}>
                                <AddToPhotosIcon size="large" style={{ marginRight: "32px" }} />
                                <Typography gutterBottom variant="body1" component="h2"> Add a Gym Entry </Typography>
                            </div>
                        </CardContent>
                    </CardActionArea>
                </Card>
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