const dashcontainerStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "100%"
    },
    accordion: {
        width: "100%"
    },
    typo: {
        height: "fit-content",
        width: "inherit",
        paddingTop: "2rem",
        paddingLeft: "2rem",
        paddingBottom: "1rem"
    },
    column: {
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "1rem",
    },
    heading: {
        fontSize: "1.2rem"
    },
    secondaryHeading: {
        color: theme.palette.text.secondary,
        marginLeft: "1rem",
        fontSize: "1.2rem"
    },
    icon:{
        marginRight: "0.5rem",
    },
    tableitem:{
        textTransform: "capitalize",
        fontSize: "1rem"
    }
})

export default dashcontainerStyle;
