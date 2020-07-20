const drawerWidth="260px";

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh",
    },
    maincontainer: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        marginTop: "80px",
    },
});

export default mainMenuStyle;