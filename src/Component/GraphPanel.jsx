import React from 'react';
import classes from './Styles/Containers.module.css'

const GraphPanel = ({children}) => {
    return (
        <div className={classes.graph}>
            {children}
        </div>
    );
};

export default GraphPanel;