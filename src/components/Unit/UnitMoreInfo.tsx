import InstalledDevicesUnitWise from "./InstalledDevicesUnitwise";
import UnitInfo from "./UnitInfo"
import axios from "axios";
import { useState,useEffect } from "react";
const UnitMoreInfo = () => {
  const [unitData,setUnitData]=useState([]);

  async function getUnitData(){
   const response = await axios.get("http://localhost:8080/unit/info/1");
   setUnitData(response.data);
   
  }


  useEffect(()=>{getUnitData()},[])

  return (
   <>
   <div className="bg-[#EDF1F7] w-(100%]  h-[fit-content] my-4  rounded-md relative top-[3rem] pb-[4rem] h-[100vh] " id="sensors">

   <UnitInfo unitData={unitData} />
   <InstalledDevicesUnitWise unitData={unitData}/>
</div>
   </>
  )
}

export default UnitMoreInfo