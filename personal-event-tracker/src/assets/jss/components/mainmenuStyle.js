const drawerWidth="280px";
const appbarHeight="80px";

const mainMenuStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100%",
    },
    maincontainer: {
        width: `calc(100% - ${drawerWidth})`,
        height: `calc(100% - ${appbarHeight})`,
        marginLeft: drawerWidth,
        marginTop: appbarHeight,
    },
});

export default mainMenuStyle;