import fire from "../../assets/firehollow.png";
import cosensor from "../../assets/cosensor.png";
import tempsensor from "../../assets/tempsensor.png";
import watermeters from "../../assets/watermeters.png";
import arrow from "../../assets/arrow.png";
import thumbnail from "../../assets/thumbnail.png";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const InstalledDevices = ({ propertyId }: { propertyId: string }) => {
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const [data, setData] = useState<any[]>([]);
  async function getData() {
    const response = await axios.get(
      `http://localhost:8080/device/installed-devices/property/${propertyId}`
    );

    setData(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const iconMapping: Record<string, string> = {
    fire: fire,
    cosensor: cosensor,
    tempsensor: tempsensor,
    watermeters: watermeters,
  };

  const devices = Array.isArray(data) ? data.map((item) => ({
    device_type: item.device_type,
    count: item.count,
    icon:
      iconMapping[
        item.device_type
          .toLowerCase()
          .replace(/\s+/g, "") as keyof typeof iconMapping
      ] || thumbnail,
  })) : [];


  return (
    <>
      <div className="bg-[##EDF1F7] w-[100%]  sm:w-full xs:w-full rounded-lg justify-center flex flex-col items-center ">
        <div
          className={`w-[95%] h-[2rem] bg-[#01337C] text-white p-1  font-small text-[18px] rounded flex items-center ${
            isLargeScreen ? "mt-3" : ""
          }`}
        >
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
                  <Link
                    to={`/device/${encodeURIComponent(
                      item.device_type
                    )}/info/property/${propertyId}`}
                    className="flex items-center gap-1"
                  >
                    {" "}
                    {item.icon ? (
                      <img
                        className="h-6 w-6 inline-block align-middle"
                        style={{ marginRight: "8px" }}
                        src={item.icon}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-6 w-6 inline-block align-middle"
                        style={{ marginRight: "8px" }}
                        src={thumbnail}
                        alt=""
                      />
                    )}
                    <div className="inline-block align-middle">
                      {item.device_type}
                    </div>
                  </Link>
                </td>
                <td
                  style={{ lineHeight: "3px" }}
                  className="rounded-r-xl xl:pl-6 lg:pl-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] pr-1"
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

export default InstalledDevices;
