import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import material ui core 
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';

import styles from '../assets/styles/components/entrycontentStyle.js';


const useStyle = makeStyles(styles);

export default function EntryContent(props) {
    // props, array containing entry objects [{ date: "", weight: 0, reps: 0, workoutName: ""}, {}...]
    const classes = useStyle();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarChangeOpen, setSnackbarChangeOpen] = React.useState(false);
    let data = [];

    const handleChange = (event) => {
        let split = event.target.id.split(" ")
        if (split[1] === "reps") {
            data[split[0]].reps = parseInt(event.target.value)
        } else if (split[1] === "weight") {
            data[split[0]].weight = parseInt(event.target.value)
        }
    }

    function checkComplete() {
        let temp = true;
        data.map(prop => {
            if (prop.reps === 0 || prop.weight === 0) {
                temp = false;
            }
        })
        return temp;
    }

    function checkChanged() {
        let temp = false;
        data.map(prop => {
            if (prop.reps === 0 || prop.weight) {
                temp = true
            }
        })
        return temp;
    }

    const handleNext = (event) => {
        if (!checkComplete()) {
            setSnackbarOpen(true)
        } else {
            props.handleNext(data, props.index)
        }
    }

    const handleBack = (event) => {
        if (checkChanged()) {
            setSnackbarChangeOpen(true)
        }
        props.handleBack(data, props.index)
    }

    return (
        <div>
            {(props.entry !== undefined) ?
                props.entry.map((entry, index) => {
                    data.push({ reps: entry.reps, weight: entry.weight, workoutName: props.name, date: "" })
                    return (
                        <div style={{ display: "flex" }} key={index}>
                            <Typography> Set {index + 1}</Typography>
                            <TextField type="number" placeholder="Weight" name="Weight" variant="standard" id={index + " weight"} onChange={handleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                                }} defaultValue={entry.weight} />
                            <TextField type="number" placeholder="Reps" name="Reps" variant="standard" id={index + " reps"} onChange={handleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Reps</InputAdornment>,
                                }} defaultValue={entry.reps} />
                        </div>
                    )
                }) : null}
            <Button disabled={props.index === 0} onClick={handleBack}>Back</Button>
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
            <Snackbar
                open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}
                message={"Form not complete"}
            />
            <Snackbar
                open={snackbarChangeOpen} autoHideDuration={5000} onClose={() => setSnackbarChangeOpen(false)}
                message={"Changes saved"}
            />
        </div>
    )
}