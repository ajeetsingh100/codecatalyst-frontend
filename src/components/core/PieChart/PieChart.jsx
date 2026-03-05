import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({label,pie_data,pie_label}) => {     
  console.log(pie_data)
 
  const data = {
    labels: label,
    datasets: [
      {
        label: pie_label,
        data: pie_data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(51, 204, 51)'
  
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",     
       
      },
    },
  };

  return (
    <div style={{ width:'500px', height:"300px",  margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
