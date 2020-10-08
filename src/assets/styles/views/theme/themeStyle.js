import {
    appbarHeight
} from '../../masterStyle.js';

const themeStyle = theme => ({
    container: {
        height: "100%",
        [theme.breakpoints.up('sm')]: {
            marginTop: `calc( ${appbarHeight} + ${theme.spacing(5)}px )`,
            marginLeft: theme.spacing(10),
            marginRight: theme.spacing(10),
            width: "inherit"
        }
    },
})

export default themeStyle;