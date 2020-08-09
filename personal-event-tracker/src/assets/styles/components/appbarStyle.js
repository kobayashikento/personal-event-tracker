import { 
    drawerWidth,
    primaryColor,
    appbarHeight,
} from '../masterStyle.js';

const appbarStyle = theme => ({
    appBar: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        height: appbarHeight,
        backgroundColor: primaryColor,
    },
    appText: {
        marginLeft: "20px",
        marginTop: "20px",
        fontSize: "25px",
    }
});

export default appbarStyle;