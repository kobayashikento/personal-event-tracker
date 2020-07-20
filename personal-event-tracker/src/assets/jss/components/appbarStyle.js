const drawerWidth="260px";

const appbarStyle = theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        height: "80px",
        backgroundColor: "rgba(16,88,88,1)",
    },
    appText: {
        marginLeft: "20px",
        marginTop: "20px",
        fontSize: "25px",
    }
});

export default appbarStyle;