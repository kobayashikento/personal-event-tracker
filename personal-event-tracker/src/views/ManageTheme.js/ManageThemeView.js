import React from 'react';

// import all ui cores
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import './ManageThemeView.scss';
// import all local files 
import styles from '../../assets/jss/views/themeStyle.js';

import Themelist from '../../components/list/ThemeList.js';

const useStyles = makeStyles(styles);

export default function ManageThemeView() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.pagename} variant="h5">Themes</Typography>
            <Divider />
            <section>

                <div class="flex-col-2">
                    <div class="tall-rect"><Themelist/></div>
                    <div class="wide-rect">

                        <div class="squarenomargin">
                        </div>
                        <div class="flex-col-2">

                        </div>
                    </div>

                </div>
                <div class="square">
                </div>
            </section>
        </div>
    );
}
