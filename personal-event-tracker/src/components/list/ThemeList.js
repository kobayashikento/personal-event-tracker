import React from 'react';
import { useForm } from 'react-hook-form';

// import styles from MUI
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';


import styles from '../../assets/jss/components/list/themelistStyle.js';
import themes from '../../assets/data/themes.json';

const useStyles = makeStyles(styles);


export default function ThemeList(props) {
    const classes = useStyles();

    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    // set default theme 
    let defaultTheme;
    themes.forEach(theme => {
        if (theme.themeName === "default") {
            defaultTheme = theme;
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <List>
                <ListItem>
                    <TextField ref={register} id="primary-color" label="Primary Color" defaultValue={defaultTheme.colors.primary} variant="outlined" />
                </ListItem>
                <ListItem>
                    <TextField ref={register} id="scondary-color" label="Secondary Color" defaultValue={defaultTheme.colors.secondary} variant="outlined" />
                </ListItem>
                <ListItem>
                    <TextField ref={register} id="tertiary-color" label="Tertiary Color" defaultValue={defaultTheme.colors.tertiary} variant="outlined" />
                </ListItem>
                <ListItem>
                    <TextField ref={register} id="tertiary-color" label="Tertiary Color" defaultValue={defaultTheme.colors.tertiary} variant="outlined" />
                </ListItem>
                <ListItem>
                    <TextField ref={register} id="prim-text-color" label="Primary Text Color" defaultValue={defaultTheme.colors.primarytextColor} variant="outlined" />
                </ListItem>
                <ListItem>
                    <TextField ref={register} id="secon-text-color" label="Secondary Text Color" defaultValue={defaultTheme.colors.secondarytextColor} variant="outlined" />
                </ListItem>
            </List>

        </form>
    );
}