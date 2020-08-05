import React from 'react';

import { BlockPicker } from 'react-color';
import { SliderPicker } from 'react-color';

export default function colorPalette(props) {
    return (
        <div>
            <SliderPicker />
            <BlockPicker
                triangle="hide"
            />
        </div>
    );
}

