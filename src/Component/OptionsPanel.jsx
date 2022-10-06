import React from 'react';
import classes from './Styles/Containers.module.css'
const OptionsPanel = ({children}) => {
    return (
        <div className={classes.info}>
            {children}
        </div>
    );
};

export default OptionsPanel;