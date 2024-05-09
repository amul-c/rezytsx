import KPI from "./kpi/KPI";
import Insurance from "./insurance/Insurance";
import NewGraph from './kpi/Newgraph';
import FootageContainer from './FootageContainer';
import OfflineDevices from './OfflineDevices/OfflineDevices';
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useState } from "react";
const MobileHome = () => {
  const [propertyId,setPropertyId]=useState('1')
  const { isSmallScreen, isLargeScreen } = useSelector((state: RootState) => state.screenSize);

  return (
    <>
      <div id="mainContainer" className={isLargeScreen ? "bg-[#D8DFEA] flex flex-col gap-4 top-[2.9rem] relative z-1 pb-[4rem]" :"bg-[#D8DFEA] flex flex-col gap-4 top-[2.9rem] relative z-1 pb-[4rem] p-4"}>
        <OfflineDevices propertyId={propertyId} />
          <NewGraph propertyId={propertyId} />
          <FootageContainer />
          <KPI propertyId={propertyId}/>
          <Insurance propertyId={propertyId}/>
          
        </div>

    </>
  );
};

export default MobileHome;
