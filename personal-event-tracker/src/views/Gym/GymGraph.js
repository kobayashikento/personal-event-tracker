import React from 'react';

// import recharts
import {
    ScatterChart, XAxis, YAxis, Scatter, Tooltip, Legend,
} from 'recharts';

// import material ui core 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import styles from '../../assets/styles/views/gym/gymgraphStyle.js';

const useStyles = makeStyles(styles);

export default function DashGraph(props) {
    const classes = useStyles();

    // function that selects data based on the selected workout and date range 
    const filteredByDate = props.data.map(workout => {
        return {
            name: workout.name,
            workoutdata:
                workout.data.map(data => {
                    if (moment(data.date).isBetween(props.start, props.end)) {
                        return {
                            data
                        };
                    }
                })
        };
    })

    const getData = () => {
        if (filteredByDate.length === 0) {
            return (
                <Scatter
                    data={[
                        {
                            "time": moment().subtract(2, 'days').valueOf(),
                            "value": 0
                        },
                        {
                            "time": moment().subtract(1, 'days').valueOf(),
                            "value": 0
                        },
                        {
                            "time": moment().valueOf(),
                            "value": 0
                        },
                    ]}
                    line={{ stroke: props.theme.colors.primary }}
                    lineJointType='monotoneX'
                    lineType='joint'
                    legendType="line"
                    name={"No Data"}
                />
            );
        } else {
            return (
                filteredByDate.map((prop, key) => {
                    if (!prop.workoutdata.includes(undefined)) {
                        return (
                            <Scatter
                                key={key}
                                data={
                                    prop.workoutdata.map(workout => {
                                        return {
                                            "time": moment(workout.data.date).valueOf(),
                                            "value": workout.data.weight
                                        }
                                    })
                                }
                                line={{ stroke: props.theme.colors.primary }}
                                lineJointType='monotoneX'
                                lineType='joint'
                                legendType="circle"
                                name={prop.name}
                            />
                        );
                    } else {
                        return (
                            <Scatter
                                data={[]}
                                line={{ stroke: props.theme.colors.primary }}
                                lineJointType='monotoneX'
                                lineType='joint'
                                legendType="line"
                                name={"Not Enough Data for " + prop.name}
                            />
                        );
                    }
                })
            );
        }
    }
    // style

    return (
        <Paper className={classes.paper}>
            {console.log(props.width, props.height)}
            <ScatterChart
                className={classes.chart}
                width={props.width} height={props.height}
                margin={{ top: 30, right: 50, left: 20, bottom: 0 }}>
                <XAxis dataKey='time'
                    domain={['auto', 'auto']}
                    name='Time'
                    tickFormatter={(unixTime) => moment(unixTime).format('MM-DD-YYYY')}
                    type='number'
                />
                <YAxis dataKey='value' name='Weight' domain={['auto', 'auto']} unit="lbs"/>
                {getData()}
                <Tooltip />
                <Legend height={36} wrapperStyle={{ top: 30, left: 25 }} />
            </ScatterChart>
        </Paper>


    );
}