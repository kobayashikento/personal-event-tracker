import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// import styles from MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import styles from '../../assets/jss/components/theme/themelistStyle.js';
import themes from '../../assets/data/themes.json';

const useStyles = makeStyles(styles);


export default function ThemeList(props) {
    // props -> current theme (theme)
    const classes = useStyles();

    // states
    const [selectedIndex, setIndex] = useState([true, false, false, false, false]);
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    const handleClick = (index, color) => {
        let arr = [false, false, false, false, false];
        arr[index] = true;
        props.handleColorChange(color, index);
        setIndex(arr);
    }

    return (
        <form className={classes.container} onSubmit={handleSubmit(onSubmit)}>
            <select className={classes.select} name="selector" ref={register}>
                {themes.map((theme, index) => {
                    return (
                        <option key={index} value={theme}>{theme.themeName}</option>
                    );
                })}
            </select>
            <Paper className={classes.box}
                elevation={
                    selectedIndex[0] ? 3 : 0
                }
            >
                <Typography className={classes.text}>Primary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.primary }} variant="contained" className={classes.button}
                    onClick={() => handleClick(0, props.theme.colors.primary)}
                />
            </Paper>
            <Paper className={classes.box}
                elevation={
                    selectedIndex[1] ? 3 : 0
                }
            >
                <Typography className={classes.text}>Secondary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.secondary }} variant="contained" className={classes.button}
                    onClick={() => handleClick(1, props.theme.colors.secondary)}
                />
            </Paper>
            <Paper className={classes.box} elevation={
                    selectedIndex[2] ? 3 : 0
                }>
                <Typography className={classes.text}>Tertiary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.tertiary }} variant="contained" className={classes.button} 
                onClick={() => handleClick(2, props.theme.colors.tertiary)}/>
            </Paper>
            <Paper className={classes.boxcolor} elevation={
                    selectedIndex[3] ? 3 : 0
                }>
                <Typography className={classes.colortext}>Primary Text Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.primarytext }} variant="contained" className={classes.colorbutton} 
                onClick={() => handleClick(3, props.theme.colors.primarytext)}/>
            </Paper>
            <Paper className={classes.boxcolor} elevation={
                    selectedIndex[4] ? 3 : 0
                }>
                <Typography className={classes.colortext}>Secondary Text Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.secondarytext }} variant="contained" className={classes.colorbutton} 
                onClick={() => handleClick(4, props.theme.colors.secondarytext)}/>
            </Paper>
            <Button className={classes.inputButton} variant="outlined">Reset</Button>
        </form>
    );
}