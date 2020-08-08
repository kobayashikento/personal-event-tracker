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

const drawerWidth = "15vw";
const appbarHeight = "80px";
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

export {
    drawerWidth,
    bg1,
    bg,
    primaryColor,
    appbarHeight,
    activities,
    gymbg,
    pianobg,
    allactbg,
    noactbg
}