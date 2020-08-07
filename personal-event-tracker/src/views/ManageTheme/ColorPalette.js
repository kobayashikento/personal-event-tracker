import React from 'react';
import { useForm } from 'react-hook-form';

// import material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { BlockPicker } from 'react-color';
import { SliderPicker } from 'react-color';

import styles from '../../assets/jss/components/theme/themepaletteStyle.js';
import themes from '../../assets/data/themes.json';

const useStyles = makeStyles(styles);

var Color = require('color');

export default function ColorPalette(props) {
    const classes = useStyles();
    
    // states
    const [currColor, setColor] = React.useState(Color('rgb(255, 255, 255)').hex());


    const handleChangeComplete = (color, event) => {
        try {
            setColor(color.hex);
        } catch(e) { }
    }

    const handleChange = (color, event) => {
        try {
            setColor(color.hex);
        } catch(e) { }
    }

    return (
        <div className={classes.container}>
            <BlockPicker
                width="60%"
                className={classes.blockpicker}
                triangle="hide"
                color={currColor}
                onChangeComplete={handleChangeComplete}
            />
            <div className={classes.innercontainer}>
                <Button className={classes.savebutton} variant="outlined">Save</Button>
                <Button className={classes.resetbutton} variant="outlined">Reset</Button>
            </div>
            <SliderPicker
                className={classes.sliderpicker}
                color={currColor}
                onChangeComplete={handleChangeComplete}
                onChange={handleChange}
            />
        </div>
    );
}

