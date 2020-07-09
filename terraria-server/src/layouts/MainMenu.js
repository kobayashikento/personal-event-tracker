import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import ResponsiveDrawer from '../components/ReponsiveDrawer.js';
import styles from '../assets/jss/layouts/mainMenuStyle.js';

const useStyles = makeStyles(styles);

export default function MainMenu({...rest}){
    // styles 
    const classes = useStyles(); 
    // states
    const  [color, setColor] = React.useState("green")

    return (
        <div className={classes.wrapper}>
            <ResponsiveDrawer
                routes={routes}
                open={mobileOpen}
                color={color}
                {...rest} 
            />
        </div>
    );
} 



