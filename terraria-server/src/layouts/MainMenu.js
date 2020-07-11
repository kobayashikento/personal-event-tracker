import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import ResponsiveDrawer from '../components/ResponsiveDrawer.js';
import styles from '../assets/jss/layouts/mainMenuStyle.js';

import routes from "./routes.js"; 

const useStyles = makeStyles(styles);

const switchRoutes = (
    <Switch> 
        {routes.map((prop, key) => {
            return ( 
                <Route
                    path={"/main_menu" + prop.path}
                    // links the path to the specific view
                    component={prop.comdponent}
                    // keys help react identify changed elements 
                    key={key}
                />
            );
        })}
    </Switch>
);

export default function MainMenu({...rest}){
    // styles 
    const classes = useStyles(); 
    // states

    return (
        <div className={classes.wrapper}>
            <ResponsiveDrawer
                routes={routes}
                open={mobileOpen}                
                {...rest} 
            />
        </div>
    );
} 



