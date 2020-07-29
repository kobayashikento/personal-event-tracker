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
        index: 0,
        icon: CalendarViewDayIcon,
    },
    {
        name: "Piano",
        index: 1,
        icon: StraightenIcon,
    },
    {
        name: "Gym",
        index: 2,
        icon: FitnessCenterIcon,
    },
    {
        name: "No Activities",
        index: 3,
        icon: BlockIcon,
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