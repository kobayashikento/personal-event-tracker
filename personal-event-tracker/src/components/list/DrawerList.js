import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// import material ui 
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

// import styles from MUI
import { makeStyles } from '@material-ui/core/styles';

// import files 
import styles from '../../assets/styles/components/list/drawerlistStyle.js';

import { gymRoutes } from '../../routes.js';

const useStyles = makeStyles(styles);

export default function DrawerList(props) {
    const classes = useStyles();

    // states
    const [open, setOpen] = React.useState(true);
    const handleListItemClick = (event, index) => {       
        props.handleListItemClick(index);
    };
    const handleGymIndexChanege = (event, index) => {
        props.setGymSelectedIndex(index);
        props.handleListItemClick(1);
    }
    const handleClick = () => {
        setOpen(!open);
    };

    var gymLinks = (
        gymRoutes.map((prop, index) => {
            return (
                <Link
                    to={prop.path}
                    className={classes.item}
                    key={prop.name}
                    style={{ textDecoration: "none" }}
                >
                    <ListItem
                        button
                        className={classNames(classes.drawerButtonNested)}
                        onClick={(event) => handleGymIndexChanege(event, index)}
                        selected={props.gymSelectedIndex === index}
                    >
                        <ListItemText
                            primary={prop.name}
                            disableTypography
                            className={classes.buttonText}
                        />
                    </ListItem>
                </Link>
            );
        })
    );

    const gymdrawerItems = (index, Icon, name, path) => {
        if (name === "Gym") {
            return (
                <React.Fragment key={index} >
                    < ListItem
                        button
                        selected={props.selectedIndex === index}
                        className={classNames(classes.drawerButtonItem)}
                        key={name}
                        onClick={handleClick}
                    >
                        <Icon
                            className={classes.buttonIcon}
                            fontSize="default"
                        />
                        <ListItemText
                            disableTypography
                            className={classes.buttonText}
                            primary={name}
                        />
                        {open ? <ExpandMore /> : <ExpandLess />}
                    </ListItem >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {gymLinks}
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        } else {
            return (
                <Link
                    to={path}
                    className={classes.item}
                    key={index}
                    style={{ textDecoration: "none" }}
                >
                    <ListItem
                        button
                        selected={props.selectedIndex === index}
                        className={
                            classNames(classes.drawerButton)
                        }
                        key={name}
                        onClick={(event) => handleListItemClick(event, index)}
                    >
                        <Icon
                            className={classes.buttonIcon}
                            fontSize="default"
                        />
                        <ListItemText
                            disableTypography
                            className={classes.buttonText}
                            primary={name}
                        />
                    </ListItem>
                </Link>
            );
        }
    };

    //reccusively create the list items for the drawer
    var drawerItems = (
        <List className={classes.list}>
            {props.routes.map((prop, index) => {
                return (
                    gymdrawerItems(index, prop.icon, prop.name, prop.path)
                );
            })}
        </List >
    );

    return (
        drawerItems
    );
}