import React from 'react';

// import styles from MUI
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import icons
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import StraightenIcon from '@material-ui/icons/Straighten';
import BlockIcon from '@material-ui/icons/Block';

// import files
import styles from '../../assets/jss/components/list/dashlistStyle.js';

const useStyles = makeStyles(styles);

export default function DashActivityList() {
    const classes = useStyles();

    const activity = [
        {
            name: "All activities",
            icon: CalendarViewDayIcon,
        },
        {
            name: "Gym activity",
            icon: FitnessCenterIcon,
        },
        {
            name: "Piano activity",
            icon: StraightenIcon,
        },
        {
            name: "No activity",
            icon: BlockIcon,
        }
    ]

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // handle onclick 
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    var calendarList = (
        <List className={classes.list}>
            {activity.map((prop, index) => {
                return (
                    // create the href for the list item
                    <ListItem
                        button
                        selected={selectedIndex === index}
                        key={prop.name}
                        onClick={(event) => handleListItemClick(event, index)}
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