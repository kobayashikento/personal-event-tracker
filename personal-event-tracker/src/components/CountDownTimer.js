import React from 'react'

import { makeStyles, withStyles } from '@material-ui/styles'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import styles from '../assets/styles/components/countdowntimeStyle.js';

const useStyles = makeStyles(styles);

export default function CountDownTimer(props) {
    const classes = useStyles();
    // states 
    const [timer, setTimer] = React.useState(new Date().setHours(0, 4, 0));
    const [didStart, setStart] = React.useState(false);
    const handleStart = () => {
        setStart(!didStart);
    }

    const id = React.useRef(null);
    const clear = () => {
        window.clearInterval(id.current);
    };

    React.useEffect(() => {
        while (didStart && timer.getMinutes !== 0 && timer.getSeconds !== 0) {
            id.current = window.setInterval(() => {
                setTimer((timer) => timer - 1000);
            }, 1000);
            return () => clear()
        }       
    }, [didStart]);

    React.useEffect(() => {
        if (timer.getMinutes === 0 && timer.getSeconds === 0) {
            clear();
        }
    }, [timer]);

    const StyledTimePicker = withStyles(theme => ({
        root: {
            verticalAlign: "middle",
            textAlignLast: "center",
            width: "100%"
        },
    }))(TimePicker)

    return (
        <Paper elevation={1} className={classes.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StyledTimePicker
                    ampm={false}
                    openTo="minutes"
                    views={["minutes", "seconds"]}
                    format="mm:ss"
                    label="Countdown Timer"
                    value={timer}
                    onChange={setTimer}
                    variant="dialog"
                    inputVariant="outlined"
                />

            </MuiPickersUtilsProvider>
            {!didStart ?
                <Button onClick={handleStart}>Start</Button> :
                <Button onClick={handleStart}>Stop</Button>
            }
            <Button>Reset</Button>
        </Paper>
    );
}