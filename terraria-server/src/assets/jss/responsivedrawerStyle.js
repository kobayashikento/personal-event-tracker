
import bg from '../images/black-building-under-white-sky.jpg';
import bg1 from '../images/mountain-scenery-1450082.jpg';

const responsivedrawerStyle = theme => ({
    drawerPaper: {
        width: "250px",
        backgroundImage: `url(${bg1})`,
        backgroundSize: "cover",
    },
    list: {
        marginTop: "0",
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
        margin: "5px",
        padding: "30px",
        textAlign: "center",
        color: "black",
    },
    drawerButton: {
        width: "auto",
        display: "block",
        marginLeft: "30px",
        marginRight: "20px",
        marginTop: "30px",
        marginBottom: "30px",
        padding: "5px",
        color: "black",
        align: "center",
        boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    },
    drawerIcon: {
        float: "left",
        textAlign: "center",
        marginRight: "10px",
    },
    listText: {
        paddingTop: "3px",
        fontSize: "20px",
    },
});

export default responsivedrawerStyle;
