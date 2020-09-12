import React from 'react';

import firebase from 'firebase';

import MaterialTable from 'material-table';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { prev, played, next, pause, play, loop } from '../redux/actions/mediaPlayerActions.js';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// import icons
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import LoopIcon from '@material-ui/icons/Loop';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

import { icons } from '../assets/styles/masterStyle.js';

import styles from '../assets/styles/components/mediaplayerStyle.js';

const useStyle = makeStyles(styles);

export default function MediaPlayer(props) {
    const classes = useStyle();
    const dispatch = useDispatch();
    const player = useSelector((reducer) => reducer.playerReducer)
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
    const dbRefObj = firebase.database().ref().child('musicLinks').on('value', snap => console.log(snap.val()))

    // init states
    const [expanded, setExpanded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleChangeMusic = (control) => {
        if (control === "prev" && player.index !== 0 && player.playing <= 0.1) {
            dispatch(prev(player.index));
            dispatch(played(0));
        } else if (control === "prev" && player.index !== 0 && player.playing > 0.1) {
            dispatch(played(0));
        } else if (control === "next" && player.index !== dbRefObj.length) {
            dispatch(next(player.index));
            dispatch(played(0));
        }
    }
    const handlePlayPause = () => {
        if (player.playing === true) {
            dispatch(pause());
        } else {
            dispatch(play());
        }
    }
    const handleLoop = () => {
        dispatch(loop());
    }

    const displayMusicLibrary = () => {
        return (
            <Grid container direction="column">
                <Grid item>
                    <MaterialTable
                        columns={[
                            { title: 'Group', field: 'group' },
                            { title: 'Name', field: 'name' },
                            { title: 'Composer', field: 'composer' },
                        ]}
                        data={
                            dbRefObj.map((music) => {
                                return {
                                    group: music.group,
                                    name: music.name,
                                    composer: music.subtitle
                                }
                            })
                        }
                        options={{
                            showTitle: false,
                            // rowStyle: rowData => ({
                            //     backgroundColor:
                            //         state.pianoSelected &&
                            //             rowData.tableData.id === props.currMusicIndex ? props.theme.colors.primary : "#fff"
                            // })
                        }}
                        icons={icons}
                    // onRowClick={(event, rowData) => {
                    //     if (rowData.tableData.id === state.pianoSelectedRowId) {
                    //         setState({ ...state, pianoSelected: false, pianoSelectedRowId: null });
                    //     } else {
                    //         props.handleMusicIndexChange(rowData.tableData.id);
                    //         setState({ ...state, pianoSelected: true });
                    //     }
                    // }}
                    />
                </Grid>
                <Grid item style={{ display: "flex" }}>
                    <Divider />
                    <Button style={{ marginLeft: "auto", marginTop: "16px" }} color="secondary" size="large" variant="outlined">More Details</Button>
                </Grid>
            </Grid>
        );
    };

    return (
        <Card>
            <Grid container >
                <Grid item xs={7} style={{ display: "flex", flexDirection: "column" }}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="body1" component="h2"> {dbRefObj[player.index].name} </Typography>
                        <Typography variant="subtitle1" color="textSecondary"> {dbRefObj[player.index].subtitle}</Typography>
                        <input
                            type='range' min={0} max={0.999999} step='any'
                            value={player.played}
                            onChange={handleSeekChange}
                            onMouseUp={handleSeekMouseUp}
                            onMouseDown={handleSeekMouseDown}
                            style={{ marginTop: "16px", width: "200px" }}
                        />
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="previous" onClick={() => handleChangeMusic("prev")}>
                            <SkipPreviousIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="play/pause" onClick={() => handlePlayPause()}>
                            {player.playing ? <PauseIcon fontSize="small" className={classes.playIcon} /> : <PlayArrowIcon fontSize="small" className={classes.playIcon} />}
                        </IconButton>
                        <IconButton aria-label="next" onClick={() => handleChangeMusic("next")}>
                            <SkipNextIcon fontSize="small" />
                        </IconButton>
                        <IconButton style={{ marginLeft: "16px" }} onClick={() => handleLoop()}>
                            <LoopIcon fontSize="small" style={{ color: player.loop ? props.theme.colors.primary : "" }} />
                        </IconButton>
                        <Snackbar
                            open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                            message={player.loop ? "Loop Enabled" : "Loop Disabled"}
                        />
                        <IconButton
                            style={{ width: "fit-content", marginLeft: "8px" }}
                            onClick={() => setModalOpen(true)}
                        >
                            <PlaylistPlayIcon fontSize="small" />
                        </IconButton>
                    </div>
                    <Modal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={modalOpen}>
                            {displayMusicLibrary()}
                        </Fade>
                    </Modal>
                </Grid>
                <Grid item xs={5}>
                    <img
                        style={{ height: props.width }}
                        src={`https://img.youtube.com/vi/${dbRefObj[player.index].src}/0.jpg`}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}