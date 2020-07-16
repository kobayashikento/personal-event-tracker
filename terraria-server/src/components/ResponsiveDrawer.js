import React from 'react';
import { Link } from 'react-router-dom';

// import material-ui/cores
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { useTheme, Hidden, Drawer } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/responsivedrawerStyle.js';
import routes from '../routes.js';

const useStyles = makeStyles(styles);

export default function ResponsiveDrawer(props) {
    const classes = useStyles();
    // still dont understand the purpose of the line of code below 
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // set states 
    const [selectedIndex, setSelectedIndex] = React.useState(1);

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
            {routes.map((prop, index) => {
                return (
                    // create the href for the list item
                    <Link
                        to={"/main-menu" + prop.path}
                        className={classes.item}
                        key={index}
                    >
                        <ListItem 
                            button
                            className={classes.drawerButton}
                            key={prop.name}
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                        >
                            <prop.icon
                                className={classes.drawerIcon}
                                fontSize="large"
                            />
                            <ListItemText
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
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
                <Divider variant="middle"/>
                {drawerItems}
            </Drawer>
        </Hidden>
    );
}