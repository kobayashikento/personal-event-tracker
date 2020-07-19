import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

// import styles
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import Sidebar from './Sidebar.js';
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

    const getPathName = (path) => {
        routes.map(prop => {
            return (
                <Typography
                    variant="h6"
                    noWrap
                    className={classes.appText}
                >
                    {console.log((path===prop.path))}
                    {(path===prop.path?prop.name:null)}
                </Typography>
            )
        })
    };

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.wrapper}>
                <AppBar
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar>
                        {getPathName(window.location.pathname)}
                    </Toolbar>
                </AppBar>
                <Sidebar
                    routes={routes}
                />
                {/* {switchRoutes} */}
            </div>
        </MuiThemeProvider>
    );
}



