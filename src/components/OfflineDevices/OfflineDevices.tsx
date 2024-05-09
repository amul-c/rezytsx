import Devices from './Devices'
import arrow from "../../assets/icon.png"
import yellowarrow from "../../assets/yellow.png"
import smoke from "../../assets/smoke.png"
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import axios from "axios";
import fire from "../../assets/fire.png"
import { useEffect ,useState} from "react";
import thumbnail from "../../assets/thumbnail.png"
import drop from "../../assets/drop.png"

const OfflineDevices = ({propertyId}) => {
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
 
  const [data,setData] =useState([])
  async function getData(){
    const response= await axios.get(`http://localhost:8080/device/offline/property/${propertyId}`)
    
    setData (response.data);
  }
  
  useEffect(()=>{
    getData()
  },[])
  const iconMapping: Record<'smoke', string> = {
    smoke: smoke,
  };

  const imageMapping: Record<'arrow' | 'yellowarrow', string> = {
    arrow: arrow,
    yellowarrow: yellowarrow,
  };

interface Device {
  issue: string;
  bg: string;
  im: 'smoke';
  building: string;
  unit: string;
  offlineTime: string;
  offlineSince: string;
  imm: 'arrow' | 'yellowarrow';
}

  return (
    <>
    <div className={isLargeScreen ? 'm-4' : ''}>
      {isLargeScreen && (
        <div className='w-[100%] h-[2rem] bg-[#01337C] text-white p-1 font-small text-[18px] rounded flex items-center'>
          Offline Devices
        </div>
      )}
      <ul>
        {data.map((device: Device) =>
         {

          let backgroundColor = 'white'; // Initialize background color variable
          let icon =thumbnail;
          let colorr='black';
          // Check the value of alert.name and set the background color accordingly
          if (device.name === 'Fire Alarm') {
            backgroundColor = '#FFC7C4';
            icon =fire;
            colorr='#F05348'
           
          } else if (device.name === 'Water Meters') {
            backgroundColor = '#FFEFD7';
            icon=drop;
            colorr='#FF9900'
          }
          else if(device.name === 'Smoke Detector'){
            backgroundColor = '#FFEFD7';
            icon = smoke;
            colorr='#FF9900'
          }
  
          return (
            <li
              key={device.name}
              className={`w-[100%] h-[5rem] bg-[${backgroundColor}] mt-2 items-center flex rounded border-1 border-[#FF9900] flex-col gap-1`}
              style={{ backgroundColor: backgroundColor, borderWidth: '1px', borderColor: '#FF9900' }}
            >
              <div className='w-[100%] h-[50%] flex mt-2 justify-between'>
                <div className='flex flex-row gap-2 ml-2 order-1'>
                  <img className='h-6 w-6' src={icon} alt='' />
                  <div style={{ color: colorr }}>{device.name}</div>
                </div>
                <div className='order-2 mr-2 flex flex-row gap-1' style={{ color: colorr }}>
                  <div>
                    Building {device.buildingId} - Unit {device.unitId}
                  </div>
                  <img className='h-6 w-6' src={arrow} alt='' />
                </div>
              </div>
              <div className='justify-between h-[50%] w-[98%] bg-[#ffff] my-2 rounded flex flex-row space-between'>
                <div className='order-1 flex flex-row gap-2 items-center text-xs ml-1'>
                  <div style={{color:colorr}} className={`text-sm text-[${colorr}]`}>OFFLINE TIME:</div>
                  <div className='text-[#5C626E]'>{device.offlineTime}</div>
                </div>
                <div className='order-2 flex flex-row gap-2 items-center text-xs mr-1'>
                  <div style={{color:colorr}} className={`text-sm text-[${colorr}]`}>OFFLINE SINCE: </div>
                  <div className='text-[#5C626E]'>{device.offlineSince}</div>
                </div>
              </div>
            </li>
          )
         }
        )
        }
      </ul>
    </div>
  </>

  )
}

export default OfflineDevices