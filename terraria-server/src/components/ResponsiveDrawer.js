import React from 'react';
import { NavLink } from 'react-router-dom';

// import material-ui/cores
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListitemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
    var drawerItems = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                return (
                    // create the href for the list item
                    <NavLink
                        to={"/main_menu" + prop.path}
                        className={classes.item}
                        key={key}
                    >
                        <ListItem button 
                            className={classes.drawerButton}
                            key={prop.name}
                        >
                            <ListItemIcon>
                                {prop.icon}
                            </ListItemIcon>
                            <ListItem primary={prop.name} />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );

    return (
        <Hidden smDown implementation="css">
            {console.log(drawerItems)}
            <Drawer
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                classes={{ paper: classes.drawerPaper }}
                onClose={handleDrawerToggle}
                variant="permanent"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawerItems}
            </Drawer>
        </Hidden>
    );
}