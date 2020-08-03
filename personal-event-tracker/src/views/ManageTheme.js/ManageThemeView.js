import React from 'react';

// import all ui cores
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start"
            >
                <Grid
                    item
                    xs={4} sm={4}
                >
                    <Themelist />
                </Grid>
                <Grid
                    item
                    xs={8} sm={8}
                >
                    <Paper className={classes.paper} elevation={3}>
                        <Typography className={classes.pagename} variant="h5">Preview</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
