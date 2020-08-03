import React from 'react';
import { useForm } from 'react-hook-form';
import { BlockPicker } from 'react-color';
import { SliderPicker } from 'react-color';

// import styles from MUI
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


import styles from '../../assets/jss/components/list/themelistStyle.js';
import themes from '../../assets/data/themes.json';

const useStyles = makeStyles(styles);


export default function ThemeList(props) {
    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);


    // set default theme 
    let defaultTheme;
    themes.forEach(theme => {
        if (theme.themeName === "default") {
            defaultTheme = theme;
        }
    })

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.grid}
        >
            <Grid
                item
                xs={8} sm={8}
            >
                <Paper className={classes.paper} elevation={3}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="primary-color" label="Primary Color" defaultValue={defaultTheme.colors.primary} variant="outlined" />


                    </form>
                </Paper>
            </Grid>
            <Grid
                item
                xs={4} sm={4}
            >
                <Paper className={classes.paper} elevation={3}>
                    <SliderPicker />
                    <BlockPicker
                        triangle="hide"
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}