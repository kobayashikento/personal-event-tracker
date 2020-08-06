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
    },
    sliderpicker:{
        width: "90%"
    },
    blockpicker:{
        marginTop: "1rem"
    },
    inputbutton:{
        marginTop: "1rem"
    }
})

export default themepaletteStyle;