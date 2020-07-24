import {
    drawerWidth,
    appbarHeight,
} from '../masterStyle.js'

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
    },
    contentsWrapper: {       
        marginLeft: drawerWidth,
        marginTop: appbarHeight,
    },
});

export default mainMenuStyle;