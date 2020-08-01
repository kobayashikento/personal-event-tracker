import {
    gymbg,
    pianobg,
    allactbg,
    noactbg
} from '../../jss/masterStyle.js';

const dashboardStyle = theme => ({
    container: {
        padding: "20px",
    },
    paperCalendar: {
        padding: "0px",
        textAlign: "center",
        height: "400px",
    },
    hideenpaperCalendar: {
        padding: "0px",
        textAlign: "center",
        height: "400px",
        opacity: "0"
    },
    calTitle: {
        paddingTop: "30px",
    },
    statTitle:{
        textAlign: "center",
        paddingLeft: "35%",
        paddingTop: "3%",
    },
    noActBackground:{
        padding: "0px",
        textAlign: "center",
        height: "150px",
        background: `linear-gradient(to right, transparent, white), url(${noactbg})`,
        backgroundSize: "40% 100%",
        backgroundRepeat: "no-repeat"
    },
    gymBackground:{
        padding: "0px",
        textAlign: "center",
        height: "150px",
        background: `linear-gradient(to right, transparent, white), url(${gymbg})`,
        backgroundSize: "40% 100%",
        backgroundRepeat: "no-repeat"
    },
    pianoBackground:{
        padding: "0px",
        textAlign: "center",
        height: "150px",
        background: `linear-gradient(to right, transparent, white), url(${pianobg})`,
        backgroundSize: "40% 100%",
        backgroundRepeat: "no-repeat"
    },
    allActBackground:{
        padding: "0px",
        textAlign: "center",
        height: "150px",
        background: `linear-gradient(to right, transparent, white), url(${allactbg})`,
        backgroundSize: "40% 100%",
        backgroundRepeat: "no-repeat",
    },
    moveCal: {
        transform: "translateY(45%)"
    },
    moveSidebar: {
        transform: "translateY(60%)"
    }
});

export default dashboardStyle;