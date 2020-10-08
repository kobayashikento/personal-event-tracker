import {
    appbarHeight
} from '../../masterStyle.js';

const goldenRatio = 1.61803398875;

const dashboardStyle = theme => ({
    container: {
        height: "100%",
        [theme.breakpoints.up('sm')]: {
            marginTop: `calc( ${appbarHeight} + ${theme.spacing(5)}px )`,
            marginLeft: theme.spacing(10),
            marginRight: theme.spacing(10),
            width: "inherit"
        }
    },
});

export default dashboardStyle;