const themelistStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    select: {
        marginTop: "2rem",
        marginLeft: "2.5rem",
        marginRight: "2.5rem",
        marginBottom: "1rem",
        height: "2.5rem",
        width: "100%",
        textAlign: "center"
    },
    box: {
        display: "flex",
        flexWrap: "wrap",
        marginTop: "1rem",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%",
        height: "30%"
    },
    boxcolor:{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        width: "40%",
        height: "30%",
        marginTop: "1rem"
    },
    button: {
        marginTop: "1rem",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "1rem",
        width: "4.5vw",
        height: "6.5vh",
    },
    colorbutton:{
        marginTop: "1rem",
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: "1rem",
        width: "4.5vw",
        height: "6.5vh",
    },
    text: {
        marginTop: "1rem",
        textAlign: "center",
        marginLeft: "0rem",
        marginRight: "0rem",
        height: "10%",
        fontSize: "1rem"
    },
    colortext:{
        textAlign: "center",
        marginTop: "1rem",
        marginLeft: "10%",
        marginRight: "10%",
        fontSize: "1rem"
    },
    inputButton:{
        marginTop: "1rem",
        marginBottom: "2rem",
        width: "35%",
        height: "20%"
    }
})

export default themelistStyle;