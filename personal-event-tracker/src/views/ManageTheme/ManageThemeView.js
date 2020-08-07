import React from 'react';

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
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography className={classes.pagename} variant="h5">Themes</Typography>
            <Divider />
            <section>
                <div className="flex-col-2">
                    <div className="tall-rect">
                        <Themelist
                            theme={props.theme}
                        />
                    </div>
                    <div className="wide-rect"><ColorPalette />
                    </div>
                </div>
                <div className="square">
                </div>
            </section>
        </div>
    );
}
