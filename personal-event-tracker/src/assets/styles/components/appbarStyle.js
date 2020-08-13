import {
    drawerWidth,
    appbarHeight,
} from '../masterStyle.js';

const appbarStyle = theme => ({
    appBar: {
        height: "3rem",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth})`,
            marginLeft: drawerWidth,
            height: appbarHeight,
        }
    },
    appText: {
        fontSize: "1rem",
        [theme.breakpoints.up('sm')]: {
        fontSize: "1.5rem",
        marginLeft: "20px",
        marginTop: "20px",
        }
    },
    iconButton: {
        paddingTop: "0.5rem",
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            paddingTop: "2rem",
        }
    }
});

export default appbarStyle;