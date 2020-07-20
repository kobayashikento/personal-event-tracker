import React from 'react';

// import MUI 
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import assests 
import styles from 'assets/jss/appbarStyle.js';


const useStyles = makeStyles(styles);

export default function Appbar(prop) {
    const classes = useStyles()

    // find the current path name to display on the appbar 
    function currPathName() {
        var path;
        prop.routes.map(route => {
            if (window.location.href.indexOf(route.path) > -1){
                path = route.name;
            }
            return null;
        });
        return path;
    }

    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.appText}>
                    {currPathName()}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}