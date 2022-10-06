import React from 'react';
import classes from './Styles/Containers.module.css'
const MonitorPanel = ({children}) => {
    return (
        <div className={classes.monitor}>
            {children}
        </div>
    );
};

export default MonitorPanel;