const goldenRatio = 1.61803398875;

const themeStyle = theme => ({
    container: {
        height: "100%",
        margin: "auto"
    },
    pagename: {
        padding: "1.5rem"
    },
    previewpaper: {
        margin: "2rem",
        paddingBottom: "75%",
        width: "75%",
        height: "0"
    },
    section: {
        marginLeft: "1rem",
        marginRight: "1rem",
        [theme.breakpoints.up("sm")]: {
            marginLeft: "auto",
            marginRight: "auto",
            width: "85%"
        }
    },
    square: {
        [theme.breakpoints.up("sm")]: {
            flex: goldenRatio,
        }
    }
})

export default themeStyle;