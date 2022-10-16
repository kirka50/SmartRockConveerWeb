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
                             'rgba(0, 0, 153, 1)',
                             'rgba(255, 0, 5, 1)',
                             'rgba(255, 0, 219, 1)',
                             'rgba(255, 209, 0, 1)',
                             'rgba(56, 255, 250, 1)',
                             'rgba(0, 255, 250, 1)',
                             'rgba(178, 178, 255, 1)',
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