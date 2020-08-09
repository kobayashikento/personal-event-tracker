import React from 'react';

// import styles from MUI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from '../../assets/styles/components/theme/themelistStyle.js';
import themes from '../../assets/data/themes.json';

const useStyles = makeStyles(styles);


export default function ThemeList(props) {
    // props -> current theme (theme)
    const classes = useStyles();

    // states
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (theme) => {
        setAnchorEl(null);
        if (theme.themeName != null) {
            props.handleChange(theme)
        }
    };

    const isElevated = (index) => {
        if (props.index === index) {
            return 3;
        }
        return 0;
    }

    return (
        <form className={classes.container}>
            <Button className={classes.select} aria-controls="simple-menu" aria-haspopup="true" variant="outlined" onClick={handleMenuClick}>
                {props.theme.themeName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {themes.map((theme, index) => {
                    return (
                        <MenuItem onClick={() => handleMenuClose(theme)} key={index}>{theme.themeName}</MenuItem>
                    );
                })}
            </Menu>
            <Paper className={classes.box}
                elevation={
                    isElevated(0)
                }
            >
                <Typography className={classes.text}>Primary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.primary }} variant="contained" className={classes.button}
                    onClick={() => props.handleChangeIndex(0, props.theme.colors.primary)}
                />
            </Paper>
            <Paper className={classes.box}
                elevation={
                    isElevated(1)
                }
            >
                <Typography className={classes.text}>Secondary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.secondary }} variant="contained" className={classes.button}
                    onClick={() => props.handleChangeIndex(1, props.theme.colors.secondary)}
                />
            </Paper>
            <Paper className={classes.box} elevation={
                isElevated(2)
            }>
                <Typography className={classes.text}>Tertiary Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.tertiary }} variant="contained" className={classes.button}
                    onClick={() => props.handleChangeIndex(2, props.theme.colors.tertiary)} />
            </Paper>
            <Paper className={classes.boxcolor} elevation={
                isElevated(3)
            }>
                <Typography className={classes.colortext}>Primary Text Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.primarytext }} variant="contained" className={classes.colorbutton}
                    onClick={() => props.handleChangeIndex(3, props.theme.colors.primarytext)} />
            </Paper>
            <Paper className={classes.boxcolor} elevation={
                isElevated(4)
            }>
                <Typography className={classes.colortext}>Secondary Text Color</Typography>
                <Button style={{ backgroundColor: props.theme.colors.secondarytext }} variant="contained" className={classes.colorbutton}
                    onClick={() => props.handleChangeIndex(4, props.theme.colors.secondarytext)} />
            </Paper>
            <Button className={classes.inputButton} variant="outlined">Save</Button>
            <Button className={classes.inputButton} variant="outlined">Reset</Button>
        </form >
    );
}