import React from 'react';
import { useState } from 'react';

// import all ui cores
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import './ManageThemeView.scss';

// import all local files 
import styles from '../../assets/jss/components/theme/themeStyle.js';

import Themelist from './ThemeList.js';
import ColorPalette from './ColorPalette.js';

const useStyles = makeStyles(styles);

export default function ManageThemeView(props) {
    // props handleChange => changes the theme and the sidebar will change 

    const classes = useStyles();

    // states
    const [currColor, setColor] = useState(props.theme.colors.primary);
    const [currIndex, setIndex] = useState(0);

    const handleColorChange = (color, index) => {
        // hex representation of color
        setIndex(index)
        switch (index) {
            case 0:
                props.theme.colors.primary = color;
                setColor(props.theme.colors.primary);
                break;
            case 1:
                props.theme.colors.secondary = color;
                setColor(props.theme.colors.secondary);
                break;
            case 2:
                props.theme.colors.tertiary = color;
                setColor(props.theme.colors.tertiary);
                break;
            case 3:
                props.theme.colors.primarytext = color;
                setColor(props.theme.colors.primarytext);
                break;
            case 4:
                props.theme.colors.secondarytext = color;
                setColor(props.theme.colors.secondarytext);
                break;
        }
        const newtheme = [
            {
                "themeName": props.theme.themeName,
                "colors": {
                    "primary": props.theme.colors.primary,
                    "secondary": props.theme.colors.secondary,
                    "tertiary": props.theme.colors.tertiary,
                    "primarytext": props.theme.colors.primarytext,
                    "secondarytext": props.theme.colors.secondarytext
                }
            }
        ]
        props.handleChange(newtheme[0])
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.pagename} variant="h5">Themes</Typography>
            <Divider />
            <section>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        <Themelist
                            theme={props.theme}
                            color={currColor}
                            handleColorChange={(currColor, currIndex) => handleColorChange(currColor, currIndex)}
                        />
                    </div>
                    <div className="wide-rect">
                        <ColorPalette
                            handleColorChange={(currColor, currIndex) => handleColorChange(currColor, currIndex)}
                            color={currColor}
                            index={currIndex}
                        />
                    </div>
                </div>
                <div className="square">
                </div>
            </section>
        </div>
    );
}
