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

import { useDispatch, useSelector } from 'react-redux';
import { setRoutine, setRoutineIndex, setWorkout, setAllRoutine, setEntries, setSchedule } from '../redux/actions/dataAction.js';

import { mainmenuRoutes } from '../routes.js';
import firebase from '../firebase.js';
import themes from '../assets/data/themes.json';
import MiniPlayer from '../components/MiniPlayer.js';

const useStyles = makeStyles(styles);

const MainMenu = () => {
    const classes = useStyles();
    const ref = React.createRef();
    const data = useSelector((reducer) => reducer.dataReducer)
    // const dbRefObjUser = db.child('userSetting');
    // const dbRefObjRoutine = db.child('workoutRoutine');
    // const dbRefObjWorkout = db.child('workouts');
    const dispatch = useDispatch();

    let theme;
    themes.forEach(th => {
        if (typeof (th) != undefined) {
            if (th.themeName === "default") {
                theme = th;
            }
        }
    })

    // React.useEffect(() => {
    //     dbRefObjUser.once('value', snap => {
    //         dispatch(setRoutineIndex(snap.val().routineIndex))
    //         dispatch(setRoutine(snap.val().routine[snap.val().routineIndex]))
    //     })
    //     dbRefObjRoutine.once('value', snap => {
    //         dispatch(setAllRoutine(snap.val()))
    //     })

    //     db.child("gymEntries").once('value', snap => {
    //         dispatch(setEntries(snap.val()))
    //     })
    //     db.child("schedule").once('value', snap => {
    //         dispatch(setSchedule(snap.val()))
    //     })
    // }, [])

    // states 
    const [state, setState] = useState({
        // 0 = statistics, 1 = manage data, 2 = workout, 3 = routine
        gymSelectedTab: 0,
        gymSelectedIndex: null,
        activeTheme: theme,
        selectedIndex: 0,
        musicSelected: true,
        musicCurrRow: {},
        musicSelectedRowId: null,
    });

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
                />
                <div className={classes.contentsWrapper}>
                    <MiniPlayer />
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default React.memo(MainMenu);



