import React from 'react';

// import all ui cores
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import '../../assets/styles/goldenRatioGrid.scss';

// import all local files 
import styles from '../../assets/styles/components/theme/themeStyle.js';

import Themelist from './ThemeList.js';
import ColorPalette from './ColorPalette.js';
import ThemePreview from './ThemePreview.js';

const useStyles = makeStyles(styles);

export default function ManageThemeView(props) {
    // props handleChange => changes the theme and the sidebar will change 

    const classes = useStyles();

    // states
    const [currIndex, setIndex] = React.useState(0);

    const handleChangeIndex = (index, color) => {
        setIndex(index, ()=>{
            handleColorChange(color)
        })
    }

    const handleColorChange = (color) => {
        let newtheme = {
            themeName: props.theme.themeName,
            colors: {
                primary: props.theme.colors.primary,
                secondary: props.theme.colors.secondary,
                tertiary: props.theme.colors.tertiary,
                primarytext: props.theme.colors.primarytext,
                secondarytext: props.theme.colors.secondarytext
            }
        }
        console.log(currIndex)
        switch (currIndex) {
            case 0: newtheme.colors["primary"] = color
                break;
            case 1: newtheme.colors["secondary"] = color
                break;
            case 2: newtheme.colors["tertiary"] = color
                break;
            case 3: newtheme.colors["primarytext"] = color
                break;
            case 4: newtheme.colors["secondarytext"] = color
                break;
            default:
        }
        console.log(newtheme.colors.primary)
        props.handleChange(newtheme)
    }

    const getCurrColor = () => {
        try {
            switch (currIndex) {
                case 0: return props.theme.colors.primary;
                case 1: return props.theme.colors.secondary;
                case 2: return props.theme.colors.tertiary;
                case 3: return props.theme.colors.primarytext;
                case 4: return props.theme.colors.secondarytext;
                default:
            }
        } catch{ }
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
                            index={currIndex}
                            handleColorChange={(color) => handleColorChange(color)}
                            handleChange={(theme) => props.handleChange(theme)}
                            handleChangeIndex={(index,color) => handleChangeIndex(index,color)}
                        />
                    </div>
                    <div className="wide-rect">
                        <ColorPalette
                            handleColorChange={(currColor) => handleColorChange(currColor)}
                            color={getCurrColor()}
                        />
                    </div>
                </div>
                <div className="square">
                    <ThemePreview />
                </div>
            </section>
        </div>
    );
}
