import React from 'react';
import { Bar } from 'react-chartjs-2';
const BarChart = ({graph2Data}) => {
    return (
        <Bar datasetIdKey='id'
             data={{
                 labels: graph2Data.x,
                 datasets: [
                     {
                         id: 1,
                         label: 'Количество руды по классам',
                         data: graph2Data.y,
                         backgroundColor: [
                             'rgba(5, 0, 255, 1)',
                             'rgba(219, 0, 255, 1)',
                             'rgba(0, 209, 255, 1)',
                             'rgba(0, 255, 56, 1)',
                             'rgba(250, 255, 0, 1)',
                             'rgba(225, 178, 178, 1)',
                             'rgba(225, 255, 255, 1)'
                         ],
                         animation: false
                     },
                 ],
             }}
             height={600}
             width={1080}>

        </Bar>
    );
};

export default BarChart;