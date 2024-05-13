
import  { useState, useEffect } from "react";
import axios from "axios";
import { Accordion, AccordionSummary } from "@mui/material";
import RightArrow from "../../assets/images/rightarrow.png";
import TempImage from "../../assets/images/image3.png";
import DropImage from "../../assets/images/image4.png";
import DTempImage from"../../assets/images/tempdtec.png";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import currentImg from "../../assets/images/current.png";
import smokedtec from "../../assets/smoke.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface DeviceInfo {
  id: number;
  reading: {
    temperature?: string;
    humidity: string;
  };
  name: string;
  propertyName: string | null;
  battery: number;
  connection: string;
  installedDate: number;
}

interface BuildingInfo {
  id: number;
  name: string;
  deviceList: DeviceInfo[];
  tenantName: string;
  installedDate: number;
}

function BuilTables({ sortCategory, sortOrder }: any) {
  const [buildingData, setBuildingData] = useState<any>(null);
  const { isSmallScreen,isLargeScreen } = useSelector((state: RootState) => state.screenSize);
   const {buildingId} = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/unit/building/${buildingId}/list`);
        setBuildingData(response.data);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    console.log({ buildingData });
    fetchData();
  }, []);

  useEffect(() => {
    sortData();
  }, [sortCategory, sortOrder]);

  const sortData = () => {
    if (sortCategory && sortOrder) {
      let sortedData = [...buildingData];
      switch (sortCategory) {
        case "id":
          sortedData.sort((a, b) => {
            return sortOrder === "Ascending" ? a.id - b.id : b.id - a.id;
          });
          break;
        case "name":
          sortedData.forEach((building: BuildingInfo) => {
            building.deviceList.sort((a, b) => {
              return sortOrder === "Ascending"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
            });
          });
          break;
        case "installedDate":
          sortedData.sort((a, b) => {
            return sortOrder === "Ascending"
              ? new Date(a.installedDate).getTime() -
                  new Date(b.installedDate).getTime()
              : new Date(b.installedDate).getTime() -
                  new Date(a.installedDate).getTime();
          });
          break;
        case "tenantName":
          sortedData.sort((a, b) => {
            return sortOrder === "Ascending"
              ? a.tenantName.localeCompare(b.tenantName)
              : b.tenantName.localeCompare(a.tenantName);
          });
          break;
        case "reading":
          sortedData.forEach((building: BuildingInfo) => {
            building.deviceList.sort((a, b) => {
              const aTemperature = parseFloat(
                a.reading?.temperature?.replace("°C", "") || ""
              );
              const bTemperature = parseFloat(
                b.reading?.temperature?.replace("°C", "") || ""
              );

              if (!isNaN(aTemperature) && !isNaN(bTemperature)) {
                return sortOrder === "Ascending"
                  ? aTemperature - bTemperature
                  : bTemperature - aTemperature;
              } else if (!isNaN(aTemperature)) {
                return sortOrder === "Ascending" ? -1 : 1;
              } else if (!isNaN(bTemperature)) {
                return sortOrder === "Ascending" ? 1 : -1;
              } else {
                return 0;
              }
            });
          });
          break;

        default:
          break;
      }
      setBuildingData(sortedData);
    }
  };

  return (
    <div>
      {buildingData?.map((building: BuildingInfo) => (
      <Link to= { isLargeScreen ?`/unit/${building.id}`:`/homemoreinfo/unit/${building.id}`}>
       <div key={building.id} style={{ marginBottom: "1.5rem" }}>
          {isSmallScreen ? (
            <div>
              <div
                key={building.id}
                style={{
                  backgroundColor: "white",
             
                  height: "275px",
                  width: "100%",
                  borderRadius: "5px",
                  padding: "1rem",
                }}
              >
                <Typography
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "large",
                    padding: "0.5rem",
                    fontWeight: "400",
                    width: "auto",
                    height: "19px",
                  }}
                >
                  <img
                    src={currentImg}
                    alt="Tenant Image"
                    style={{
                      marginRight: "0.5rem",
                      marginTop: "0.3rem",
                      width: "24px",
                      height: "24px",
                    }}
                  />
                  UNIT {building.id}
                  <img
                    src={RightArrow}
                    alt="Tenant Image"
                    style={{
                      // marginRight: "0rem",
                      marginTop: "0.3rem",
                      width: "32px",
                      height: "32px",
                      marginLeft: "auto",
                    }}
                  />
                </Typography>

                <div
                  style={{
                    marginLeft: "0.5rem",
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "spaceBetween",
                    marginBottom: "0.5rem",
                  }}
                >
                  {building.deviceList
                    .slice(0, 2)
                    .map((device: DeviceInfo, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#EDF1F7",
                          padding: "8px",
                          borderRadius: "4px",
                          flexDirection: "row",
                          marginRight: index !== 1 ? "8px" : "",
                        }}
                      >
                        {index === 0 && (
                          <div style={{ marginRight: "0.5rem" }}>
                            <img
                              src={smokedtec}
                              alt="Device Image"
                              style={{
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          </div>
                        )}

                        {index !== 0 && (
                          <div style={{ marginRight: "0.5rem" }}>
                            <img
                              src={DTempImage}
                              alt="Device Image"
                              style={{
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          </div>
                        )}

                        <span
                          style={{
                            width: "122px",
                            height: "19px",
                            color: "#31353B",
                          }}
                        >
                          {device.name}
                        </span>
                      </div>
                    ))}
                </div>

                {building.deviceList
                  .slice(0, 2)
                  .map((device: DeviceInfo, index: number) => {
                    if (device.reading) {
                      const readingKey = Object.keys(device.reading)[0];
                      return (
                        <div
                          key={index}
                          style={{
                            marginBottom: "0.5rem",
                            textAlign: "left",
                            width: "100%",
                            display: "flex",
                            alignItems:
                              index % 2 === 0 ? "flex-start" : "center",
                          }}
                        >
                          <div
                            style={{
                              marginLeft: "0.5rem",
                              width: "301px", 
                              height: "40px", 
                              backgroundColor: "#EDF1F7",
                              borderRadius: "5px",
                              marginRight: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "400",
                            }}
                          >
                            {readingKey === "temperature" ? (
                              <>
                                <img
                                  src={TempImage}
                                  alt="Temperature"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: "5px",
                                  }}
                                />
                                <span
                                  style={{
                                    width: "149px",
                                    height: "19px",
                                    color: "#5C626E",
                                  }}
                                >
                                  {readingKey}:
                                </span>
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    color: "red",
                                    width: "258px",
                                    height: "19px",
                                  }}
                                >
                                  {device.reading[readingKey]}
                                </span>
                              </>
                            ) : (
                              readingKey === "humidity" && (
                                <>
                                  <img
                                    src={DropImage}
                                    alt="Humidity"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      marginRight: "5px",
                                    }}
                                  />
                                  <span
                                    style={{
                                      width: "149px",
                                      height: "19px",
                                      color: "#5C626E",
                                    }}
                                  >
                                    {readingKey}:
                                  </span>
                                  <span
                                    style={{
                                      marginLeft: "5px",
                                      color: "rgb(0, 193, 123)",
                                      width: "258px",
                                      height: "19px",
                                    }}
                                  >
                                    {device.reading[readingKey]}
                                  </span>
                                </>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Typography
                      style={{
                        marginLeft: "0.5rem",
                        width: "151px",
                        height: "60px",
                        marginTop: "0.5rem",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        fontWeight: "400",
                        backgroundColor: "var(--Shades-25, #EDF1F7)",
                        color: "#00000",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ color: "#5C6970", fontWeight: "500" }}>
                        Installed Date
                      </span>
                      <br />
                      {new Date(building.installedDate).toLocaleDateString()}
                    </Typography>

                    <Typography
                      style={{
                        marginLeft: "0.5rem",
                        width: "151px",
                        height: "60px",
                        marginTop: "0.5rem",
                        borderRadius: "4px",
                        padding: "0.5rem",
                        fontWeight: "400",
                        backgroundColor: "var(--Shades-25, #EDF1F7)",
                        color: "#000000",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ color: "#5C6970", fontWeight: "500" }}>
                        Tenant Name
                      </span>
                      <br />
                      {building.tenantName}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Accordion
                key={building.id}
                style={{
                  backgroundColor: "white",
                  marginBottom: "2rem",
                  marginLeft: "21px",
                  marginRight: "21px",
                  marginTop: "1rem",
                  width: "calc(99% - 1rem)",
                }}
              >
                <AccordionSummary
                  id="myc"
                  style={{
                    height: "72px",
                    marginTop: "1.5rem",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "0 12px",
                  }}
                >
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr key={building.id}>
                        <th
                          style={{
                            fontWeight: "400",
                            textAlign: "left",
                            width: "220px",
                            height: "19px",
                          }}
                        >
                          UNIT {building.id}
                        </th>
                        <th
                          style={{
                            marginBottom: "2.5rem",
                            fontWeight: "400",
                            textAlign: "left",
                            width: "445px",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                          }}
                        >
                          {building.deviceList
                            .slice(0, 2)
                            .map((device: DeviceInfo, index: number) => (
                              <div
                                key={index}
                                style={{
                                  width: "170px",
                                  height: "40px",
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "#EDF1F7",
                                  padding: "8px",
                                  borderRadius: "4px",
                                  flexDirection: "row",
                                  marginRight:
                                    index !== 1 
                                      ? "8px"
                                      : "",
                                }}
                              >
                                {index === 0 && (
                                  <div style={{ marginRight: "0.5rem" }}>
                                    <img
                                      src={smokedtec}
                                      alt="Device Image"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                      }}
                                    />
                                  </div>
                                )}

                                {index !== 0 && (
                                  <div style={{ marginRight: "0.5rem" }}>
                                    <img
                                      src={DTempImage}
                                      alt="Device Image"
                                      style={{
                                        width: "24px",
                                        height: "24px",
                                      }}
                                    />
                                  </div>
                                )}

                                <span
                                  style={{ width: "122px", height: "19px" }}
                                >
                                  {device.name}
                                </span>
                              </div>
                            ))}
                        </th>

                        <th
                          style={{
                            fontWeight: "400",
                            textAlign: "left",
                            width: "225px",
                            height: "19px",
                          }}
                        >
                          {new Date(
                            building.installedDate
                          ).toLocaleDateString()}
                        </th>
                        <th
                          style={{
                            textAlign: "left",
                            width: "377px",
                          }}
                        >
                          <div
                            style={{
                              marginTop: "2rem",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            {building.deviceList
                              .slice(0, 2)
                              .map((device: DeviceInfo, index: number) => {
                                if (device.reading) {
                                  const readingKey = Object.keys(
                                    device.reading
                                  )[0];
                                  return (
                                    <div
                                      key={index}
                                      style={{
                                        marginBottom: "2rem",
                                        fontWeight: "400",
                                        textAlign: "left",
                                        width: "48%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems:
                                          index % 2 === 0
                                            ? "flex-start"
                                            : "center",
                                      }}
                                    >
                                      <div className="justify-center"
                                        style={{
                                          width: "192px",
                                          height: "40px",
                                          backgroundColor: "#f0f0f0",
                                          borderRadius: "5px",
                                          marginRight: "0.5rem",
                                          display: "flex",
                                          alignItems: "center",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {readingKey === "temperature" ? (
                                          <>
                                            <img
                                              src={TempImage}
                                              alt="Temperature"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "5px",
                                              }}
                                            />
                                            <span
                                              style={{
                                                width: "149",
                                                height: "19px",
                                              }}
                                            >
                                              {readingKey}:
                                            </span>
                                            <span
                                              style={{
                                                marginLeft: "5px",
                                                color: "red",
                                                width: "149",
                                                height: "19px",
                                              }}
                                            >
                                              {device.reading[readingKey]}
                                            </span>
                                          </>
                                        ) : (
                                          <>
                                            <img
                                              src={DropImage}
                                              alt="Humidity"
                                              style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "5px",
                                              }}
                                            />
                                            <span
                                              style={{
                                                width: "149",
                                                height: "19px",
                                              }}
                                            >
                                              {readingKey}:
                                            </span>
                                            <span
                                              style={{
                                                marginLeft: "5px",
                                                color: "rgb(0, 193, 123)",
                                                width: "149",
                                                height: "19px",
                                              }}
                                            >
                                              {
                                                device.reading[
                                                  readingKey as keyof typeof device.reading
                                                ] as string
                                              }
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                          </div>
                        </th>

                        <th
                          style={{
                            fontWeight: "400",
                            textAlign: "right",
                            width: "322px",
                            height: "19px",
                          }}
                        >
                          {building.tenantName}
                        </th>
                        <img
                          src={RightArrow}
                          alt="Tenant Image"
                          style={{
                            marginRight: "0rem",
                            marginTop: "2.5rem",
                            width: "32px",
                            height: "38px",
                            marginLeft: "auto",
                          }}
                        />
                      </tr>
                    </tbody>
                  </table>
                </AccordionSummary>
              </Accordion>
            </div>
          )}
        </div>
        </Link>
      ))}
    </div>
  );
}

export default BuilTables;