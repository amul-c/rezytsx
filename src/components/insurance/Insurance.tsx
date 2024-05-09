import axios from "axios";
import { useEffect, useState } from "react";

const Insurance = ({ propertyId }) => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await axios.get(
        `http://localhost:8080/insurance/property/${propertyId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, [propertyId]);

  return (
    <div className="bg-white w-full lg:w-full xl:w-1/2 2xl:w-1/2 sm:w-full xs:w-full rounded-lg">
      <div className="m-2 text-[#01337C]">Insurance Index</div>
      <table className="divide-y divide-gray-200 border-separate border-spacing-y-3 font-inter m-4 w-11/12">
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <>
             
              <tr key={`${index}-average-occupancy`} className="bg-[#EDF1F7]">
              <td style={{lineHeight:'3px'}} className="rounded-l-lg xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] font-inter">
                  Average Occupancy
                </td>
                <td style={{lineHeight:'3px'}}  className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] font-inter text-end rounded-r-lg">
                  {item.averageOccupancy}
                </td>
              </tr>
              <tr key={`${index}-eviction`} className="bg-[#EDF1F7]">
              <td style={{lineHeight:'3px'}} className="rounded-l-lg xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] font-inter">
                  Eviction
                </td>
                <td style={{lineHeight:'3px'}}  className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] font-inter text-end rounded-r-lg">
                  {item.eviction}
                </td>
              </tr>
              <tr
                key={`${index}-unregistered-vehicle`}
                className="bg-[#EDF1F7]"
              >
              <td style={{lineHeight:'3px'}} className="rounded-l-lg xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] font-inter">
                  Unregistered Vehicle
                </td>
                <td style={{lineHeight:'3px'}}  className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] font-inter text-end rounded-r-lg">
                  {item.unregisteredVehicle}
                </td>
              </tr>
              <tr key={`${index}-vacant-alerts`} className="bg-[#EDF1F7]">
              <td style={{lineHeight:'3px'}} className="rounded-l-lg xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] font-inter">
                  Vacant Alerts
                </td>
                <td style={{lineHeight:'3px'}}  className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] font-inter text-end rounded-r-lg">
                  {item.vacantAlert}
                </td>
              </tr>
              <tr key={`${index}-curfew-activity`} className="bg-[#EDF1F7]">
              <td style={{lineHeight:'3px'}} className="rounded-l-lg xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] font-inter">
                  Curfew Activity
                </td>
                <td style={{lineHeight:'3px'}}  className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] font-inter text-end rounded-r-lg">
                  {item.curfewActivity}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Insurance;
