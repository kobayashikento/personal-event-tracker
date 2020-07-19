const drawerWidth="260";

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        height: "80px",
        backgroundColor: "rgba(16,88,88,1)",
    },
    appText: {
        marginTop: "20px",
    }
});

export default mainMenuStyle;