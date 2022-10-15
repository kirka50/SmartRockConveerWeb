import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as Chartjs } from 'chart.js/auto'

const FlowImg = (hideImg,src) => {
    return (
        <img hidden={hideImg} src={src}>

        </img>
    );
};

export default FlowImg;