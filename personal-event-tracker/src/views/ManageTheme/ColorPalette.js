import React from 'react';

// import material ui
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { BlockPicker } from 'react-color';
import { SliderPicker } from 'react-color';

import styles from '../../assets/styles/components/theme/themepaletteStyle.js';

const useStyles = makeStyles(styles);

export default function ColorPalette(props) {
    // props: handleColorChange(color,index), color, index
    const classes = useStyles();
    
    // states
    const handleChangeComplete = (color) => {
        try {
            props.handleColorChange(color.hex);
        } catch(e) { }
    }

    const handleChange = (color) => {
        try {
            props.handleColorChange(color.hex);
        } catch(e) { }
    }

    return (
        <div className={classes.container}>
            <BlockPicker
                width="60%"
                className={classes.blockpicker}
                triangle="hide"
                color={props.color}
                onChangeComplete={handleChangeComplete}
            />
            <div className={classes.innercontainer}>
                <Button className={classes.resetbutton} variant="outlined">Reset</Button>
            </div>
            <SliderPicker
                className={classes.sliderpicker}
                color={props.color}
                onChangeComplete={handleChangeComplete}
                onChange={handleChange}
            />
        </div>
    );
}

