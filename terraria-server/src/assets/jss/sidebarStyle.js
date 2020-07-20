// import bg from '../images/black-building-under-white-sky.jpg';
import bg1 from '../images/mountain-scenery-1450082.jpg';

const drawerWidth="260px";

const responsivedrawerStyle = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundImage: `url(${bg1})`,
        //"rgba(45,51,50,0.8)",
        backgroundSize: "cover",
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    },
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
    webName: {
        display: "block",
        padding: "30px",
        textAlign: "center",
        color: "white",
        height: "80px",
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
    drawerIcon: {
        float: "left",
        textAlign: "center",
        marginRight: "10px",
    },
    listText: {
        paddingTop: "3px",
        fontSize: "18px",
    },
});

export default responsivedrawerStyle;
