import React from 'react';
import classes from './Styles/Containers.module.css'

const MainContainer = ({children}) => {
    return (
        <div className={classes.mainComp}>
            {children}
        </div>
    );
};

export default MainContainer;