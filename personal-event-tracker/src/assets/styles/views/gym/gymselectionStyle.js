const gymStyle = theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('sm')]: {
            minHeight: "400px",
            marginTop: theme.spacing(6),
            paddingTop: theme.spacing(5)
        }
    },
    autocomplete:{
        width: "85%"
    },
    datepicker: {
        width: "85%",
        height: "3rem",
        marginTop: "2rem",
        fontSize: "1rem",
        textAlign: "center"
    }
});

export default gymStyle;