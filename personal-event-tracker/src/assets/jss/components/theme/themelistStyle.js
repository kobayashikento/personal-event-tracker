const themelistStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly" 
    },
    select: {
        marginTop: "2rem",
        marginLeft: "2.5rem",
        marginRight: "2.5rem",
        height: "2.5rem",
        width: "100%",
        textAlign: "center"
    },
    button: {
        marginTop: "1rem",
        marginRight: "2rem",
        marginLeft: "2rem",
        width: "4.5vw",
        height: "6.5vh",
    },
    colorbutton:{
        marginTop: "1rem",
        marginRight: "10%",
        marginLeft: "10%",
        width: "4.5vw",
        height: "6.5vh",
    },
    text: {
        textAlign: "center",
        marginLeft: "0rem",
        marginRight: "0rem",
        marginTop: "2rem",
        width: "30%",
        height: "10%"
    },
    colortext:{
        textAlign: "center",
        marginTop: "3rem",
        marginLeft: "10%",
        marginRight: "10%",
    },
    inputButton:{
        marginTop: "3rem",
        width: "35%",
        height: "20%"
    }
})

export default themelistStyle;