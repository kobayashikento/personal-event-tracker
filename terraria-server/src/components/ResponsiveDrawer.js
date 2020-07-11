import React from 'react';
import { NavLink } from 'react-router-dom'; 

// import material-ui/cores
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListitemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Toolbar, useTheme, Hidden, Drawer } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/responsivedrawerStyle.js';
import routes from '../routes.js';

const useStyles = makeStyles(styles);

export default function ResponsiveDrawer(props) {
    const classes = useStyles();
    // still done understand the purpose of the line of code below 
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    // check if the current item is selected. this fucntion is necessary
    // for highlighting the item when seleceted 
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    // reccusively create the list items for the drawer
    var drawer = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                return (
                    // create the href for the list item
                    <NavLink
                        to={"/main_menu" + prop.path}
                        className={prop.path + classes.item}
                        activeClassname="selected"
                        key={key}
                    >   
                        <ListItem button className={classes.button + prop.name}>
                            <ListItemIcon>{prop.icon}</ListItemIcon>
                            <ListItemText primary={prop.name}/>
                        </ListItem>
                    </NavLink>
                );
            })};
        </List>
    );
    return (
        <div>
            <drawer />
        </div>
    )
}