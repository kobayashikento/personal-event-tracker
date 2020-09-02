const drawerlistStyle = theme => ({
    list: {
        marginTop: "18px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset",
    },
    item: {
        position: "relative",
        display: "block",
        height: "48px",
        marginBottom: "18px",
    },
    drawerButton: {
        color: "white",
        borderRadius: "5px",
        marginRight: "16px",
        marginLeft: "16px",
        paddingLeft: "12px",
        width: "inherit",
    },
    drawerButtonItem: {
        color: "white",
        borderRadius: "5px",
        marginRight: "16px",
        marginLeft: "16px",
        paddingLeft: "12px",
        width: "inherit",
        marginBottom: "18px",
    },
    drawerButtonNested: {
        color: "white",
        borderRadius: "5px",
        marginRight: "16px",
        marginLeft: "60px",
        paddingLeft: "12px",
        width: "inherit",
    },
    buttonIcon: {
        float: "left",
        textAlign: "center",
        marginRight: "20px",
        [theme.breakpoints.up("sm")]: {
            
        }        
    },
    buttonText: {
        paddingTop: "3px",
        fontSize: "18px",
    },
})

export default drawerlistStyle;