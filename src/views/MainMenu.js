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
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { setRoutine, setRoutineIndex, setWorkout, setAllRoutine, setEntries, setSchedule } from '../redux/actions/dataAction.js';
import { setData } from '../redux/actions/mediaPlayerActions.js';

import { mainmenuRoutes } from '../routes.js';
import themes from '../assets/data/themes.json';
import MiniPlayer from '../components/MiniPlayer.js';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const useStyles = makeStyles(styles);

const MainMenu = (props) => {
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

    React.useEffect(() => {
        if (Object.keys(props.data).length === 0 && props.data.constructor === Object) {
        } else {
            props.setWorkout(props.data.workout)
            props.setData(props.data.music)
            props.setAllRoutine(props.data.workoutRoutine)
            props.setEntries(props.data.gymEntries)
            props.setSchedule(props.data.workoutSchedule)
        }
    }, [props.data])

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
    const [open, setOpen] = React.useState(false)

    return (
        <MuiThemeProvider theme={muiTheme}>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ top: "40%", left: "10%", right: "10%", margin: "auto" }}
            >
                <Card>
                    <CardContent style={{ display: "flex", alignItems: "center" }}>
                        The website is currently being worked to convert the database from Firebase realtimeDatabase to Firebase Firestore.
                        Any attempt to modify the data will not work.
                        </CardContent>
                </Card>
            </Modal>
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

const mapStateToProps = (state) => {
    return {
        data: state.firestore.ordered
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setWorkout: (workout) => dispatch(setWorkout(workout)),
        setData: (data) => dispatch(setData(data)),
        setAllRoutine: (data) => dispatch(setAllRoutine(data)),
        setEntries: (data) => dispatch(setEntries(data)),
        setSchedule: (data) => dispatch(setSchedule(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "music" }, { collection: "workout" }, { collection: "workoutRoutine" }, { collection: "gymEntries" }, { collection: "workoutSchedule" }
    ])
)(MainMenu)



