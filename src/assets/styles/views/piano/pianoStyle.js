import {
    appbarHeight
} from '../../masterStyle.js'

const pianoStyle = theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: `calc( ${appbarHeight} + ${theme.spacing(5)}px )`,
            width: "inherit",
        }
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

export default pianoStyle;