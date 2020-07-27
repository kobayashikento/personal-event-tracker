const drawerlistStyle = theme =>({
    list: {
        marginTop: "10px",
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
        textDecoration: "none",
    },
    drawerButton: {
        width: "auto",
        display: "block",
        marginLeft: "30px",
        marginRight: "20px",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "5px",
        color: "white",
        align: "center",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
        borderRadius: "5px",
    },
    buttonIcon: {
        float: "left",
        textAlign: "center",
        marginRight: "10px",
    },
    buttonText: {
        paddingTop: "3px",
        fontSize: "18px",
    },
})

export default drawerlistStyle;