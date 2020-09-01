import {
    appbarHeight
} from '../../masterStyle.js'

const gymcontainerStyle = theme => ({
    paper: {
        height: "calc(100% - 2rem)",
        [theme.breakpoints.up("sm")]: {
        }
    },
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: `calc( ${appbarHeight} + ${theme.spacing(5)}px )`,
            width: "inherit",
        }
    },
    paperHidden: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6)
        }
    },
    tab: {
        flexGrow: "1"
    },
    tabpanel: {
        height: "inherit"
    },
    cardColumn: {
        display: "flex",
        paddingLeft: "16px",
        paddingTop: "12px",
    },
    typo: {
        marginTop: theme.spacing(2),
        textAlign: "center"
    },
    daysTypo: {
        marginTop: theme.spacing(2),
        textAlign: "center"
    }
});



export default gymcontainerStyle;