import React  from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive : true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title : {
            display : true,
            text: 'Users Joined Traffic Per Month',
        },
    },
};


interface LineChartProps {
    userMonthlyData : number[],
    companyMonthlyData : number[],
}

const LineChart : React.FC<LineChartProps> = ({userMonthlyData , companyMonthlyData}) => {

    const labels = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'];
    const actualLables = labels.slice(0 , userMonthlyData?.length);

    const data = {
        labels : actualLables,
        datasets: [
            {
                label: 'Candidates',
                data: userMonthlyData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
    
            {
                label: 'Companies',
                data: companyMonthlyData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }
  return (
    <>
        <Line
        options={options}
        data={data}
        />
    </>
  )
}

export default LineChart