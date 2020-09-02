const gymgraphStyle = theme => ({
    paper: {
        height: "inherit",
    },
    chart: {
        paddingTop: "3rem"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    autocomplete: {
        marginTop: "20px",
        marginLeft: "80px",
        marginRight: "20px"
    },
    run: {
        position: "relative",
        marginLeft: "100%",
        marginTop: "20%",
        width: "25vh",
        animation: `$run 9000ms infinite`
    },
    "@keyframes run": {
        "0%": { 
            right : "0%"
        },

        "100%":{
            right: "120%"
        }
    }
})

export default gymgraphStyle;