import React from 'react';

// import styles from MUI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import files
import styles from '../../assets/jss/components/list/dashlistStyle.js';
import { activities } from '../../assets/jss/masterStyle.js';

const useStyles = makeStyles(styles);

export default function DashActivityList(props) {
    const classes = useStyles();

    // set states 
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // handle onclick 
    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        props.handleChange(index);
    };

    var calendarList = (
        <List>
            {activities.map((prop, index) => {
                return (
                    // create the href for the list item
                    <ListItem
                        button
                        selected={selectedIndex === index}
                        key={index}
                        onClick={() => handleListItemClick(index)}
                    >
                        <prop.icon
                            className={classes.icon}
                            fontSize="large"
                        />
                        <ListItemText
                            disableTypography
                            primary={prop.name}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
    
    return (
        <Paper>
            <Typography className={classes.listTitle} variant="h6">Activity</Typography>
            <Paper elevation={3}>
                {calendarList}
            </Paper>
        </Paper>
    );
}