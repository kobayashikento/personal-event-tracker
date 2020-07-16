import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import ResponsiveDrawer from './ResponsiveDrawer.js';
import styles from '../assets/jss/layouts/mainMenuStyle.js';

import routes from "../routes.js"; 

const useStyles = makeStyles(styles);

// const switchRoutes = (
//     <Switch> 
//         {routes.map((prop, index) => {
//             return ( 
//                 <Route
//                     key={index}
//                     path={"/mainmenu" + prop.path}             
//                 />
//             );
//         })}
//     </Switch>
// );

export default function MainMenu(){
    // styles 
    const classes = useStyles(); 
    // states

    return (
        <div className={classes.wrapper}>
            <ResponsiveDrawer
                routes={routes}          
            />
            {/* <div>{switchRoutes}</div> */}
        </div>
    );
} 



