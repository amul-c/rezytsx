import fire from "../../assets/firehollow.png";
import cosensor from "../../assets/cosensor.png";
import tempsensor from "../../assets/tempsensor.png";
import watermeters from "../../assets/watermeters.png";
import arrow from "../../assets/arrow.png";
import thumbnail from "../../assets/thumbnail.png"
const InstalledDevicesUnitWise = ({ unitData }) => {
  const iconMapping = {
    firealarm: fire,
    cosensor: cosensor,
    tempsensor: tempsensor,
    watermeters: watermeters,
  };

 
  const { deviceCount } = unitData;


  const devices = deviceCount ? Object.keys(deviceCount).map((deviceType) => ({
    device_type: deviceType,
    count: deviceCount[deviceType],
    icon: iconMapping[deviceType.toLowerCase().replace(/\s+/g, "")], // Get the icon based on the device type
  })) : [];
   
  

  return (
    <>
      <div className="bg-[##EDF1F7] w-[100%] sm:w-full xs:w-full rounded-lg justify-center flex flex-col items-center ">
        <div className="w-[95%] h-[2rem] bg-[#01337C] text-white p-1 font-small text-[18px] rounded flex items-center mt-3">
          Installed Devices
        </div>

        <table className="w-[95%] divide-y divide-gray-200 border-separate border-spacing-y-3 mb-[10px] mx-[10px] mt-[1px]">
          <tbody className="divide-y divide-gray-200">
            {devices.map((item, index) => (
              <tr key={index} className="bg-[#FFFFFF] h-[42px]">
                <td
                  style={{
                    lineHeight: "3px",
                    borderTopLeftRadius: "0.75rem",
                    borderBottomLeftRadius: "0.75rem",
                  }}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] pl-1 rounded-l-xl"
                >
                  {item.icon ? ( // Check if icon exists
                    <img
                      className="h-6 w-6 inline-block align-middle"
                      style={{ marginRight: "8px" }}
                      src={item.icon}
                      alt=""
                    />
                  )
                :
                ( <img
                  className="h-6 w-6 inline-block align-middle"
                  style={{ marginRight: "8px" }}
                  src={thumbnail}
                  alt=""
                />)
                }
                  <div className="inline-block align-middle">{item.device_type}</div>
                </td>

                <td
                  style={{ lineHeight: "3px" }}
                  className=" rounded-r-xl xl:pl-6 lg:pl-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] pr-1 "
                >
                  <div className="flex flex-row items-center gap-2 justify-end">
                    <div>{item.count}</div>
                    <img className="h-6 w-6" src={arrow} alt="" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InstalledDevicesUnitWise;
