import Sensors from "./Sensors"
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

const MobileUnit = () => {
  const [unitData,setUnitData]=useState([]);
  const {buildingId} =useParams()
  
  async function getUnitData(){
    const response = await axios.get(`http://localhost:8080/unit/info/${buildingId}`);
  
    setUnitData(response.data);
   
  }


  useEffect(()=>{getUnitData()},[])

  return (
<>
<div className="bg-[#EDF1F7] w-(100%]  h-[fit-content] my-4  rounded-md relative top-[3rem] pb-[4rem] " id="sensors">
     <Sensors unitData={unitData}  />
    </div>
</>
  )
}

export default MobileUnit