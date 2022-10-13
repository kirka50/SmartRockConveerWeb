import React from 'react';
import classes from './Styles/Button.module.css'

const ConfirmButton = ({children,...props}) => {
    return (
        <button {...props} className={classes.inputButton}>
            {children}
        </button>
    );
};

export default ConfirmButton;