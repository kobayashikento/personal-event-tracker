import React from 'react'

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import styles from '../../assets/styles/views/theme/themepreviewStyle.js';

import Gymgraph from '../Gym/GymGraph.js';

const useStyle = makeStyles(styles);

export default function ThemePreview(props) {
    const classes = useStyle();

    return (
        <Paper style={{ height: "100%", width: "100%" }}>
            <Typography className={classes.typo} variant="body1" component="h2"> Theme Preview </Typography>
            <Grid container direction="column" >
                <Grid item xs={4} className={classes.grid} style={{ maxWidth: "100%" }}>
                    <Typography variant="subtitle2" component="h1"> Buttons </Typography>
                    <div style={{ display: "flex" }}>
                        <Button variant="outlined" color="primary" style={{ margin: "16px", marginTop: "32px" }}>
                            Cancel
                    </Button>
                        <Button variant="contained" color="primary" style={{ margin: "16px", marginTop: "32px" }}>
                            Save
                    </Button>
                    </div>
                </Grid>
                <Grid item xs={8} className={classes.grid} style={{ maxWidth: "100%" }}>
                    <Typography variant="subtitle2" component="h1"> Graphs </Typography>
                    <div style={{ maxWidth: "100%", zoom: "0.8" }}>
                        <Gymgraph
                            data={[]}
                            theme={props.theme}
                            start={moment().subtract(14, 'days')}
                            end={moment()}
                            type={'days'}
                            amount={14}
                        />
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}