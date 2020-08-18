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
    autocomplete:{
        width: "85%"
    }
});

export default gymStyle;