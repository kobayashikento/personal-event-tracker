const gymStyle = theme => ({
    paper: {
        marginLeft: "1rem",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('sm')]: {
            minHeight: "400px",
            marginTop: "4rem",
        }
    },
    paperHidden: {
        display: "none"
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