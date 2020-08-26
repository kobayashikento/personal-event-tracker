const gymStyle = theme => ({
    container: {
        height: "75vh",
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: theme.spacing(5),
            width: "inherit",
        }
    },
    title: {
        padding: "1.5rem"
    },
    gymContainer:{
        paddingBottom: "0px !important"
    },
});

export default gymStyle;