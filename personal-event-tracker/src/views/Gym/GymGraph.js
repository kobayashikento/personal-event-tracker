import React, { useRef, useLayoutEffect } from 'react';

// import recharts
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// import material ui core 
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from '../../assets/styles/views/gym/gymgraphStyle.js';

const useStyles = makeStyles(styles);

export default function DashGraph(props) {
    const classes = useStyles();

    // states
    const targetRef = useRef();
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

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
        } else {
            let tableData = []
            props.data.map((arr) => {
                tableData.push(arr.data)
            })
            return (tableData);
        }
    }

    const getLabel = () => {
        if (props.data.length === 0) {
            return ("No data");
        } else {
            props.data.map((arr) => {
                return (
                    arr.name
                );
            })
        }
    }
    // style

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 5000,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 1500,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
    ]

    return (
        <Paper className={classes.paper} ref={targetRef} >
            <ResponsiveContainer width={dimensions.width} height={dimensions.height} className={classes.container}>
                <LineChart width={730} height={250} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="amt" stroke="#82cd8d" />
                </LineChart>
                {/* <LineChart data={getData()}
                    margin={{ top: 30, right: 50, left: 20, bottom: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis dataKey="weight" domain={['auto', 'auto']} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend height={36} wrapperStyle={{ top: 0, left: 25 }} />
                    <Line name={getLabel()} type="monotone" dataKey="weight" />
                </LineChart> */}
            </ResponsiveContainer>
        </Paper>
    );
}