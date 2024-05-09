
import sensorData from './Sensordata';
import danger from "../../assets/warning.png"
import safe from "../../assets/icon.png"
import full from "../../assets/fullbattery.png"
import half from "../../assets/halfbattery.png"
import low from "../../assets/lowbattery.png"
import high from "../../assets/hightemperature.png"
import humidity from "../../assets/humidity.png"
import calender from "../../assets/calender.png"
import right from "../../assets/right.png"
import thumbnail from "../../assets/thumbnail.png"
import back from "../../assets/back.png"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';
const Sensors = ({unitData}) => {
const {unitId}=useParams();
    const {isLargeScreen } = useSelector((state: RootState) => state.screenSize);

    const sensormapping={
        temperature:high,
        humidity:humidity
    }
    return (
        <>
      {isLargeScreen && <div className='flex flex-row items-center gap-2'> <button><img src={back} className='h-6 w-6' alt="" /></button>
      <div className=''>  Unit {unitId}</div></div>}

        <ul className='gap-[2rem] flex flex-col p-4'>
    
    {
        unitData?.deviceList?.map((item,index)=>{
         return(
            <li className='bg-[white] flex flex-col gap-1 p-2 rounded-lg '>
            <div className={`flex justify-between ${isLargeScreen ? 'flex-row' : 'flex-col gap-2 '}`}   >   
            <div className='order-1'>
                 <div className='flex flex-row gap-2'>
                    {parseInt(item.reading.temperature.split("°")[0]) >=40 || parseInt(item.reading.humidity.split("%")[0])>=40 ?
                    <img src={danger} className='h-6 w-6' alt="" />
                    :
                    <img src={right} className='h-6 w-6' alt="" />

                    }
    
     <div>{item.name}</div>
     <div className='text-[#5C626E]'>ID: {item.id}</div>
                 </div>
                 <div>
     
                 </div>
             </div>
     
             <div className='order-2 flex flex-row gap-1'>
                {item.battery<=100 && item.battery >50 &&
                     <button className=' bg-[#00C17B] flex flex-row gap-1 items-center  text-neutral-100 rounded-md max-h-[2.4rem] text-sm p-1'>
                     <img className="h-6 w-6" src={full} alt="" />
                     <div>Battery</div>
                     <div id="percentage" >{item.battery}</div>
                 </button>
                }
                {item.battery<=50 && item.battery>25 && 
                     <button className=' bg-[#FF9900] flex flex-row gap-1 items-center  text-neutral-100 rounded-md max-h-[2.4rem]'>
                     <img className="h-6 w-6" src={half} alt="" />
                     <div>Battery</div>
                     <div id="percentage">{item.battery_level}</div>
                 </button>
                }
                {item.battery==15 &&
                     <button className=' bg-[#F05348] flex flex-row gap-1 items-center  text-neutral-100 rounded-md max-h-[2.4rem]'>
                     <img className="h-6 w-6" src={low} alt="" />
                     <div>Battery</div>
                     <div id="percentage">{item.battery_level}</div>
                 </button>
                }
                 <button className='w-[5.5rem] h-[2.4rem]  bg-[#00C17B] text-white rounded-md'>{item.connection}</button>
             </div>
            </div>
     
     
            <div className={`flex flex-row justify-between ${isLargeScreen ? 'flex-row' : 'flex-col gap-2'}`}>
            <div className={`order-1 flex gap-4 ${isLargeScreen ? 'flex-row' : 'flex-col '}`}>
    {Object.keys(item.reading).map((key, idx) => (
        <div key={idx} className='h-[2.4rem] flex flex-row gap-2 p-2 items-center justify-center h-[2.2rem] text-[red] rounded-md max-h-[2.4rem] w-[fit-content] w-[fit-content]' style={{ backgroundColor: key === 'temperature' ? 'rgba(255, 87, 77, 0.24)' : '#EDF1F7', color: key === 'temperature' ? 'red' : 'black' }}>
            <img className="h-6 w-6" src={sensormapping[key]} alt="" />
            <div>{key}</div>
            <div>{item.reading[key]}</div>
        </div>
    ))}
</div>

              <div className='order-2 flex flex-row bg-[#EDF1F7] p-1 text-[11px]'>
     <img  className="h-6 w-6" src={calender} alt="" />
     <div className='flex flex-col'>
     <div id="date">{item.installedDate},</div>
     <div>09:27 PM</div>
     </div>
              </div> 
              </div>
         </li>
         )
        })
    }
        </ul>
  
        </>
    )
       
}

export default Sensors