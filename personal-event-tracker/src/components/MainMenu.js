import React from 'react';
import { Switch, Route } from "react-router-dom";

// import styles
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';

// import files 
import Sidebar from './Sidebar.js';
import Appbar from './Appbar.js';
import styles from '../assets/jss/components/mainmenuStyle.js';
import {theme1} from '../assets/jss/masterStyle.js';

import routes from '../routes.js';

const useStyles = makeStyles(styles);

const switchRoutes = (
    <Switch>
        {routes.map((prop, index) => {
            return (
                <Route
                    key={index}
                    path={prop.path}
                    component={prop.component}
                >
                </Route>
            );
        })}
    </Switch>
);

export default function MainMenu() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme1}>
            <CssBaseline />
            <div className={classes.wrapper}>
                <Appbar
                    routes={routes}
                />
                <Sidebar
                    routes={routes}
                />         
                <div className={classes.contentsWrapper}>
                    {switchRoutes}  
                </div>            
            </div>
        </MuiThemeProvider>
    );
}



