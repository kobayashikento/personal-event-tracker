const themepaletteStyle = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },
    innercontainer: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        width: "34%"
    },
    sliderpicker:{
        width: "95%",
        marginBottom: "1rem",
        marginTop: "1rem"
    },
    blockpicker:{
        marginTop: "0.55rem"
    },
    savebutton:{
        width: "80%",
        alignSelf: "center"
    },
    resetbutton:{
        width: "80%",
        marginTop: "1rem",
        alignSelf: "center"
    }
})

export default themepaletteStyle;