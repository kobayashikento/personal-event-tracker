import {
    appbarHeight
} from '../../masterStyle.js'

const gymdatamanagementStyle = theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5),
            marginTop: `calc( ${appbarHeight} + ${theme.spacing(5)}px )`,
            width: "inherit",
            padding: "20px"
        }
    },
    tab: {
        flexGrow: "1"
    },
    tabpanel: {
        height: "100%",
        width: "100%"
    },
})

export default gymdatamanagementStyle;