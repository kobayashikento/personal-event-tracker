import React from 'react';

// import material-ui/cores from MUI 
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Hidden, Drawer } from '@material-ui/core';

// import styles from MUI
import { makeStyles } from '@material-ui/core/styles';

// import files 
import styles from '../assets/styles/components/sidebarStyle.js';
import drawerItems from './list/DrawerList.js';
import Appbar from '../components/Appbar.js';


const useStyles = makeStyles(styles);

export default function SideBar(props) {
    const styleProps = {
        color: props.theme.colors.primary
    }
    const classes = useStyles(styleProps);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <div className={classes.wrapper}>
            <Appbar
                routes={props.routes}
                theme={props.theme}
                handleDrawerToggle={() => handleDrawerToggle()}
            />
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="permanent"
                    open
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Typography
                        className={classes.sidebarTitle}
                        variant="h5"
                    >
                        Record Keeper
                </Typography>
                    {drawerItems(props)}
                </Drawer>
            </Hidden>
            <Hidden smUp implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <Typography
                        className={classes.sidebarTitle}
                        variant="h6"
                    >
                        Record Keeper
                </Typography>
                    {drawerItems(props)}
                </Drawer>
            </Hidden>
        </div>
    );
}