import React from 'react';
import { useState } from 'react';
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
    // props: handleColorChange(color,index), color, index
    const classes = useStyles();
    
    // states
    const handleChangeComplete = (color, event) => {
        try {
            props.handleColorChange(color.hex, props.index);
        } catch(e) { }
    }

    const handleChange = (color, event) => {
        try {
            props.handleColorChange(color.hex, props.index);
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
                <Button className={classes.savebutton} variant="outlined">Save</Button>
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

