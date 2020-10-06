import React from 'react';
import {
    titleCase
} from '../../assets/styles/masterStyle.js';

// import recharts
import {
    ScatterChart, XAxis, YAxis, Scatter, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// import material ui core 
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

// import material ui icons 
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import styles from '../../assets/styles/views/gym/gymgraphStyle.js';

import dog from '../../assets/images/15224-cute-doggie.gif';

const useStyles = makeStyles(styles);

export default function GymGraph(props) {
    const classes = useStyles();
    let numEntries = 0;
    //states
    const [state, setState] = React.useState(
        {
            selectedStart: props.start,
            selectedEnd: props.end,
        }
    )

    const handleWeekChange = (direction) => {
        if (direction === 'right' && !state.selectedEnd.isSame(moment())) {
            setState({ ...state, selectedEnd: state.selectedEnd.add(props.amount, props.type) });
            setState({ ...state, selectedStart: state.selectedStart.add(props.amount, props.type) });
        } else if (direction === 'left') {
            setState({ ...state, selectedEnd: state.selectedEnd.subtract(props.amount, props.type) });
            setState({ ...state, selectedStart: state.selectedStart.subtract(props.amount, props.type) });
        }
    }

    // function that selects data based on the selected workout and date range 
    const filteredByDate = () => {
        if (props.data === undefined) {
            return undefined;
        } else if (props.data.length === 0) {
            return [];
        } else {
            return {
                name: props.data[0].name,
                workoutdata:
                    props.data.map(entry => {
                        if (moment(entry.date).isBetween(state.selectedStart, state.selectedEnd)) {
                            return {
                                entry
                            };
                        }
                    })
            };
        }
    }

    //Divide
    const groupByDate = (array) => {
        // getting a data structure thats [{entry: {date: , reps: , weight: , workout: }}, {etnry: }]
        const temp = [];
        array.map(prop => {
            if (prop === undefined || prop === null) {
            } else if (dateExists(prop.entry.date, temp) !== null) {
                temp[dateExists(prop.entry.date, temp)].entries.push(prop.entry)
            } else {
                temp.push(
                    {
                        converDate: moment(prop.entry.date).format('MM-DD-YYYY'),
                        entries: [prop.entry]
                    }
                )
            }
        })
        return temp;
    }

    const dateExists = (date, temp) => {
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].converDate === moment(date).format('MM-DD-YYYY')) {
                return i;
            }
        }
        return null;
    }

    // Get highest lift per date
    const sortHighLift = (groupByDate) => {
        let temp = groupByDate;
        groupByDate.map((prop, index) => {
            let highest = prop.entries[0];
            for (var i = 0; i < prop.entries.length; i++) {
                if (prop.entries[i].weight > highest.weight) {
                    highest = prop.entries[i];
                }
            }
            temp[index].entries = highest
        })
        return temp;
    }

    const allUndefined = (entry) => {
        let temp = true;
        if (filteredByDate() === undefined || filteredByDate().length === 0 || filteredByDate().workoutdata.length === 0) {
        } else {
            filteredByDate().workoutdata.map(prop =>{
                if (prop !== undefined){
                    temp = false;
                }
            })
        }
        return temp;
    }

    const getScatterData = () => {
        numEntries = 0;
        if (filteredByDate() === undefined || filteredByDate().length === 0 || filteredByDate().workoutdata.length === 0 || allUndefined()) {
            return (
                <Scatter
                    data={[]}
                    line={{ stroke: props.theme.colors.primary }}
                    lineJointType='monotoneX'
                    lineType='joint'
                    legendType="line"
                />
            );
        } else {
            return (
                <Scatter
                    data={
                        createData(filteredByDate())
                    }
                    line={{ stroke: props.theme.colors.primary }}
                    lineJointType='monotoneX'
                    lineType='joint'
                    legendType="circle"
                    fill={props.theme.colors.secondary}
                    name={" " + filteredByDate().name}
                />
            );
        }
    }

    const createData = (array) => {
        let temp = [];
        const groupedArray = groupByDate(array.workoutdata)
        const sortedByHigh = sortHighLift(groupedArray)
        sortedByHigh.map(prop => {
            temp.push({
                "time": prop.entries.date,
                "value": prop.entries.weight
            })
        })
        return temp;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", marginTop: "32px", marginLeft: "auto", marginRight: "auto" }}>
                <IconButton style={{ marginLeft: "16px" }} onClick={() => handleWeekChange('left')}>
                    <ChevronLeftIcon />
                </IconButton>
                <div style={{ marginRight: "5vw", marginLeft: "5vw" }}>
                    <Typography variant="h5" component="h1" style={{ textAlign: "center" }}>
                        {state.selectedStart.format('MMMM D')} - {state.selectedEnd.format('MMMM D')}
                    </Typography>
                    <Typography style={{ textAlign: "center", padding: "8px" }} variant="subtitle1" color="textSecondary">
                        {getScatterData().props.data.length} - Total Entries
                    </Typography>
                </div>
                <IconButton disabled={moment(state.selectedEnd).isSameOrAfter(moment(), 'day')} style={{ marginRight: "16px" }} onClick={() => handleWeekChange('right')}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
            {filteredByDate() === undefined ?
                <div>
                    <Typography style={{ marginTop: "25%", textAlign: "center" }} variant="subtitle1" component="h1" color="textSecondary">
                        Please select a workout
                        </Typography>
                    <img className={classes.run} src={dog} />
                </div>
                : filteredByDate().length === 0 ?
                    <div>
                        <Typography style={{ marginTop: "25%", textAlign: "center" }} variant="subtitle1" component="h1" color="textSecondary">
                            No Enough Data Points
                    </Typography>
                        <img className={classes.run} src={dog} />
                    </div> : allUndefined() ?
                        <div>
                            <Typography style={{ marginTop: "25%", textAlign: "center" }} variant="subtitle1" component="h1" color="textSecondary">
                                No Data for this date
                </Typography>
                            <img className={classes.run} src={dog} />
                        </div> :
                        <ResponsiveContainer aspect={1.3} width="100%">
                            <ScatterChart
                                className={classes.chart}
                                margin={{ top: 0, right: 45, left: 24, bottom: 54 }}>
                                <XAxis dataKey='time'
                                    domain={['auto', 'auto']}
                                    name='Time'
                                    tickFormatter={(unixTime) => moment(unixTime).format('MM-DD-YYYY')}
                                    type='number'
                                />
                                <YAxis dataKey='value' name='Weight' domain={['auto', 'auto']} unit="lbs" />
                                {getScatterData()}
                                <Tooltip />
                                <Legend height={36} wrapperStyle={{ top: 10, left: 25 }}
                                />
                            </ScatterChart>
                        </ResponsiveContainer>}
        </div>
    );
}