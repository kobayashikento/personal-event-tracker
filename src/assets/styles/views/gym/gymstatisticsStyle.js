import {
    appbarHeight
} from '../../masterStyle.js'

const gymstatisticsStyle = theme => ({
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
    },
    modalCard: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "5%",
        left: "29%",
        width: "50rem",
        overflow: "scroll",
        transform: "translate(-5%, -5%)"
    },
});



export default gymstatisticsStyle;