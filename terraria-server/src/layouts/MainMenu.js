import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ResponsiveDrawer from '../components/ReponsiveDrawer.js';
import styles from '../assets/jss/layouts/mainMenuStyle.js';

const useStyles = makeStyles(styles);

export default function MainMenu({...rest}){
    // styles 
    const classes = useStyles(); 

    return (
        <div className={classes.wrapper}>
            <ResponsiveDrawer>
            </ResponsiveDrawer>
        </div>
    );
} 



