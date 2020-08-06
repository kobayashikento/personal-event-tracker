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



export default function ColorPalette(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <BlockPicker
                width="60%"
                className={classes.blockpicker}
                triangle="hide"
            />
            <Button className={classes.inputButton} variant="outlined">Save</Button>
            <Button className={classes.inputButton} variant="outlined">Reset</Button>
            <SliderPicker
                className={classes.sliderpicker}
            />
        </div>
    );
}

