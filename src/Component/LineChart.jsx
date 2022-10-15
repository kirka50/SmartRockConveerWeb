import React from 'react';
import { Line } from 'react-chartjs-2';



const LineChart = ({graphData}) => {
    return (
        <Line datasetIdKey='id'
              data={{
                  labels: graphData.x,
                  datasets: [
                      {
                          id: 1,
                          label: 'Первый',
                          data: graphData.y,
                          backgroundColor: 'black',
                          borderColor:'lightblue',
                          animation: false
                      },
                  ],
              }}
              height={600}
              width={1080}>

        </Line>
    );
};

export default LineChart;