const gymcontainerStyle = theme => ({
    paper: {
        height: "calc(100% - 2rem)", 
        [theme.breakpoints.up("sm")]: {
        }
    },
    paperHidden: {
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6)
        }
    },
    tab:{
        flexGrow: "1"
    },
    tabpanel: {
        height: "inherit"
    },
});



export default gymcontainerStyle;