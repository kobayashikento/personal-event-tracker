import {
    drawerWidth,
} from '../masterStyle.js'

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
    },
    contentsWrapper: {       
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        }
        // margin when appbar is present 
        // marginTop: appbarHeight,
    },
});

export default mainMenuStyle;