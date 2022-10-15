import React from 'react';
import Label from "./Label";
import classes from './Styles/Containers.module.css'

const InputField = ({children,...props}) => {
    return (
        <Label>
            {children}
            <input className={classes.input} placeholder=" введите размер в мм" {...props} />
        </Label>
    );
};

export default InputField;