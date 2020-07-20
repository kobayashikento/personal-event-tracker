import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// import material-ui/cores from MUI 
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { Hidden, Drawer } from '@material-ui/core';

// import styles from MUI
import { makeStyles } from '@material-ui/core/styles';

// import files 
import styles from 'assets/jss/sidebarStyle.js';

const useStyles = makeStyles(styles);



export default function SideBar(props) {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = React.useState(false);

    // set states 
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    // handle onclick 
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    // reccusively create the list items for the drawer
    var drawerItems = (
            <List className={classes.list}>
                {props.routes.map((prop, index) => {
                    return (
                        // create the href for the list item
                        <Link
                            to={prop.path}
                            className={classes.item}
                            key={index}
                        >
                            <ListItem
                                button
                                selected={selectedIndex === index}
                                className={
                                    classNames(classes.drawerButton)
                                }
                                key={prop.name}
                                onClick={(event) => handleListItemClick(event, index)}
                            >
                                <prop.icon
                                    className={classes.drawerIcon}
                                    fontSize="large"
                                />
                                <ListItemText
                                    disableTypography
                                    className={classes.listText}
                                    primary={prop.name}
                                />
                            </ListItem>
                        </Link>
                    );
                })}
            </List>
    );

    return (
        <Hidden smDown implementation="css">
            <Drawer
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
                onClose={handleDrawerToggle}
                variant="permanent"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                <Typography
                    className={classes.webName}
                    variant="h6"
                >
                    Some Clever Title
                </Typography>
                <Divider variant="middle" />
                {drawerItems}
            </Drawer>
        </Hidden>
    );
}