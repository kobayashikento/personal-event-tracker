const countdowntimeStyle = theme => ({
    timepicker: {
        fontSize: "2rem"
    },
    paper: {
        marginTop: "1rem",
        marginBottom: "1rem",
        [theme.breakpoints.up("sm")]: {
            alignSelf: "center",
            marginTop: "5.5rem",
            marginLeft: "1rem"
        }
    }
});

export default countdowntimeStyle;
