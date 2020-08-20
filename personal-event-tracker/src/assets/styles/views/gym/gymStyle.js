import {
    appbarHeight
} from '../../masterStyle.js';

const goldenRatio = 1.61803398875;

const gymStyle = theme => ({
    container: {
        height: "100%",
        marginTop: "2rem",
        [theme.breakpoints.up('sm')]: {
            marginTop: appbarHeight,
        }
    },
    title: {
        padding: "1.5rem"
    },
    section: {
        marginLeft: "1rem",
        marginRight: "1rem",
        [theme.breakpoints.up("sm")]: {
            marginLeft: "auto",
            marginRight: "auto",
            width: "85%",
            height: "75vh"
        }
    },
    square: {
        [theme.breakpoints.up("sm")]: {
            flex: goldenRatio
        }
    }
});

export default gymStyle;