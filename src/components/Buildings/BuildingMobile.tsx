import building from "../../assets/bluebuilding.png"
import bluefilter from "../../assets/bluefilter.png"
import buildingunit from "../../assets/buildingunits.png"
import devices from "../../assets/buildingdevices.png"
import alarms from "../../assets/buildingalarms.png"
import screws from "../../assets/buildingscrew.png"
import divide from "../../assets/break.png"
import th from "../../assets/thumbnail.png"
import back from "../../assets/back.png"
import axios from "axios";
import { useEffect ,useState} from "react";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

const BuildingMobile = () => {
  const { propertyId } = useParams();

  const [data,setData] =useState([])
  async function getData(){
    const response= await axios.get(`http://localhost:8080/building/property/${propertyId}/list`)
    setData (response.data);
  }
  
  useEffect(()=>{
    getData()
  },[])
  return (
    <>
      <div className="bg-[#EDF1F7]  flex flex-col mb-4 mx-4 rounded-t-lg relative top-[6rem]">
        <header className="flex flex-row justify-between bg-[white]  h-[3rem] rounded-t-lg items-center px-1">
          <div className="flex flex-row gap-1 order-1 items-center justify-center ">
            <img className="h-4 w-4" src={back} alt="" />
            <img src={building} alt="" className="h-6 w-6" />
            <div className="text-[#01337C]">Property Name</div>
          </div>

          <div className='flex flex-row gap-1 order-2'>
            <button id="sortBy " className="flex flex-row items-center gap-2 justify-center bg-[#C0D9FF] p-1 rounded items-center justify-center">
              <img className="h-6 w-6 " id="filter" src={bluefilter} alt="" />
            </button>
            <div id="count"></div>
          </div>
        </header>
        <div id="content" className="">
          <>
            <div className=' lg:w-[100%]  2xl:w-[100%] sm:w-full xs:w-full rounded-lg w-[100%] flex justify-center'>
              <table className="w-[95%] divide  -y divide-gray-200 border-separate border-spacing-y-3 md:m-4 lg:m-4 m-[10px] ">
               
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <Link to= {`/building/${item.id}`}> <tr key={index} className="bg-[white] flex flex-col p-1">
                    <div className="flex flex-row justify-between items-center">   <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="order-1 rounded-l-xl px-6 py-4 whitespace-nowrap text-sm font-sm "><div className="flex flex-row items-center gap-1"><img className="h-4 w-4" src={th} alt="" /> <div>{item.name}</div></div></td>
                       <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm flex justify-end order-2 ">
 
                        <div className="flex flex-col gap-1 items-center">
                         <div className="flex flex-row gap-1 items-center">
                         <div style={{backgroundColor:'rgba(255, 153, 0, 0.2)'}} className="h-10 w-10 bg-[rgba(255, 83, 73, 0.2)] rounded items-center justify-center flex"><img className="h-6 w-6 " src={screws} alt="" /></div>
                         <div style={{backgroundColor:'rgba(255, 83, 73, 0.2)'}} className="h-10 w-10 bg-[rgba(255, 83, 73, 0.2)] rounded items-center justify-center flex"><img className="h-6 w-6 " src={alarms} alt="" /></div>
                       
                         </div>
                         
                     
                        </div>
                         </td></div>
 
                         <td className="">  <div className="flex flex-row gap-2 bg-[#EDF1F7] h-[2.5rem] items-center justify-center rounded w-[100%] p-2">
                         <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                         <img className="h-4 w-4" src={buildingunit} alt="" />
                         <div style={{color:'rgba(92, 98, 110, 0.7)'}} className="text-[rgba(92, 98, 110, 0.7)]">UNITS {item.unitCount}</div>
                         </div>
                         <img className="h-4 " src={divide} alt="" />
                         <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                         <img className="h-4 w-4" src={devices} alt="" />
                         <div  style={{color:'rgba(92, 98, 110, 0.7)'}}  className="text-[rgba(92, 98, 110, 0.7)]">Devices {item.deviceCount}</div>
                         </div>
                         </div></td>
 
                     </tr></Link>
                   
                  ))}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default BuildingMobile