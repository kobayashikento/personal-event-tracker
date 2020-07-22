import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import styles from '../assets/jss/components/calendarStyle.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);

export default function App() {
    const classes = useStyles();
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <Calendar
                className={classes.wrapper}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}