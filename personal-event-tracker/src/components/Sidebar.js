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
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    onClose={handleDrawerToggle}
                    variant="permanent"
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
                    <Divider variant="middle" />
                    {drawerItems(props)}
                </Drawer>
            </Hidden>
        </div>
    );
}