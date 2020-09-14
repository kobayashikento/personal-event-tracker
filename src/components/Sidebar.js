import React from 'react';

// import material-ui/cores from MUI 
import Typography from '@material-ui/core/Typography';
import { Hidden, Drawer } from '@material-ui/core';

// import styles from MUI
import { makeStyles, useTheme } from '@material-ui/core/styles';

// import files 
import styles from '../assets/styles/components/sidebarStyle.js';
import drawerItems from './list/DrawerList.js';
import Appbar from '../components/Appbar.js';

import MediaPlayer from '../components/MediaPlayer.js';
import { drawerWidthPC } from '../assets/styles/masterStyle.js';

const useStyles = makeStyles(styles);

export default function SideBar(props) {
    const styleProps = {
        color: props.theme.colors.primary
    }
    const classes = useStyles(styleProps);
    const theme = useTheme(styles);
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
                    style={{ zoom: "0.9" }}
                >
                    <Typography variant="h6" component="h1" style={{ color: props.theme.colors.secondary }} className={classes.sidebarTitle}>
                        Record Keeper
                    </Typography>
                    {drawerItems(props)}
                    {window.location.pathname === "/main-menu/dashboard" ? null :
                        <MediaPlayer
                            theme={props.theme}
                            mode={"side"}
                            width={drawerWidthPC}
                        />}
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