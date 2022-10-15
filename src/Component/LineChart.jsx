import React from 'react';
import { Line } from 'react-chartjs-2';



const LineChart = ({graphData,Label}) => {
    return (
        <Line datasetIdKey='id'
              data={{
                  labels: graphData.x,
                  datasets: [
                      {
                          id: 1,
                          label: {Label},
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