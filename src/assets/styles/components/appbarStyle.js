import {
    drawerWidthPC,
    appbarHeight,
} from '../masterStyle.js';

const appbarStyle = theme => ({
    appBar: {
        height: "56px",
        width: "100%",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidthPC})`,
            marginLeft: drawerWidthPC,
            height: appbarHeight,
        }
    },
    appText: {
        color: "white",
        [theme.breakpoints.up('sm')]: {
        marginLeft: "20px",
        marginTop: "8px",
        }
    },
    iconButton: {
        paddingTop: "16px",
        paddingBottom: "16px",
        marginRight: "32px",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        }
    }
});

export default appbarStyle;