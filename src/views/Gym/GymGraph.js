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

export default function DashGraph(props) {
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
        if (props.selectedData === null) {
            return []
        } else {
            return {
                name: props.selectedData.name,
                workoutdata:
                    props.selectedData.data.map(data => {
                        if (moment(data.date).isBetween(state.selectedStart, state.selectedEnd)) {
                            return {
                                data
                            };
                        }
                    })
            };
        }
    }

    const createData = (array) => {
        let temp = [];
        array.workoutdata.map(workout => {
            if (workout !== undefined) {
                numEntries = numEntries + 1;
                temp.push({
                    "time": moment(workout.data.date).valueOf(),
                    "value": workout.data.weight
                })
            }
        })
        return temp;
    }

    const getScatterData = () => {
        numEntries = 0;
        if (filteredByDate().length === 0) {
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

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
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
                <IconButton style={{ marginRight: "16px" }} onClick={() => handleWeekChange('right')}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
            {getScatterData().props.data.length === 0 ?
                <div>
                    <Typography style={{ marginTop: "25%", textAlign: "center" }} variant="subtitle1" component="h1" color="textSecondary">
                        No Data Available
                        </Typography>
                    <img className={classes.run} src={dog} />
                </div>
                : null}
            {getScatterData().props.data.length === 1 ?
                <div>
                    <Typography style={{ marginTop: "25%", textAlign: "center" }} variant="subtitle1" component="h1" color="textSecondary">
                        No Enough Data Points
                        </Typography>
                    <img className={classes.run} src={dog} />
                </div>
                : null}
            <ResponsiveContainer minHeight={100} width="100%" height="100%">
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
                    <Legend height={36} wrapperStyle={{ top: 10, left: 25 }} />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}