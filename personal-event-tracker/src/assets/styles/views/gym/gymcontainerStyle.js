const gymcontainerStyle = theme => ({
    paper: {
        height: "calc(100% - 2rem)", 
        [theme.breakpoints.up("sm")]: {
            marginTop: "4rem"
        }
    },
    tab:{
        flexGrow: "1"
    },
    tabpanel: {
        height: "inherit"
    }
});



export default gymcontainerStyle;