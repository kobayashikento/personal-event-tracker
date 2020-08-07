import React from 'react';
import { Switch, Route } from "react-router-dom";

// import styles
import { makeStyles, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import core ui 
import CssBaseline from '@material-ui/core/CssBaseline';

// import files 
import Sidebar from '../components/Sidebar.js';
import Appbar from '../components/Appbar.js';
import styles from '../assets/jss/components/mainmenuStyle.js';
import { theme1 } from '../assets/jss/masterStyle.js';

import routes from '../routes.js';

import themes from '../assets/data/themes.json';
const useStyles = makeStyles(styles);

export default function MainMenu() {
    const classes = useStyles();

    let theme;
    themes.forEach(th => {
        if (typeof (th) != undefined) {
            if (th.themeName === "default") {
                theme = th;
            }
        }
    })
    
    // states 
    const [activeTheme, setTheme] = React.useState(theme)
       const handleChange = (event, theme) => {

    }

    // set it to defualt until a file manager is code

    const switchRoutes = (
        <Switch>
            {routes.map((prop, index) => {
                return (
                    <Route
                        key={index}
                        path={prop.path}
                        render={(props) => <prop.component {...props} theme={theme} />}
                    >
                    </Route>
                );
            })}
        </Switch>
    );

    let muiTheme = createMuiTheme({
        overrides: {
            MuiListItem: {
                root: {
                    "&$selected": {
                        backgroundColor: theme.colors.secondary,
                    }
                }
            },
        },
        palette:{
            primary: {
                main: theme.colors.primary
            },
            secondary: {
                main: theme.colors.secondary
            },
        },
    })
    muiTheme = responsiveFontSizes(muiTheme)

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <div className={classes.wrapper}>
                {/* Remove Appbar for now */}
                {/* <Appbar
                    routes={routes}
                /> */}
                <Sidebar
                    routes={routes}
                    theme={activeTheme}
                    handleChange={() => handleChange}
                />
                <div className={classes.contentsWrapper}>
                    {switchRoutes}
                </div>
            </div>
        </MuiThemeProvider>
    );
}



