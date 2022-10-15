import React from 'react';
import Label from "./Label";

const InputField = ({children,...props}) => {
    return (
        <Label>
            {children}
            <input {...props}/>
        </Label>
    );
};

export default InputField;