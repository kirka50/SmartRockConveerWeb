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
                         label: 'Кол-во камней в классах',
                         data: graph2Data.y,
                         backgroundColor: 'lightblue',
                         borderColor:'lightblue',
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