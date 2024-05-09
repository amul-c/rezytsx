import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import fire from "../../assets/firehollow.png"
import cosensor from "../../assets/cosensor.png"
import tempsensor from "../../assets/tempsensor.png"
import watermeters from "../../assets/watermeters.png"
import arrow from "../../assets/arrow.png"
import thumbnail from "../../assets/thumbnail.png"

const PropertyInfo = ({ propertyId }) => {
  const [propertyData, setPropertyData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch(`http://localhost:8080/property/${propertyId}`)
      .then(response => response.json())
      .then(data => setPropertyData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const iconMapping = {
    fire: fire,
    cosensor: cosensor,
    tempsensor: tempsensor,
    watermeters: watermeters,
    thumbnail: thumbnail
  };

  const devices = propertyData
    ? [
        { device_type: 'Number of Buildings', count: propertyData.buildingCount, icon: 'thumbnail' },
        { device_type: 'Number of Units', count: propertyData.unitCount, icon: 'thumbnail' },
        { device_type: 'Occupancy', count: propertyData.occupancy, icon: 'thumbnail' },
        { device_type: 'Owner Name', count: propertyData.owner, icon: 'thumbnail' },
        { device_type: 'Phone', count: propertyData.phone, icon: 'thumbnail' },
        { device_type: 'Email', count: propertyData.email, icon: 'thumbnail' },
        { device_type: 'Tenants', count: propertyData.tenantCount, icon: 'thumbnail' },
      ]
    : [];

  return (
    <>
      <div className='bg-[##EDF1F7] w-[100%] sm:w-full xs:w-full rounded-lg justify-center flex flex-col items-center '>
        <div className='w-[95%] h-[2rem] bg-[#01337C] text-white p-1 font-small text-[18px] rounded flex items-center mt-3'>Property Info</div>

        <table className="w-[95%] divide-y divide-gray-200 border-separate border-spacing-y-3 mb-[10px] mx-[10px] mt-[1px]">
          <tbody className="divide-y divide-gray-200">
            {devices.map((item, index) => (
              <tr key={index} className="bg-[#FFFFFF] h-[42px]">
                <td style={{ lineHeight: '3px', verticalAlign: 'middle' }} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E] gap-2 items-center pl-1 rounded-l-xl">
                  {/* Conditionally render Link based on device type */}
                  {item.device_type === 'Number of Buildings' && (
                    <Link to={`buildings/${propertyId}`}>
                      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img className="h-6 w-6 inline-block align-middle" style={{ marginRight: '8px' }} src={iconMapping[item.icon]} alt="" />
                        <div className="inline-block align-middle">{item.device_type}</div>
                      </div>
                    </Link>
                  )}
                  {item.device_type === 'Number of Units' && (
                    <Link to={`building/${propertyId}`}>
                      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img className="h-6 w-6 inline-block align-middle" style={{ marginRight: '8px' }} src={iconMapping[item.icon]} alt="" />
                        <div className="inline-block align-middle">{item.device_type}</div>
                      </div>
                    </Link>
                  )}
                  {item.device_type === 'Tenants' && (
                    <Link to={`tenant/${propertyId}`}>
                      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img className="h-6 w-6 inline-block align-middle" style={{ marginRight: '8px' }} src={iconMapping[item.icon]} alt="" />
                        <div className="inline-block align-middle">{item.device_type}</div>
                      </div>
                    </Link>
                  )}
                  {/* If none of the conditions match, link to the current route */}
                  {!['Number of Buildings', 'Number of Units', 'Tenants'].includes(item.device_type) && (
                    <Link to={location.pathname}>
                      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img className="h-6 w-6 inline-block align-middle" style={{ marginRight: '8px' }} src={iconMapping[item.icon]} alt="" />
                        <div className="inline-block align-middle">{item.device_type}</div>
                      </div>
                    </Link>
                  )}
                </td>
                <td style={{ lineHeight: '3px', verticalAlign: 'middle' }} className="rounded-r-xl xl:pl-6 lg:pl-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] pr-1">
                  {/* Conditionally render Link based on device type */}
                  {item.device_type === 'Number of Buildings' && (
                    <Link to={`buildings/${propertyId}`}>
                      <div className="flex flex-row items-center gap-2 justify-end">
                        <div>{item.count}</div>
                        <img className="h-6 w-6" src={arrow} alt="" />
                      </div>
                    </Link>
                  )}
                  {item.device_type === 'Number of Units' && (
                    <Link to={`building/${propertyId}`}>
                      <div className="flex flex-row items-center gap-2 justify-end">
                        <div>{item.count}</div>
                        <img className="h-6 w-6" src={arrow} alt="" />
                      </div>
                    </Link>
                  )}
                  {item.device_type === 'Tenants' && (
                    <Link to={`tenant/${propertyId}`}>
                      <div className="flex flex-row items-center gap-2 justify-end">
                        <div>{item.count}</div>
                        <img className="h-6 w-6" src={arrow} alt="" />
                      </div>
                    </Link>
                  )}
                  {/* If none of the conditions match, link to the current route */}
                  {!['Number of Buildings', 'Number of Units', 'Tenants'].includes(item.device_type) && (
                    <Link to={location.pathname}>
                      <div className="flex flex-row items-center gap-2 justify-end">
                        <div>{item.count}</div>
                        <img className="h-6 w-6" src={arrow} alt="" />
                      </div>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PropertyInfo;
