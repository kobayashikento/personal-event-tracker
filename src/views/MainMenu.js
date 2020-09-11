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

import firebase from 'firebase';

const useStyles = makeStyles(styles);

export default function MainMenu() {
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
    });

    // media player functions
    const handleChangeMusic = (control) => {
        if (control === "prev" && state.currMusicIndex !== 0) {
            setState({ ...state, currMusicIndex: state.currMusicIndex - 1, played: 0 })
        } else if (control === "next" && state.currMusicIndex !== musicData.length) {
            setState({ ...state, currMusicIndex: state.currMusicIndex + 1, played: 0 })
        } else if (control === "prev" && state.currMusicIndex === 0) {
            setState({ ...state, currMusicIndex: 0, played: 0, playing: false })
        }
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
    const dbRefObj = firebase.database()

    const switchRoutes = (
        <Switch>
            {mainmenuRoutes.map((prop, index) => {
                if (prop.name === "Fitness"|| prop.name === "Dashboard") {
                } else {
                    return (
                        <Route
                            key={index}
                            path={prop.path}
                            render={() =>
                                <prop.component
                                    dbRefObj={dbRefObj}
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
                    switchRoutes={}
                />
                <div className={classes.contentsWrapper}>
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
};



