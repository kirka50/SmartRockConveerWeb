import React, {useEffect, useState} from 'react';
import classes from './Styles/Containers.module.css'
import InputField from "./InputField";
import ConfirmButton from "./ConfirmButton";
import axios from "axios";

const OptionsPanel = ({children, settings, set}) => {


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value)
        axios.post('http://127.0.0.1:8000/settings',{big_size: event.target[0].value})
                             .then(response => {
                                 console.log(response.data)
                                 }
                             ).catch(error => console.log(error))
    }



    return (
        <form onSubmit={handleSubmit} className={classes.info}>
            <InputField type="text"
                        name="settings"
                        ref={node => (this.inputNode = node)}
                        placeholder={set}
            >Размер негабарита:</InputField>
            Растояние между негабаритом: {children}
            <ConfirmButton type="submit">Потвердить</ConfirmButton>
        </form>
    );
};

export default OptionsPanel;