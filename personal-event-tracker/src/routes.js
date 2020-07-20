// import material-ui/icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
//import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import TuneIcon from '@material-ui/icons/Tune';
import StorageIcon from '@material-ui/icons/Storage';

// import views 
import DashBoardView from './views/DashBoardView.js';
import ManageServerView from './views/ManageServerView.js';
import ManagePlayerView from './views/ManagePlayerView.js';
import ManageThemeView from './views/ManageThemeView.js';

const mainmenuRoutes = [
    {
        path: "/main-menu/dashboard",
        name: "Dashboard",
        component: DashBoardView,
        icon: DashboardRoundedIcon
    },
    {
        path: "/main-menu/manage-server",
        name: "Manage Server",
        compoenent: ManageServerView, 
        icon: StorageIcon
    }, 
    {
        path: "/main-menu/manage-player",
        name: "Manage Player",
        component: ManagePlayerView,
        icon: SupervisedUserCircleRoundedIcon
    },
    {
        path: "/main-menu/manage-theme",
        name: "Manage Theme",
        component: ManageThemeView,
        icon: TuneIcon
    }
]

export default mainmenuRoutes;