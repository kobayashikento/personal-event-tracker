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
    },
    accordionSummary: {
        padding: "0 0px !important",
        height: "54px",
        [theme.breakpoints.up("sm")]: {
            height: "52px",
        }
    },
    typo: {
        [theme.breakpoints.up("sm")]: {
            paddingLeft: theme.spacing(5),
            fontSize: "2rem"
        },
        width: "inherit",
        paddingTop: theme.spacing(2),
    },
    switchTypo: {
        fontSize: "0.8rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "1.5rem"
        },
    },
    column: {
        paddingLeft: "16px",
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            paddingTop: "22px",
            height: "72px"
        }
    },
    content: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingBottom: "0px"
    },
    sheetlibrary: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    subSheetLibrary: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    sheetCardActionContainer: {
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    cardColumn: {
        display: "flex",
        paddingLeft: "16px",
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            paddingTop: "12px",
            height: "40px"
        }
    },
    subTypo: {
        paddingLeft: "32px",
        paddingTop: "8px"
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
