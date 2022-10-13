import React from 'react';
import classes from './Styles/Label.module.css'
const Label = ({children}) => {
    return (
        <label className={classes.InputLabel}>
            {children}
        </label>
    );
};

export default Label;