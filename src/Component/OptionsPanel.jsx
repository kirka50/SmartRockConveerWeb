import React, {useEffect, useState} from 'react';
import classes from './Styles/Containers.module.css'
import InputField from "./InputField";
import ConfirmButton from "./ConfirmButton";

const OptionsPanel = ({children, settings, stop}) => {


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
        //axios.post('https://gold.app.sosus.org/settings',{event.target[0].value})
        //                     .then(response => {
        //                         console.log(response.data)
        //                         }
        //                     }).catch(error => console.log(error))
    }



    return (
        <form onSubmit={handleSubmit} className={classes.info}>
            <InputField type="text"
                        name="settings"
                        ref={node => (this.inputNode = node)} >Размер негабарита:</InputField>
            <ConfirmButton type="submit">Потвердить</ConfirmButton>
        </form>
    );
};

export default OptionsPanel;