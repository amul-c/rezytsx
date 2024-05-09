import { RootState } from "../store";
import { useSelector } from "react-redux";
import ActiveAlerts from "./ActiveAlerts/ActiveAlerts";
import InstalledDevices from "./InstalledDevices/InstalledDevices";
import PropertyInfo from "./PropertyInfo/PropertyInfo";
import { useState } from "react";
const HomeMoreInfo = () => {
  const {isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const [propertyId,setPropertyId]=useState('1')

  return (
  <>
        <div id="mainContainer" className={isLargeScreen ? "bg-[#D8DFEA] flex flex-col gap-4 top-[2.9rem] relative z-1 pb-[4rem]" :"bg-[#D8DFEA] flex flex-col gap-4 top-[2.9rem] relative z-1 pb-[4rem] p-4"}>
   <ActiveAlerts propertyId={propertyId}/>
   <InstalledDevices propertyId={propertyId} />
   <PropertyInfo propertyId={propertyId}/>

</div>
  </>
  )
}

export default HomeMoreInfo