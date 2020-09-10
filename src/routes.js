// import material-ui/icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
//import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import TuneIcon from '@material-ui/icons/Tune';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

// import views 
import DashBoardView from './views/DashBoard/DashBoardView.js';
import PianoView from './views/Piano/PianoView.js';
import GymManagement from './views/Gym/GymDataManagement.js';
import ManageThemeView from './views/ManageTheme/ManageThemeView.js';
import GymStatistics from './views/Gym/GymStatistics.js';

const mainmenuRoutes = [
    {
        path: "/main-menu/dashboard",
        name: "Dashboard",
        component: DashBoardView,
        icon: DashboardRoundedIcon,
    },
    {
        path: "/main-menu/gym/statistics",
        name: "Statistics",
        component: GymStatistics,
        icon: FitnessCenterIcon,
    },
    {
        path: "/main-menu/gym/manage",
        name: "GymManage",
        component: GymManagement,
        icon: FitnessCenterIcon,
    },
    {
        path: "/main-menu/gym",
        name: "Fitness",
        component: GymStatistics,
        icon: FitnessCenterIcon,
    },
    {
        path: "/main-menu/music",
        name: "Music",
        component: PianoView,
        icon: MusicNoteIcon,
    },
    {
        path: "/main-menu/theme",
        name: "Manage Theme",
        component: ManageThemeView,
        icon: TuneIcon,
    }
]

const gymRoutes = [
    {
        path: "/main-menu/gym/statistics",
        name: "Statistics"
    },
    {
        path: "/main-menu/gym/manage",
        name: "Manage Data"
    },
]

export {
    mainmenuRoutes,
    gymRoutes
};