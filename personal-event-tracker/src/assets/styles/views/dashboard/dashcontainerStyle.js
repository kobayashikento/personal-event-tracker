const dashcontainerStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%"
    },
    toggleText: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    accordion: {
        width: "360px",
        borderRadius: "5px",
        marginTop: theme.spacing(3),
        [theme.breakpoints.up("sm")]: {
            width: "inherit"
        }
    },
    accordionSummary: {
        padding: "0 0px !important",
        height: "54px",
        [theme.breakpoints.up("sm")]: {
            height: "52px",
        }
    },
    typo: {
        fontSize: "1rem",
        [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(5),
            fontSize: "2rem"
        },
        width: "inherit",
        paddingTop: theme.spacing(5),
    },
    switchTypo:{
        fontSize: "0.8rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.5rem"
        },
    },
    column: {
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "16px",
        [theme.breakpoints.up("sm")]: {
            
        }
    },
    heading: {
        fontSize: "0.8rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.2rem"
        }
    },
    secondaryHeading: {
        fontSize: "0.8rem",
        marginLeft: "1rem",
        color: theme.palette.text.secondary,
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.2rem",
            marginLeft: "1rem",
        }
    },
    icon: {
        marginRight: "16px",
        [theme.breakpoints.up("sm")]: {
            marginRight: "24px",
        }
    },
    tableitem: {
        textTransform: "capitalize",
        fontSize: "1rem"
    },
})

export default dashcontainerStyle;
