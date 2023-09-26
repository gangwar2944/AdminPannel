import React from 'react'
import ChartComponent from '../components/ChartComponent';

const Dashboard = () => {

  const data = [
    { year: '2020', count: 10 },
    { year: '2021', count: 25 },
    { year: '2022', count: 15 },
    { year: '2023', count: 55 },
    // Add more data points as needed
  ];

  return (
    <div>
      Dashboard
      <ChartComponent data={data} />
    </div>
  )
}

export default Dashboard