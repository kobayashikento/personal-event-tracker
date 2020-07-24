import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';

import styles from '../assets/jss/views/gymStyle.js';

const useStyles = makeStyles(styles);

export default function GymView(){
    const classes = useStyles();
    return (
        <div>
            HELLO
            </div>
    );
}