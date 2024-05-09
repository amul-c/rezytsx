import arrow from "../../assets/arrow.png";
import tenant from "../../assets/tenant.png";
import phone from "../../assets/phone.png";
import email from "../../assets/email.png";
import unitstatus from "../../assets/unitstatus.png";

const UnitInfo = ({ unitData }) => {
  const iconMapping = {
    tenant: tenant,
    phone: phone,
    email: email,
    unitstatus: unitstatus,
  };

  const { tenantName, tenantPhone, tenantEmail, status } = unitData;

  const devices = [
    {
      device_type: "Tenant Name",
      value: tenantName,
      icon: "tenant",
    },
    {
      device_type: "Phone",
      value: tenantPhone,
      icon: "phone",
    },
    {
      device_type: "Email",
      value: tenantEmail,
      icon: "email",
    },
    {
      device_type: "Status",
      value: status,
      icon: "unitstatus",
    },
  ];

  return (
    <>
      <div className="bg-[##EDF1F7] w-[100%] sm:w-full xs:w-full rounded-lg justify-center flex flex-col items-center ">
        <div className="w-[95%] h-[2rem] bg-[#01337C] text-white p-1 font-small text-[18px] rounded flex items-center mt-3">
          Unit Info
        </div>

        <table className="w-[95%] divide-y divide-gray-200 border-separate border-spacing-y-3 mb-[10px] mx-[10px] mt-[1px]">
          <tbody className="divide-y divide-gray-200">
            {devices.map((item, index) => (
              <tr key={index} className="bg-[#FFFFFF] h-[42px]">
                <td
                  style={{ lineHeight: "3px", verticalAlign: "middle" }}
                  className="rounded-l-xl pr-6 pl-2 py-4 whitespace-nowrap text-sm font-medium text-[#5C626E]"
                >
                  <div style={{ display: "inline-block", marginRight: "8px", verticalAlign: "middle" }}>
                    <img className="h-6 w-6" src={iconMapping[item.icon]} alt="" />
                  </div>
                  <div style={{ display: "inline-block", verticalAlign: "middle" }}>{item.device_type}</div>
                </td>

                <td
                  style={{ lineHeight: "3px" }}
                  className=" rounded-r-xl xl:pl-6 lg:pl-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-[#01337C] pr-1 "
                >
                  <div className="flex flex-row items-center gap-2 justify-end">
                    <div>{item.value}</div>
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

export default UnitInfo;
