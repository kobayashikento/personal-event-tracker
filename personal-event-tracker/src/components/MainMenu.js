import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

// import styles
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';

// import files 
import Sidebar from './Sidebar.js';
import Header from './Appbar.js';
import styles from '../assets/jss/mainmenuStyle.js';

import routes from '../routes.js';

const useStyles = makeStyles(styles);

const switchRoutes = (
    <Switch>
        {routes.map((prop, index) => {
            return (
                <Route
                    key={index}
                    path={prop.path}
                    render={() => <prop.component />}
                />
            );
        })}
    </Switch>
);

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Roboto',
    },
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "rgba(16,88,88,0.8)",
                },
            }
        }
    }
});

export default function MainMenu() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.wrapper}>
                <Header
                    routes={routes}
                />
                <Sidebar
                    routes={routes}
                />
                {/* {switchRoutes} */}
            </div>
        </MuiThemeProvider>
    );
}



