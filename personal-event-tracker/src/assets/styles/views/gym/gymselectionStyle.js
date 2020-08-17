const gymStyle = theme => ({
    paper: {
        marginTop: "6.5rem",
        marginLeft: "1rem",
        paddingTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.up('sm')]: {
            minHeight: "400px"
        }
    },
    autocomplete:{
        width: "85%"
    }
});

export default gymStyle;