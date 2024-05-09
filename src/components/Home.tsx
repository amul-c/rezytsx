import KPI from "./kpi/KPI";
import Insurance from "./insurance/Insurance";
import NewGraph from './kpi/Newgraph';
import FootageContainer from './FootageContainer';
import ActiveAlerts from './ActiveAlerts/ActiveAlerts';
import OfflineDevices from './OfflineDevices/OfflineDevices';
import InstalledDevices from './InstalledDevices/InstalledDevices';
import PropertyInfo from './PropertyInfo/PropertyInfo';
import { useState } from "react";
const Home = () => {

  const [propertyId,setPropertyId]=useState('1')
  return (
    <>
      <div id="mainContainer" className="bg-[#D8DFEA] flex flex-row gap-4 relative top-[6rem]">
        <div id="leftContainer" style={{ width: 'calc(100% - 25rem)' }} className="flex flex-col gap-6 bg-[#EDF1F7] p-4 rounded-lg w-[calc(100% - 25rem)] ">
          <NewGraph />
          <div id="tablecontainer" className="flex sm:flex-col xl:flex-row lg:flex-col flex-col gap-6 sm:items-center md:items-center items-center ">
            <KPI propertyId={propertyId}  />
            <Insurance propertyId={propertyId}  />
          </div>
          <FootageContainer />
        </div>
        <div id="rightContainer" className="w-[25rem] bg-[#EDF1F7] flex flex-col gap-4 ">
          <ActiveAlerts propertyId={propertyId} />
          <OfflineDevices propertyId={propertyId} />
          <InstalledDevices propertyId={propertyId} />
          <PropertyInfo propertyId={propertyId} />
        </div>
      </div>
    </>
  );
};

export default Home;
