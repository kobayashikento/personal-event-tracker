import { createMuiTheme } from '@material-ui/core/styles';

import bg1 from '../images/mountain-scenery-1450082.jpg';
import bg from '../images/black-building-under-white-sky.jpg';

// import icons
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import StraightenIcon from '@material-ui/icons/Straighten';
import BlockIcon from '@material-ui/icons/Block';

const drawerWidth = "250px";
const appbarHeight = "80px";
const primaryColor = "rgba(16,88,88,1)";
const activities = [
    {
        name: "All Activities",
        color: ['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560'],
        icon: CalendarViewDayIcon,
        legends: [
            {
                label: "All activity",
                color: "#f47560"
            },
            {
                label: "Piano",
                color: "#e8c1a0"
            },
            {
                label: "Gym",
                color: "#97e3d5"
            },
            {
                label: "No activity",
                color: "#61cdbb"
            },
        ]
    },
    {
        name: "Piano",
        color: ['#e8c1a0'],
        icon: StraightenIcon,
        legends: [
            {
                label: "Piano",
                color: "#e8c1a0"
            }
        ]
    },
    {
        name: "Gym",
        color: ['#97e3d5'],
        icon: FitnessCenterIcon,
        legends: [
            {
                label: "Gym",
                color: "#97e3d5"
            }
        ]
    },
    {
        name: "No Activities",
        color: ['#61cdbb'],
        icon: BlockIcon,
        legends: [
            {
                label: "No Activities",
                color: "#61cdbb"
            }
        ]
    },
]

const theme1 = createMuiTheme({
    typography: {
        fontFamily: 'Roboto',
    },
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "rgba(16,88,88,0.8)",
                }
            }
        },
        MuiGrid: {
            "spacing-xs-4": {
                width: "100%",
                margin: "0px"
            }
        }
    }
});

export {
    drawerWidth,
    bg1,
    bg,
    primaryColor,
    appbarHeight,
    theme1,
    activities,
}