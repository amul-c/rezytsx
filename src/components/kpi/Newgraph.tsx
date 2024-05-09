import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { RootState } from '../../store'; // Import RootState if not already imported
import { useSelector } from 'react-redux';
import transparent from "../../assets/transparent.png"
import { CategoryScale, Chart } from 'chart.js';
import { registerables } from 'chart.js';
import { MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chart.css';
Chart.register(...registerables);
Chart.register(CategoryScale);

export default function NewGraph() {
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const [apiData, setApiData] = useState([]);
  const { propertyId } = useParams();
  const [interval, setInterval] = useState('week');

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

  const generateLabels = (interval) => {
    switch (interval) {
      case 'week':
        if (isLargeScreen) {
          return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        } else {
          return ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        }
      case 'month':
        if (isLargeScreen) {
          return ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        } else {
          return ['W1', 'W2', 'W3', 'W4'];
        }
      case 'year':
        if (isLargeScreen) {
          return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];
        } else {
          return ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
        }
      default:
        return [];
    }
  };
  
  const labels = generateLabels(interval);
  const data = {
    labels,
    datasets: apiData.map((entry, index) => ({
      label: `${index==0 ? "Estimated Usage" :" Current Usage"}`,
      data: entry[interval],
      backgroundColor: index === 0 ? '#00C17B' : '#01337C',
      barThickness: 20,
      borderWidth: 4,
      borderRadius: 8,
      borderColor: '#ffff',
    })),
  };
  

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 20,
          boxHeight: 20,
        },
      },
      title: {
        display: isLargeScreen ? true : false,
        text: 'Water kpi',
        position: 'top',
        align: 'start',
        color: '#01337C',
      },
      backgroundColor: '#ffff',
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: '14px',
            family: 'inter',
            weight: '500',
            lineHeight: isLargeScreen ? '2' : '0.5',
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: '14px',
            family: 'inter',
            weight: '500',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="w-[100%] ">
        {!isLargeScreen &&
          <div
            id="navbar"
            className="w-[100%] h-[3rem] bg-blue rounded-lg  flex items-center"
            style={{
              backgroundColor: "darkblue",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ order: "1" }}
              className=" mx-1 gap-[1rem] flex items-center"
            >
              <img className="w-6 h-6" src={transparent} alt="" />
              <div style={{ color: "white" }} className="">
                Water KPI
              </div>
            </div>

            <Select className='h-[2.4rem] mr-[6px] '
              value={interval}
              onChange={(e) => handleIntervalChange(e.target.value)}
              variant="outlined"
              style={{ height: '2.4rem', marginRight: '6px', marginLeft: '16px', position: 'relative', top: '0', right: '0', order: '2', backgroundColor: '#EDF1F7' }}
            >
              <MenuItem value="week">Weekly</MenuItem>
              <MenuItem value="month">Monthly</MenuItem>
              <MenuItem value="year">Yearly</MenuItem>
            </Select>

          </div>
        }
        <div className='bg-[white] '>
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
                top: '69px',
                right: '267px',
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
          <Bar style={{ backgroundColor: '#FFFF' }} options={options} data={data} />
        </div>

      </div>

    </div>
  );
}
