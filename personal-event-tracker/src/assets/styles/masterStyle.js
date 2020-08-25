import React from 'react';
import { forwardRef } from 'react';

// import background images
import bg1 from '../images/mountain-scenery-1450082.jpg';
import bg from '../images/black-building-under-white-sky.jpg';
import gymbg from '../images/gym-dumbells.jpg';
import pianobg from '../images/piano.jpg';
import allactbg from '../images/allactivity.jpg';
import noactbg from '../images/noactbg.jpg';

// import icons
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import StraightenIcon from '@material-ui/icons/Straighten';
import BlockIcon from '@material-ui/icons/Block';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import AddBox from '@material-ui/icons/AddBox';
import Check from '@material-ui/icons/Check';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';

const drawerWidthPC = "256px";
const appbarHeight = "64px";
const primaryColor = "rgba(16,88,88,1)";
const activities = [
    {
        name: "All Activities",
        id: "allAct",
        color: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
        icon: CalendarViewDayIcon,
        legends: [
            {
                id: "",
                label: "All activity",
                color: "#f47560"
            },
            {
                id: "",
                label: "Piano",
                color: "#e8c1a0"
            },
            {
                id: "",
                label: "Gym",
                color: "#97e3d5"
            },
            {
                id: "",
                label: "No activity",
                color: "#61cdbb"
            },
        ]
    },
    {
        name: "Piano",
        id: "piano",
        color: ['#e8c1a0'],
        icon: StraightenIcon,
        legends: [
            {
                id: "",
                label: "Piano",
                color: "#e8c1a0"
            }
        ]
    },
    {
        name: "Gym",
        id: "gym",
        color: ['#97e3d5'],
        icon: FitnessCenterIcon,
        legends: [
            {
                id: "",
                label: "Gym",
                color: "#97e3d5"
            }
        ]
    },
    {
        name: "No Activities",
        id: "noAct",
        color: ['#61cdbb'],
        icon: BlockIcon,
        legends: [
            {
                id: "",
                label: "No Activities",
                color: "#61cdbb"
            }
        ]
    },
]

const icons = {
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)
}

export {
    drawerWidthPC,
    bg1,
    bg,
    primaryColor,
    appbarHeight,
    activities,
    gymbg,
    pianobg,
    allactbg,
    noactbg,
    icons
}