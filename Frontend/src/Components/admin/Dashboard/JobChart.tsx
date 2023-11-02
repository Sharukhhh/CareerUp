import React from 'react';
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    export const options = {
        responsive: true,
        plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Job Postings and Applications Per Month',
        },
        },
    };

    interface JobChartProps{
        monthlyJobPostedData : number[];
        monthlyJobAppliedData : number[];
    }

const JobChart : React.FC<JobChartProps> = ({monthlyJobPostedData , monthlyJobAppliedData}) => {

    const labels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'];
    const actualLabels = labels.slice(0 , monthlyJobPostedData?.length);

    const data = {
        labels :actualLabels,
        datasets : [
            {
                label : 'Jobs Posted',
                data : monthlyJobPostedData,
                backgroundColor: 'rgb(75, 192, 192)',
            },
            {
                label : 'Job Applications',
                data : monthlyJobAppliedData,
                backgroundColor: 'rgb(53, 162, 235)',
            }
        ]
    }

  return (
    <>
        <Bar
        options={options}
        data={data}
        />
    </>
  )
}

export default JobChart