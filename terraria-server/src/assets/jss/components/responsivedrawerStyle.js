const drawerWidth = 240;

const responsivedrawerStyle = theme => ({
    drawerPaper: {
        width: drawerWidth,
    },
    list: {
        marginTop: "20px",
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
    webName: {
        display: "inline-block",
        padding: "30px",
        textAlign: "center",
    }
});

export default responsivedrawerStyle;
