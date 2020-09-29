import React from 'react';

import db from '../firebase.js';

import MaterialTable from 'material-table';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { prev, played, next, pause, play, loop, seeking, setData, seekTo } from '../redux/actions/mediaPlayerActions.js';

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

import { connect } from 'react-redux';

import { icons } from '../assets/styles/masterStyle.js';

import styles from '../assets/styles/components/mediaplayerStyle.js';

const useStyle = makeStyles(styles);

const MediaPlayer = ({ playerData, playerIndex, playerPlayed, playerLoop, playerPlaying, prev, played, next, pause, play, loop, seeking, setData, seekTo, theme, mode }) => {
    const classes = useStyle();
    const targetRef = React.useRef();

    // init states
    const [expanded, setExpanded] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [state, setState] = React.useState({
        width: 0
    })

    React.useEffect(() => {
        setSnackbarOpen(playerLoop);
    }, [playerLoop])

    const handleChangeMusic = (control) => {
        if (control === "prev" && playerIndex !== 0 && playerPlayed <= 0.01) {
            prev(playerIndex);
            played(0);
        } else if (control === "prev" && playerPlayed > 0.01) {
            seekTo(0);
        } else if (control === "prev" && playerIndex === 0) {
            seekTo(0);
        } else if (control === "next" && playerIndex !== playerData.length - 1) {
            next(playerIndex);
            played(0);
        }
    }
    const handlePlayPause = () => {
        if (playerPlaying === true) {
            pause();
        } else {
            play();
        }
    }
    const handleLoop = () => {
        loop();
    }
    const handleSeekChange = e => {
        played(parseFloat(e.target.value));
    }
    const handleSeekMouseUp = e => {
        seeking(false);
        seekTo(e.target.value);
    }
    const handleSeekMouseDown = e => {
        seeking(true);
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
        <Card style={{ background: theme.colors.primary, height: mode === "dash" ? "30vh" : "", boxShadow: mode === "dash" ? "" : "0 0 0 0 black" }} ref={targetRef}>
            <Grid container style={{ height: "inherit" }} >
                <Grid item xs={mode === "dash" ? 7 : 12} style={{ display: "flex", flexDirection: "column", height: "inherit" }}>
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="body1" component="h2"> {playerData[playerIndex].title} </Typography>
                        <Typography variant="subtitle1" color="textSecondary"> {playerData[playerIndex].subtitle} </Typography>
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
                            {playerPlaying ? <PauseIcon fontSize="small" className={classes.playIcon} /> : <PlayArrowIcon fontSize="small" className={classes.playIcon} />}
                        </IconButton>
                        <IconButton aria-label="next" onClick={() => handleChangeMusic("next")}>
                            <SkipNextIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleLoop()}>
                            <LoopIcon fontSize="small" className={playerLoop && playerPlaying ? classes.spin : ""} />
                        </IconButton>
                        <Snackbar
                            open={snackbarOpen} autoHideDuration={5000} onClose={() => setSnackbarOpen(false)}
                            message={playerLoop ? "Loop Enabled" : "Loop Disabled"}
                        />
                        {/* <IconButton
                            style={{ width: "fit-content", }}
                            onClick={() => setModalOpen(true)}
                        >
                            <PlaylistPlayIcon fontSize="small" />
                        </IconButton> */}
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
                <Grid item xs={5} style={{ display: mode === "dash" ? "flex" : "none", height: "inherit" }}>
                    <img
                        style={{ height: "inherit", marginLeft: "auto" }}
                        src={`https://img.youtube.com/vi/${playerData[playerIndex].src}/0.jpg`}
                    />
                </Grid>
            </Grid>
        </Card>
    );
}

const mapStateToProps = (state, props) => {
    return {
        playerIndex: state.playerReducer.index,
        playerPlayed: state.playerReducer.played,
        playerLoop: state.playerReducer.loop,
        playerPlaying: state.playerReducer.playing,
        playerData: state.playerReducer.data,
        theme: props.theme,
        mode: props.mode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        play: dispatch(play()),
        pause: dispatch(pause()),
        next: (index) => dispatch(next(index)),
        prev: (index) => dispatch(prev(index)),
        loop: dispatch(loop()),
        played: (value) => dispatch(played(value)),
        seeking: (boolean) => dispatch(seekTo(boolean)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer)