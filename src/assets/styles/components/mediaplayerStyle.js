const mediaplayerStyle = theme => ({
    content: {
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingBottom: "0px"
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(3),
    },
    spin: {
        animation: `$spin 5000ms infinite`
    },
    "@keyframes spin": {
        from: { transform: "rotate(360deg)" },
        to: { transform: "rotate(0deg)" }
    }
})

export default mediaplayerStyle;
