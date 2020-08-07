import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useState } from 'react';

// import styles
import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';

// import files 
import Sidebar from '../components/Sidebar.js';
import Appbar from '../components/Appbar.js';
import styles from '../assets/jss/components/mainmenuStyle.js';
import { theme1 } from '../assets/jss/masterStyle.js';

import routes from '../routes.js';

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
    const [activeTheme, setTheme] = useState(theme)
    // theme is an object that follows the themes.json scheme
    const handleChange = (newtheme) => {
        setTheme(newtheme);
    }

    // set it to defualt until a file manager is code

    const switchRoutes = (
        <Switch>
            {routes.map((prop, index) => {
                return (
                    <Route
                        key={index}
                        path={prop.path}
                        render={(props) => <prop.component {...props} theme={theme} handleChange={(theme) => handleChange(theme)} />}
                    >
                    </Route>
                );
            })}
        </Switch>
    );

    let muiTheme = createMuiTheme({
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
        },
    })

    muiTheme = responsiveFontSizes(muiTheme)

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <div className={classes.wrapper}>
                {/* Remove Appbar for now */}
                {/* <Appbar
                    routes={routes}
                /> */}
                <Sidebar
                    routes={routes}
                    theme={activeTheme}
                />
                <div className={classes.contentsWrapper}>
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
}



