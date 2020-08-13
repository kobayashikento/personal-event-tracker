import React from 'react';

// import MUI 
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Toolbar } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

// import assests 
import styles from 'assets/styles/components/appbarStyle.js';

const useStyles = makeStyles(styles);

export default function Appbar(props) {
    const classes = useStyles();

    const StyledAppbar = styled(AppBar)({
        backgroundColor: props.theme.colors.secondary
    });

    // find the current path name to display on the appbar 
    function currPathName() {
        var path;
        props.routes.map(route => {
            if (window.location.href.indexOf(route.path) > -1) {
                path = route.name;
            }
            return null;
        });
        return path;
    }

    return (
        <StyledAppbar
            className={classes.appBar}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.iconButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.appText}>
                    {currPathName()}
                </Typography>
            </Toolbar>
        </StyledAppbar>
    );
}