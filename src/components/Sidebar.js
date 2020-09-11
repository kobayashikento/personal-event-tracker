import React from 'react';

// import material-ui/cores from MUI 
import Typography from '@material-ui/core/Typography';
import { Hidden, Drawer } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar';

// import styles from MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LoopIcon from '@material-ui/icons/Loop';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

// import files 
import styles from '../assets/styles/components/sidebarStyle.js';
import drawerItems from './list/DrawerList.js';
import Appbar from '../components/Appbar.js';

import musicData from '../assets/data/musicLibrary.json';

const useStyles = makeStyles(styles);

export default function SideBar(props) {
    const styleProps = {
        color: props.theme.colors.primary
    }
    const classes = useStyles(styleProps);
    const theme = useTheme(styles);

    const [state, setState] = React.useState({
        snackbarOpen: false,
        loop: false,
        playing: false,
        played: 0,
        seeking: false
    });
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // music player handle functions 
    const handleSeekMouseDown = e => {
        setState({ ...state, seeking: true })
    }
    const handleSeekChange = e => {
        setState({ ...state, played: parseFloat(e.target.value) })
    }
    const handleSeekMouseUp = e => {
        setState({ ...state, seeking: false })
        ref.current.seekTo(parseFloat(e.target.value))
    }
    const handleLoop = () => {
        setState({ ...state, loop: !state.loop })
    }
    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing })
    }
    const handleEnded = () => {
        setState({ ...state, playing: false })
    }
    const handleProgress = event => {
        if (!state.seeking) {
            setState({ ...state, played: event.played })
        }
    }
    const handleMusicIndexChange = (row) => {
        setState({ ...state, currMusicIndex: row, playing: false, played: 0 });
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    // Create the componenets for the media player 
    const mediaPlayer = () => {
        return (
            <div style={{ marginTop: "auto", marginBottom: "22px" }}>
                <Typography variant="body1" component="h2" style={{ paddingLeft: "32px" }}> {musicData[props.currMusicIndex].name} </Typography>
                <Typography variant="subtitle2" color="textSecondary" style={{ paddingLeft: "32px" }}> {musicData[props.currMusicIndex].subtitle}</Typography>
                <input
                    type='range' min={0} max={0.999999} step='any'
                    value={props.played}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                    onMouseDown={handleSeekMouseDown}
                    style={{ marginTop: "8px", width: "160px", marginLeft: "32px" }}
                />
                <div className={classes.controls}>
                    <IconButton aria-label="previous" onClick={() => props.handleChangeMusic("prev")}>
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause" onClick={() => props.handlePlayPause()}>
                        {props.playing ? <PauseIcon className={classes.playIcon} /> : <PlayArrowIcon className={classes.playIcon} />}
                    </IconButton>
                    <IconButton aria-label="next" onClick={() => props.handleChangeMusic("next")}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleLoop()}>
                        <LoopIcon style={{ color: props.loop ? "#FFFFFF" : "" }} />
                    </IconButton>
                    <Snackbar
                        open={state.snackbarOpen} autoHideDuration={5000} onClose={() => setState({ ...state, snackbarOpen: false })}
                        message={props.loop ? "Loop Enabled" : "Loop Disabled"}
                    />
                </div>
            </div>
        );
    }

    <prop.component
    {...props}
    dbRefObj={dbRefObj}
    tabIndex={state.gymSelectedTab}
    theme={state.activeTheme}
    handleListItemClick={(index) => handleListItemClick(index)}
    handleChange={(theme) => changeActiveTheme(theme)}
    handleTabChange={(index) => handleTabChange(index)}
    handleChangeMusic={(control) => handleChangeMusic(control)}
    handlePlayPause={() => handlePlayPause()}
    handleLoop={() => handleLoop()}
    currMusicIndex={state.currMusicIndex}
    musicSelected={state.musicSelected}
    playing={state.playing}
    loop={state.loop}
    handleMusicIndexChange={(index) => handleMusicIndexChange(index)}
    played={state.played}
    handleSeekMouseDown={(e) => handleSeekMouseDown(e)}
    handleSeekChange={(e) => handleSeekChange(e)}
    handleSeekMouseUp={(e) => handleSeekMouseUp(e)}
/>}

    return (
        <div className={classes.wrapper}>
            <ReactPlayer
                ref={ref}
                width="0"
                height="0"
                playing={state.playing}
                url={musicData[state.currMusicIndex].fullUrl}
                onEnded={() => handleEnded()}
                loop={state.loop}
                onProgress={handleProgress}
            />
            <Appbar
                routes={props.routes}
                theme={props.theme}
                handleDrawerToggle={() => handleDrawerToggle()}
            />
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="permanent"
                    open
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    style={{ zoom: "0.9" }}
                >
                    <Typography variant="h6" component="h1" style={{ color: props.theme.colors.secondary }} className={classes.sidebarTitle}>
                        Record Keeper
                    </Typography>
                    {drawerItems(props)}
                    {window.location.pathname === "/main-menu/dashboard" ? null : mediaPlayer()}
                </Drawer>
            </Hidden>
            <Hidden smUp implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Typography
                        className={classes.sidebarTitle}
                        variant="h6"
                    >
                        Record Keeper
                    </Typography>
                    {drawerItems(props)}
                </Drawer>
            </Hidden>
        </div>
    );
}