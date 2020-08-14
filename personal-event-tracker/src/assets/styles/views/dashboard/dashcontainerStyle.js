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
        width: "100%"
    },
    typo: {
        fontSize: "1rem",
        [theme.breakpoints.up("sm")]: {
            paddingLeft: "2rem",
            fontSize: "2rem"
        },
        width: "inherit",
        paddingTop: "1.8rem",
        paddingBottom: "1rem"
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
        [theme.breakpoints.up("sm")]: {
            paddingLeft: "1rem",
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
        marginRight: "0.5rem",
    },
    tableitem: {
        textTransform: "capitalize",
        fontSize: "1rem"
    }
})

export default dashcontainerStyle;
