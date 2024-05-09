import React, { useState,useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import { CategoryScale, Chart } from "chart.js";
import { registerables } from 'chart.js';
import { MenuItem, Select } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store'; // Import RootState if not already imported
import { useSelector } from 'react-redux';
import "./c9.css"
Chart.register(...registerables);
Chart.register(CategoryScale);


const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hide the legend
    },
    title: {
      display: true,
      text: 'Water usage',
      position:'top',
      align:'start',
      color:'#01337C',
      font:{
        size:'8px'
      }
    },
    backgroundColor: '#ffff',
  },


  scales: {
    x: {
        ticks: {
            font: {
                size: '8px',
                family:'inter',
               
                weight:'500',
                lineHeight:'0.5'
                
            }
        },
        grid: {
          display: false,
        },
    },
    y: {
        ticks: {
            font: {
              size: '8px',
              family:'inter',
              
              weight:'500',
              lineHeight:'0.7'
              
            },
            maxTicksLimit: 4, 
        },
        grid: {
          display: false,
        }
      
    }                       
}
};

// Function to generate labels based on interval
const generateLabels = (interval) => {
  switch (interval) {
    case 'week':
      return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    case 'month':
      return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    case 'year':
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    default:
      return [];
  }
};

export default function WaterUsageUnitWise() {
  const [apiData, setApiData] = useState([]);
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const { propertyId } = useParams();
  const [interval, setInterval] = useState('week');
  const chartRef = useRef(null);
  const labels = generateLabels(interval);
  const createLinearGradient = (context) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(1, 58, 140, 1)');
    gradient.addColorStop(0.5, 'rgba(1, 51, 124, 1)');
    gradient.addColorStop(1, 'rgba(0, 193, 123, 1)');
    return gradient;
  }
  

  const data = {
    labels,
    datasets: apiData.map((entry, index) => ({
      label: `${index==0 ? "Estimated Usage" :" Current Usage"}`,
      data: entry[interval],
      backgroundColor: createLinearGradient,
      barThickness: 25,
      borderWidth: 4, 
      borderRadius: 8,
      borderColor: '#ffff', 
    })),
  };
  
  async function getData(interval) {
    try {
      const response = await axios.get(`http://localhost:8080/graph/${interval}/property/1`);
    
      setApiData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData(interval);
  }, [interval]);

  

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  useEffect(() => {
    const chartInstance = chartRef.current;
    if (chartInstance) {
      // Set the height of the canvas
      chartInstance.canvas.style.height = '200px'; // Adjust this value as needed
    }
  }, [interval]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className='bg-[white] w-[100%] p-2 '>
    {
            isLargeScreen &&
            <Select
              value={interval}
              onChange={(e) => handleIntervalChange(e.target.value)}
              variant="outlined"
              style={{
                marginLeft: '16px',
                position: 'relative',
                color: '#01337C',
                top: '44px',
                right: '0',
                zIndex: '99999',
                float: 'right',
                height: '29px',
                background: 'linear-gradient(90deg, rgba(22, 109, 236, 0.3), rgba(10, 89, 203, 0.3), rgba(6, 94, 220, 0.3))'
              }}
            >
              <MenuItem value="week">Weekly</MenuItem>
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
            </Select>
          }
    <Bar ref={chartRef} style={{ backgroundColor: '#FFFF'}} options={options} data={data} />
    
    </div>
   
    
    </div>
  );
  
}
