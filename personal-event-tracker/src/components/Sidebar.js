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

    const [state, setState] = React.useState({ snackbarOpen: false });
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    const handleLoop = () => {
        setState({ ...state, snackbarOpen: true });
        props.handleLoop();
    }
    const handleSeekMouseDown = e => {
        props.handleSeekMouseDown(e);
    }
    const handleSeekChange = e => {
        props.handleSeekChange(e);
    }
    const handleSeekMouseUp = e => {
        props.handleSeekMouseUp(e);
    }
    const mediaPlayer = () => {
        return (
            <div style={{ marginTop: "auto", marginBottom: "22px" }}>
                <Typography gutterBottom variant="h5" component="h3" style={{ paddingLeft: "32px" }}> {musicData[props.currMusicIndex].name} </Typography>
                <Typography variant="subtitle1" color="textSecondary" style={{ paddingLeft: "32px" }}> {musicData[props.currMusicIndex].subtitle}</Typography>
                <input
                    type='range' min={0} max={0.999999} step='any'
                    value={props.played}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                    onMouseDown={handleSeekMouseDown}
                    style={{ marginTop: "16px", width: "180px", marginLeft: "36px" }}
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

    return (
        <div className={classes.wrapper}>
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
                >
                    <Typography
                        className={classes.sidebarTitle}
                        variant="h5"
                    >
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