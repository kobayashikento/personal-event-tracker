import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// import material ui 
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

// import styles from MUI
import { makeStyles } from '@material-ui/core/styles';

// import files 
import styles from '../../assets/jss/components/list/drawerlistStyle.js';

const useStyles = makeStyles(styles);

export default function DrawerList(routes) {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // handle onclick 
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    //reccusively create the list items for the drawer
    var drawerItems = (
        <List className={classes.list}>
            {routes.map((prop, index) => {
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
                                className={classes.buttonIcon}
                                fontSize="large"
                            />
                            <ListItemText
                                disableTypography
                                className={classes.buttonText}
                                primary={prop.name}
                            />
                        </ListItem>
                    </Link>
                );
            })}
        </List>
    );

    return (
        <div>{drawerItems}</div>
    );
}