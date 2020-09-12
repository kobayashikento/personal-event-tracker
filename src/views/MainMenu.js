import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useState } from 'react';
import ReactPlayer from 'react-player';

// import styles
import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';

// import files 
import Sidebar from '../components/Sidebar.js';
import styles from '../assets/styles/components/mainmenuStyle.js';

import musicData from '../assets/data/musicLibrary.json';

import { mainmenuRoutes } from '../routes.js';

import themes from '../assets/data/themes.json';

const useStyles = makeStyles(styles);

const MainMenu = () => {
    const classes = useStyles();
    const ref = React.createRef();
    let theme;
    themes.forEach(th => {
        if (typeof (th) != undefined) {
            if (th.themeName === "default") {
                theme = th;
            }
        }
    })

    // states 
    const [state, setState] = useState({
        // 0 = statistics, 1 = manage data, 2 = workout, 3 = routine
        gymSelectedTab: 0,
        gymSelectedIndex: null,
        activeTheme: theme,
        selectedIndex: 0,
        currMusicIndex: 0,
        musicSelected: true,
        musicCurrRow: {},
        musicSelectedRowId: null,
        loop: false,
        playing: false,
        seeking: false
    });

    let played = 0

    // media player functions
    const handleChangeMusic = (control) => {
        if (control === "prev" && state.currMusicIndex !== 0) {
            setState({ ...state, currMusicIndex: state.currMusicIndex - 1, });
            played = 0;
        } else if (control === "next" && state.currMusicIndex !== musicData.length) {
            setState({ ...state, currMusicIndex: state.currMusicIndex + 1, });
            played = 0;
        } else if (control === "prev" && state.currMusicIndex === 0) {
            setState({ ...state, currMusicIndex: 0, playing: false });
            played = 0;
        }
    }
    const handleSeekMouseDown = e => {
        setState({ ...state, seeking: true });
    }
    const handleSeekChange = e => {
        played = parseFloat(e.target.value);
    }
    const handleSeekMouseUp = e => {
        setState({ ...state, seeking: false });
        ref.current.seekTo(parseFloat(e.target.value));
    }
    const handleLoop = () => {
        setState({ ...state, loop: !state.loop });
    }
    const handlePlayPause = () => {
        setState({ ...state, playing: !state.playing });
    }
    const handleEnded = () => {
        setState({ ...state, playing: false });
    }
    const handleProgress = event => {
        if (!state.seeking) {
            played = event.played;
        }
    }
    const handleMusicIndexChange = (row) => {
        setState({ ...state, currMusicIndex: row, playing: false });
        played = 0;
    }
    const handleTabChange = (index) => {
        setState({ ...state, gymSelectedTab: index, gymSelectedIndex: index })
    };
    // handle index change for the list on the sidebar 
    const handleListItemClick = (index) => {
        if (index !== 1) {
            setState({ ...state, gymSelectedIndex: null, selectedIndex: index })
        } else {
            setState({ ...state, selectedIndex: index });
        }
    };
    const setGymSelectedIndex = (index) => {
        setState({ ...state, gymSelectedIndex: index, selectedIndex: 1, gymSelectedTab: index })
    };
    // change the theme of the website according to what is seleceted on manage theme menu
    const changeActiveTheme = (newtheme) => {
        setState({ ...state, activeTheme: newtheme });
    }
    // check if the theme exists 
    const checknotChanged = () => {
        themes.map(theme => {
            return (Object.keys(theme) === Object.keys(state.activeTheme));
        })
        return false;
    }

    // init firebase

    const switchRoutes = (
        <Switch>
            {mainmenuRoutes.map((prop, index) => {
                if (prop.name === "Dashboard") {
                    return (
                        <Route
                            key={index}
                            path={prop.path}
                            render={(props) =>
                                <prop.component
                                    {...props}
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
                                    progressBar={<input
                                        type='range' min={0} max={0.999999} step='any'
                                        value={played}
                                        onChange={handleSeekChange}
                                        onMouseUp={handleSeekMouseUp}
                                        onMouseDown={handleSeekMouseDown}
                                        style={{ marginTop: "16px", width: "200px" }}
                                    />}
                                    loop={state.loop}
                                    handleMusicIndexChange={(index) => handleMusicIndexChange(index)}
                                    played={played}
                                    handleSeekMouseDown={(e) => handleSeekMouseDown(e)}
                                    handleSeekChange={(e) => handleSeekChange(e)}
                                    handleSeekMouseUp={(e) => handleSeekMouseUp(e)}
                                />}
                        />
                    )
                } else {
                    return (
                        <Route
                            key={index}
                            path={prop.path}
                            render={() =>
                                <prop.component
                                    tabIndex={state.gymSelectedTab}
                                    theme={state.activeTheme}
                                    handleListItemClick={(index) => handleListItemClick(index)}
                                    handleChange={(theme) => changeActiveTheme(theme)}
                                    handleTabChange={(index) => handleTabChange(index)}
                                    playing={state.playing}
                                />}
                        />
                    );
                }
            })}
        </Switch>
    );

    let muiTheme = createMuiTheme({
        palette: {
            primary: {
                main: state.activeTheme.colors.primary
            },
            secondary: {
                main: state.activeTheme.colors.secondary
            }
        },
        overrides: {
            MuiListItem: {
                root: {
                    "&$selected": {
                        backgroundColor: state.activeTheme.colors.secondary,
                    },
                    "&:hover": {
                        backgroundColor: state.activeTheme.colors.tertiary + "!important",
                    },
                }
            },
        }
    })

    muiTheme = responsiveFontSizes(muiTheme)

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <div className={classes.wrapper}>
                <Sidebar
                    routes={mainmenuRoutes}
                    gymView={state.gymView}
                    theme={state.activeTheme}
                    handleListItemClick={(index) => handleListItemClick(index)}
                    setGymSelectedIndex={(index) => setGymSelectedIndex(index)}
                    selectedIndex={state.selectedIndex}
                    gymSelectedIndex={state.gymSelectedIndex}
                    handleChangeMusic={(control) => handleChangeMusic(control)}
                    handlePlayPause={() => handlePlayPause()}
                    handleLoop={() => handleLoop()}
                    currMusicIndex={state.currMusicIndex}
                    musicSelected={state.musicSelected}
                    playing={state.playing}
                    loop={state.loop}
                    handleMusicIndexChange={(index) => handleMusicIndexChange(index)}
                    played={played}
                    handleSeekMouseDown={(e) => handleSeekMouseDown(e)}
                    handleSeekChange={(e) => handleSeekChange(e)}
                    handleSeekMouseUp={(e) => handleSeekMouseUp(e)}
                />
                <div className={classes.contentsWrapper}>
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
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default React.memo(MainMenu);



