import React from 'react';

// import material-ui/cores
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListitemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Toolbar, useTheme, Hidden, Drawer} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/components/responsivedrawerStyle.js';

const useStyles = makeStyles(styles);

export default function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
            <List className={classes.list}>






                {['Dashboard', 'Manage Server', 'Players'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index == ? <DashboardRoundedIcon/> : index[1] ?
                             <SettingsRoundedIcon/> : index[2], 
                            ,
                                <SupervisedUserCircleRoundedIcon/>}
                            <ListItemText primary={text} />
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
    )

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Dashbaord
            </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalPropßßßs={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}