import React from 'react';
import './main-menu.css'
import DisplayServer from './display-server'
import { Container } from '@material-ui/core'
import Box from '@material-ui/core/Box';


class MainMenu extends React.Component {
    render() {
        return (
            <Container className="main-container" maxWidthSm>

            </Container>
        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}







{/* 
                <Box className="navigation-bar">

                </Box>
                <Box className="display-box">
                    <header className="main-header">

                        <h1>Server Status</h1>
                        <h6><DisplayServer /></h6>
                    </header>
                </Box> */}


export default MainMenu;