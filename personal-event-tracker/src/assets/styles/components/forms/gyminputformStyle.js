const gyminputformStyle = theme => ({
    paper: {
        display: "flex",
        width: "inherit",
        flexDirection: "column",
        justifyContent: "flex-start",
        [theme.breakpoints.up("sm")]: {
            marginLeft: "1rem",
            minHeight: "100%"
        }
    },
    formcontrol: {
        marginLeft: "1rem",
    },
    select: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "row",
        width: "inherit",
        marginTop: "1.5rem",
        marginRight: "1rem"
    },
    datepicker: {
        fontSize: "1rem",
        marginLeft: "1rem",
        marginRight: "1rem",
        marginTop: "0rem !important"
    }
});

export default gyminputformStyle;