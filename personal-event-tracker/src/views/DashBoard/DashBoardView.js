import React, { Fragment } from 'react';

// import material ui cores 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import styles from '../../assets/styles/views/dashboard/dashboardStyle.js';
import DashContainer from './DashContainer.js';
import DashGraph from './DashGraph.js';

// import function used to generate the arrays for the calendar
import gymData from '../../assets/data/gymData.json';
import workRoutine from '../../assets/data/workoutRoutine.json';
import CountDownTimer from '../../components/CountDownTimer.js';
import InputForm from './GymInputForm.js';

const useStyles = makeStyles(styles);

export default function DashBoardView(props) {
    const classes = useStyles();
    const theme = useTheme(styles);
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    // set states
    // need to have a json file that keeps tracks of current workout day probably a user setting file
    const [activeAccordIndex, setActiveAccordIndex] = React.useState(0);
    const [selectedCell, setSelectedCell] = React.useState(1);
    const [state, setState] = React.useState({ checkedSwitch: false, currGymData: gymData[0], currWorkout: workRoutine[0].workouts[0],
    routine: workRoutine[0] });

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleCellChange = (cell) => {
        setSelectedCell(cell);
    }
    const handleIndexChange = (index) => {
        if (activeAccordIndex === index) {
            setActiveAccordIndex(0);
        } else {
            setActiveAccordIndex(index);
        }
    }
    React.useEffect(() => {
        var gymdata = state.currGymData;
        gymData.map((data) => {
            if (data.workout.name === state.routine.workouts[selectedCell - 1].workout.name) {
                gymdata = data;
            }
        })
        setState({ ...state, currWorkout: state.routine.workouts[selectedCell - 1] });
        setState({ ...state, currGymData: gymdata });
    }, [selectedCell]);

    return (
        <div className={classes.container}>
            <section className={"section", classes.section}>
                <div className={"square", classes.square}>
                    <DashContainer
                        theme={props.theme}
                        handleIndexChange={(index) => handleIndexChange(index)}
                        handleSwitchChange={(event) => handleSwitchChange(event)}
                        state={state}
                        selectedCell={selectedCell}
                        handleCellChange={(cell) => handleCellChange(cell)}
                    />
                </div>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        {(activeAccordIndex === 1) && !state.checkedSwitch && matches &&
                            <DashGraph
                                gymData={state.currGymData}
                            />
                        }
                        {state.checkedSwitch && matches &&
                            <Fragment>
                                <CountDownTimer />
                                <InputForm
                                    workout={state.currWorkout}
                                    routine={state.routine}
                                />
                            </Fragment>
                        }
                    </div>
                    <div className="wide-rect">

                    </div>
                </div>
            </section>
        </div>
    );
}