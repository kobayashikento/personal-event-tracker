import {
    drawerWidthPC,
} from '../masterStyle.js'

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
    },
    contentsWrapper: {       
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidthPC,
        }
    },
});

export default mainMenuStyle;