import React from 'react';

// import recharts
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// import material ui core 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from '../../assets/styles/views/dashboard/dashgraphStyle.js';

const useStyles = makeStyles(styles);

export default function DashGraph(props) {

    const classes = useStyles();

    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const getData = () => {
        if (props.data.length === 0) {
            return ([
                {
                    "date": "2020-01-11",
                    "weight": 0
                },
                {
                    "date": "2020-01-12",
                    "weight": 0
                },
                {
                    "date": "2020-01-13",
                    "weight": 0
                },
            ]);
        } else { return "passed" }
    }

    const getLabel = () => {
        if (props.data.length === 0) {
            return ("");
        } else { return "passed" }
    }

    return (
        <Paper className={classes.paper}>
            <ResponsiveContainer >
                <LineChart data={getData()}
                    margin={{ top: 30, right: 50, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis dataKey="weight" domain={['auto', 'auto']} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend height={36} wrapperStyle={{ top: 0, left: 25 }} />
                    <Line name={getLabel()} type="monotone" dataKey="weight" />
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}