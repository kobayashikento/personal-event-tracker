import React from 'react';

// import material ui cores 
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import styles from '../../assets/styles/views/dashboardStyle.js';
import DashContainer from './DashContainer.js';
import DashGraph from './DashGraph.js';

// import function used to generate the arrays for the calendar
import gymData from '../../assets/data/gymData.json';

const useStyles = makeStyles(styles);

export default function DashBoardView(props) {
    const classes = useStyles();

    const [calendarIndex, setCalendarIndex] = React.useState(gymData[0]);

    // set states
    const [currWorkout, setWorkout] = React.useState();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const handleIndexChange = (index) => {
        if (activeIndex === index) {
            setActiveIndex(0);
        } else {
            setActiveIndex(index);
        }
    }

    return (
        <div className={classes.container}>
            <section className={"section", classes.section}>
                <div className={"square", classes.square }>
                    <DashContainer
                        theme={props.theme}
                        handleIndexChange={(index) => handleIndexChange(index)}
                    />
                </div>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        {(activeIndex === 1) &&
                            <DashGraph
                                gymData={gymData[0]}
                            />
                        }
                    </div>
                    <div className="wide-rect">

                    </div>
                </div>
            </section>
        </div>
    );
}