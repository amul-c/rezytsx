
import fire from "../../assets/fire.png"
import arrow from "../../assets/icon.png"
import yellowarrow from "../../assets/yellow.png"
import drop from "../../assets/drop.png"
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState,useEffect } from 'react'
import axios from 'axios'
const ActiveAlerts = ({propertyId}) => {
const [data,setData]=useState([])
  async function getData() {
    try {
      const response = await axios.get(`http://localhost:8080/device/active-alert/property/${propertyId}`);
     
      setData(response.data); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{getData()},[])
  const {isLargeScreen } = useSelector((state: RootState) => state.screenSize);


  return (
  <>
<div className={`${isLargeScreen ? 'm-4' : 'm-2'}`}>
<div className='w-[100%] h-[2rem] bg-[#01337C] text-white  font-[inter] font-small text-[18px] rounded flex items-center '>Active Alerts</div>
<ul>
      {data.map((alert) => {
        let backgroundColor = 'white'; // Initialize background color variable

        // Check the value of alert.name and set the background color accordingly
        if (alert.name === 'Fire Alarm') {
          backgroundColor = '#FFC7C4';
         
        } else if (alert.name === 'Leak') {
          backgroundColor = '#FFEFD7';
        }

        return (
          <li key={alert.name} className={`w-[100%] h-[3rem] mt-2 items-center flex rounded justify-between`} style={{ backgroundColor }}>
            <div className='flex flex-row gap-2 ml-2 order-1'>
            <img className="h-6 w-6" src={alert.name === 'Fire Alarm' ? fire : alert.name === 'Leak' ? drop : ''} alt="" />

            <div style={{ color: alert.name === 'Fire Alarm' ? '#F05348' : alert.name === 'Leak' ? '#FF9900' : 'black' }}>
                {alert.name}</div>
            </div>
            <div className='order-2 mr-2 flex flex-row gap-1' style={{ color: '#F05348 '}}>
              <div>Building {alert.buildingId} - Unit {alert.unitId}</div>
              <img className="h-6 w-6" src={alert.name === 'Fire Alarm' ? arrow : yellowarrow} alt="" /> 
            </div>
          </li>
        );
      })}
    </ul>
</div>
  </>
  )
}

export default ActiveAlerts