import React from 'react';

import db from '../firebase.js';

import MaterialTable from 'material-table';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { prev, played, next, pause, play, loop, seeking, setData, seekTo, setImage } from '../redux/actions/mediaPlayerActions.js';

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
    const playerIndex = useSelector((reducer) => reducer.playerReducer.index)
    const playerPlayed = useSelector((reducer) => reducer.playerReducer.played)
    const playerLoop = useSelector((reducer) => reducer.playerReducer.loop)
    const targetRef = React.useRef();

    // init database
    const dbRefObj = db.child('musicLinks');

    // init states
    const [expanded, setExpanded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [state, setState] = React.useState({
        title: "", subtitle: "",
        listLength: 0, width: 0
    })

    React.useEffect(() => {
        dbRefObj.once('value', snap => {
            setState({ ...state, title: snap.val()[player.index].name, subtitle: snap.val()[player.index].subtitle, listLength: snap.val().length, })
            dispatch(setData(snap.val()[player.index].fullUrl))
            dispatch(setImage(snap.val()[player.index].src))
        });
    }, [])

    React.useEffect(() => {
        dbRefObj.once('value', snap => {
            setState({ ...state, title: snap.val()[player.index].name, subtitle: snap.val()[player.index].subtitle })
            dispatch(setData(snap.val()[player.index].fullUrl))
            dispatch(setImage(snap.val()[player.index].src))
        });
    }, [playerIndex])

    React.useEffect(() => {
        setSnackbarOpen(player.loop);
    }, [playerLoop])

    const handleChangeMusic = (control) => {
        if (control === "prev" && player.index !== 0 && player.played <= 0.01) {
            dispatch(prev(player.index));
            dispatch(played(0));
        } else if (control === "prev" && player.played > 0.01) {
            dispatch(seekTo(0));
        } else if (control === "prev" && player.index === 0) {
            dispatch(seekTo("0"));
        } else if (control === "next" && player.index !== state.listLength - 1) {
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
    const handleSeekChange = e => {
        dispatch(played(parseFloat(e.target.value)));
    }
    const handleSeekMouseUp = e => {
        dispatch(seeking(false));
        dispatch(seekTo(e.target.value));
    }
    const handleSeekMouseDown = e => {
        dispatch(seeking(true));
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
                        data={[]
                            // dbRefObj.map((music) => {
                            //     return {
                            //         group: music.group,
                            //         name: music.name,
                            //         composer: music.subtitle
                            //     }
                            // })
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

    React.useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                width: (targetRef.current.offsetWidth),
            });
        }
    }, [targetRef])

    return (
        <Card style={{ background: props.theme.colors.primary, height: props.mode === "dash" ? "30vh" : "" , boxShadow: props.mode === "dash"? "": "0 0 0 0 black"}} ref={targetRef}>
            <Grid container style={{ height: "inherit" }} >
                <Grid item xs={props.mode === "dash" ? 7 : 12} style={{ display: "flex", flexDirection: "column", height: "inherit" }}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="body1" component="h2"> {state.title} </Typography>
                        <Typography variant="subtitle1" color="textSecondary"> {state.subtitle} </Typography>
                        <input
                            type='range' min={0} max={0.999999} step='any'
                            value={playerPlayed}
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
                        <IconButton onClick={() => handleLoop()}>
                            <LoopIcon fontSize="small" style={{ color: player.loop ? props.theme.colors.primary : "" }} />
                        </IconButton>
                        <Snackbar
                            open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                            message={player.loop ? "Loop Enabled" : "Loop Disabled"}
                        />
                        <IconButton
                            style={{ width: "fit-content", }}
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
                <Grid item xs={5} style={{ display: props.mode === "dash" ? "flex" : "none", height: "inherit" }}>
                    <img
                        style={{ height: "inherit", marginLeft: "auto" }}
                        src={`https://img.youtube.com/vi/${player.image}/0.jpg`}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}