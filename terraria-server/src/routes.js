// import material-ui/icons
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';

// import views 
import DashBoardView from './views/DashBoardView.js';
import ManagerServerView from './views/ManageServerView.js';
import ManagePlayerView from './views/ManagePlayerView.js';

const mainmenuRoutes = [
    {
        path: "/dashboard",
        name: "DashBoard",
        component: DashBoardView,
        icon: DashboardRoundedIcon
    },
    {
        path: "/manageserver",
        name: "ManageServer",
        compoenent: ManageServerView, 
        icon: SettingsRoundedIcon
    }, 
    {
        paht: "/manageplayer",
        name: "ManagePlayer",
        component: ManagePlayerView,
        icon: SupervisedUserCircleRoundedIcon
    }
]

export default mainmenuRoutes;