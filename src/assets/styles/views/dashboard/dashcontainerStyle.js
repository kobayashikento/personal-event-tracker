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
    typo: {
        paddingLeft: theme.spacing(5),
        width: "inherit",
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3),
    },
    content: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingBottom: "0px"
    },
    cardColumn: {
        display: "flex",
        paddingLeft: "16px",
        width: "100%",
        marginTop: "16px"
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
    sheetCardActionContainer: {
        marginTop: "auto",
        marginBottom: "auto",
        display: "flex",
        marginRight: "auto",
        marginLeft: "auto"
    },
    playIcon: {
        height: 24,
        width: 24,
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
