// import material-ui/icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
//import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import StraightenIcon from '@material-ui/icons/Straighten';
import TuneIcon from '@material-ui/icons/Tune';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

// import views 
import DashBoardView from './views/DashBoard/DashBoardView.js';
import PianoView from './views/PianoView.js';
import GymView from './views/GymView.js';
import ManageThemeView from './views/ManageTheme.js/ManageThemeView.js';

const mainmenuRoutes = [
    {
        path: "/main-menu/dashboard",
        name: "Dashboard",
        component: DashBoardView,
        icon: DashboardRoundedIcon,
    },
    {
        path: "/main-menu/gym",
        name: "Gym",
        component: GymView, 
        icon: FitnessCenterIcon,
    }, 
    {
        path: "/main-menu/piano",
        name: "Piano",
        component: PianoView,
        icon: StraightenIcon,
    },
    {
        path: "/main-menu/theme",
        name: "Manage Theme",
        component: ManageThemeView,
        icon: TuneIcon
    },
]

export default mainmenuRoutes;