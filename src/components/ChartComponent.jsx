import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styled from 'styled-components';

const ChartContainer = styled.div`
  width: 80%; /* Adjust the width as needed */
  margin-left: 0; /* Remove the left margin to move the chart to the left */
  padding-left: 20px; /* Add left padding for spacing if desired */
  max-width: 400px;
  min-height: 250px;
  background-color: #fff;
  padding: 20px;
`
const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart
      }

      const ctx = chartRef.current.getContext('2d');

      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.year),
          datasets: [
            {
              label: 'Count',
              data: data.map(item => item.count),
              backgroundColor: 'rgba(10, 46, 25, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Year', // X-axis label
              },
              grid: {
                display: false, // Remove vertical grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count', // Y-axis label
              },
              grid: {
                display: false, // Remove horizontal grid lines
              },
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <ChartContainer className="chart-container">
      <canvas ref={chartRef}></canvas>
    </ChartContainer>
  );
};

export default ChartComponent;
