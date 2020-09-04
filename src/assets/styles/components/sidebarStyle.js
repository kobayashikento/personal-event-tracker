import {
    drawerWidthPC,
} from '../masterStyle.js';

const responsivedrawerStyle = theme => ({
    wrapper: {
        display: "flex",
    },
    sidebarTitle: {
        paddingTop: "22px",
        marginLeft: "28px",
    },
    drawerPaper: props => ({
        width: "calc(100% - 64px)",
        [theme.breakpoints.up('sm')]: {
            width: drawerWidthPC,
        },
        borderRightWidth: "0px",
        right: "0px",
        backgroundSize: "cover",
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        backgroundColor: props.color
    }),
    list: {
        marginTop: "10px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset",
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
    },
    drawerButton: {
        width: "auto",
        display: "block",
        marginLeft: "30px",
        marginRight: "20px",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "5px",
        color: "white",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        borderRadius: "5px",
    },
    buttonIcon: {
        float: "left",
        textAlign: "center",
        marginRight: "10px",
    },
    buttonText: {
        paddingTop: "3px",
        fontSize: "1rem",
        [theme.breakpoints.up('sm')]: {
            fontSize: "2rem",
        }
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
    },
});
export default responsivedrawerStyle;