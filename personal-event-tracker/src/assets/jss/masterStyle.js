import { createMuiTheme } from '@material-ui/core/styles';

import bg1 from '../images/mountain-scenery-1450082.jpg';
import bg from '../images/black-building-under-white-sky.jpg';

const drawerWidth = "250px";
const appbarHeight = "80px";
const primaryColor = "rgba(16,88,88,1)";

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
}