// import material-ui/icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';

// import views 
import DashBoardView from './views/DashBoardView.js';
import ManageServerView from './views/ManageServerView.js';
import ManagePlayerView from './views/ManagePlayerView.js';

const mainmenuRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashBoardView,
        icon: DashboardRoundedIcon
    },
    {
        path: "/manageserver",
        name: "Manage Server",
        compoenent: ManageServerView, 
        icon: SettingsRoundedIcon
    }, 
    {
        path: "/manageplayer",
        name: "Manage Player",
        component: ManagePlayerView,
        icon: SupervisedUserCircleRoundedIcon
    }
]

export default mainmenuRoutes;