import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useState } from 'react';

// import styles
import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';

// import files 
import Sidebar from '../components/Sidebar.js';
import styles from '../assets/styles/components/mainmenuStyle.js';

import { mainmenuRoutes } from '../routes.js';

import themes from '../assets/data/themes.json';
const useStyles = makeStyles(styles);

export default function MainMenu() {
    const classes = useStyles();

    var theme;
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
        gymView: 0,
        gymSelectedIndex: null
    });
    const [activeTheme, setTheme] = useState(theme);
    const [didChange, setChange] = useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleTabChange = (index) => {
        setState({ ...state, gymView: index })
    };
    const setGymSelectedIndex = (index) => {
        setState({ ...state, gymSelectedIndex: index })
    };
    // handle onclick 
    const handleListItemClick = (index) => {
        if (index != 1) {
            setState({ ...state, gymSelectedIndex: null })
        }
        setSelectedIndex(index);
    };
    // theme is an object that follows the themes.json scheme
    const handleChange = (newtheme) => {
        setTheme(newtheme);
    }

    // check if the theme exists 
    const checknotChanged = () => {
        themes.map(theme => {
            return (Object.keys(theme) === Object.keys(activeTheme));
        })
        return false;
    }

    // set it to defualt until a file manager is code

    const switchRoutes = (
        <Switch>
            {mainmenuRoutes.map((prop, index) => {
                return (
                    <Route
                        key={index}
                        path={prop.path}
                        render={(props) =>
                            <prop.component
                                {...props} theme={activeTheme}
                                handleListItemClick={(index) => handleListItemClick(index)}
                                handleChange={(theme) => handleChange(theme)}
                                handleTabChange={(index) => handleTabChange(index)}
                            />}
                    >
                    </Route>
                );
            })}
        </Switch>
    );

    let muiTheme = createMuiTheme({
        palette: {
            primary: {
                main: activeTheme.colors.primary
            },
            secondary: {
                main: activeTheme.colors.secondary
            }
        },
        overrides: {
            MuiListItem: {
                root: {
                    "&$selected": {
                        backgroundColor: activeTheme.colors.secondary,
                    },
                    "&:hover": {
                        backgroundColor: activeTheme.colors.tertiary + "!important",
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
                    theme={activeTheme}
                    handleListItemClick={(index) => handleListItemClick(index)}
                    setGymSelectedIndex={(index) => setGymSelectedIndex(index)}
                    selectedIndex={selectedIndex}
                    gymSelectedIndex={state.gymSelectedIndex}
                />
                <div className={classes.contentsWrapper}>
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
}



