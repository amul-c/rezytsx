import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import batteryImg from "../../assets/images/Battery.png";
import RedTempImg from "../../assets/images/image5.png";
import TempImage from "../../assets/images/image3.png";
import DropImage from "../../assets/images/image4.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface DeviceInfo {
  id: number;
  reading: {
    temperature: string;
    humidity: string;
  };
  name: string;
  propertyName: string;
  battery: number;
  connection: string;
  installedDate: number;
}

function Tables() {
  const [data, setData] = useState<DeviceInfo[] | null>(null);
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);
  const { propertyId, deviceName } = useParams<{ propertyId: string; deviceName: string }>();

  useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await axios.get(`http://localhost:8080/device/${deviceName}/info/property/${propertyId}`)
        setData(response.data);
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item: DeviceInfo) => (
        <div key={item.id}>
          {isSmallScreen ? (
            <div
              style={{
                marginTop: "1.5rem",
                marginRight: "-3rem",
                marginLeft: "1.5rem",
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                borderRadius: "5px",
                backgroundColor: "white",
                width: "92%",
                maxWidth: "400px",
              }}
            >
              <Typography
                style={{
                  fontSize: "large",
                  padding: "0.5rem",
                  fontWeight: "400",
                  marginLeft: "-1rem",
                }}
              >
                <b>ID: {item.id}</b>
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography
                  style={{
                    marginLeft: "-1rem",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    paddingRight: "2rem",
                    fontWeight: "400",
                    backgroundColor: "var(--Shades-25, #EDF1F7)"
                  }}
                >
                  {item.propertyName}
                </Typography>
                <Typography
                  style={{
                    marginRight: "-1rem",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    paddingRight: "0rem",
                    fontWeight: "400",
                    backgroundColor: "var(--Shades-25, #EDF1F7)",
                    width: "calc(50% - 0.375rem)",
                    whiteSpace: "nowrap",
                    marginLeft: "0.5rem",
                  }}
                >
                  {new Date(item.installedDate).toLocaleDateString()}
                </Typography>
              </div>
              <Typography
                style={{
                  height: "40px",
                  width: "314px",
                  marginLeft: "-1rem",
                  borderRadius: "4px",
                  padding: "8px",
                  fontWeight: "400",
                  backgroundColor: "var(--Shades-25, #EDF1F7)",
                  marginBottom: "0.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {parseInt(item.reading.temperature.split(":")[1]) <= 25 ? (
                    <img
                      src={RedTempImg}
                      alt="Temperature"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />
                  ) : (
                    <img
                      src={TempImage}
                      alt="Temperature"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "0.5rem",
                      }}
                    />
                  )}
                  <div
                    style={{
                      marginRight: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                      }}
                    >
                      <Typography style={{ fontSize: "large" }}>
                        <span> Temperature: </span>
                        <span
                          style={{
                            color:
                              parseFloat(
                                item.reading.temperature.split(":")[1]
                              ) >= 2
                                ? "#00C17B"
                                : "red",
                          }}
                        >
                          {item.reading.temperature.split(":")[0]}{" "}
                        </span>
                        <span>{item.reading.temperature.split(":")[1]}</span>
                      </Typography>
                    </div>
                  </div>
                </div>
              </Typography>
              <Typography
                style={{
                  height: "40px",
                  width: "314px",
                  marginLeft: "-1rem",
                  borderRadius: "4px",
                  padding: "8px",
                  fontWeight: "400",
                  backgroundColor: "var(--Shades-25, #EDF1F7)",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "large",
                  }}
                >
                  <img
                    src={DropImage}
                    alt="Humidity"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "0.5rem",
                    }}
                  />
                  <span> Humidity: </span>
                  <Typography
                    fontSize="large"
                    sx={{
                      color:
                        parseFloat(item.reading.humidity) <= 50
                          ? "#00C17B"
                          : "red",
                      marginRight: "8px",
                    }}
                  >
                    {item.reading.humidity}
                  </Typography>
                </div>
              </Typography>
              <Typography
                style={{
                  padding: "0.5rem",
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: `${
                      item.connection === "ONLINE"
                        ? item.battery === 100
                          ? "#00C17B"
                          : item.battery === 42
                          ? "rgba(255, 153, 0, 1)"
                          : item.battery === 18
                          ? "rgba(240, 83, 72, 1)"
                          : "#f0f0f0"
                        : "rgb(0, 193, 123,1)"
                    }`,
                    height: "48px",
                    padding: "8px",
                    marginRight: "0.5rem",
                    marginLeft: "-1.5rem",
                    borderRadius: "4px",
                    width: "228px",
                    color: "white",
                  }}
                >
                  <img
                    src={batteryImg}
                    alt="Battery"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "0.5rem",
                    }}
                  />
                  <Typography>Battery {item.battery} %</Typography>
                </div>
                <div
                  style={{
                    backgroundColor: `${
                      item.connection === "ONLINE"
                        ? "#00C17B"
                        : "rgba(255, 153, 0, 1)"
                    }`,
                    height: "48px",
                    padding: "8px",
                    marginLeft: "8px", 
                    marginRight: "-1.8rem",
                    borderRadius: "5px",
                    width: "228px",
                    color: "white",
                  }}
                >
                  <Typography>{item.connection}</Typography>
                </div>
              </Typography>
            </div>
          ) : (
            <Accordion
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
                    <tr>
                      <th
                        style={{
                          // padding: "0.5rem",
                          fontWeight: "400",
                          textAlign: "left",
                          // width: "7%",
                          width: "200px",
                        }}
                      >
                        {item.id}
                      </th>
                      <th
                        style={{
                          fontWeight: "400",
                          textAlign: "left",
                          width: "373px",
                        }}
                      >
                        {item.propertyName}
                      </th>

                      <th
                        style={{
                          fontWeight: "400",
                          textAlign: "left",
                          width: "201px",
                        }}
                      >
                        {new Date(item.installedDate).toLocaleDateString()}
                      </th>

                      <th
                        style={{
                          textAlign: "left",
                          width: "358px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "left",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor:
                                parseFloat(
                                  item.reading.temperature.split(":")[1]
                                ) <= 25.2
                                  ? "#f0f0f0"
                                  : "#f0f0f0",

                              borderRadius: "5px",
                              padding: "0.5rem",
                              marginRight: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={
                                parseInt(
                                  item.reading.temperature.split(":")[1]
                                ) <= 25
                                  ? RedTempImg
                                  : TempImage
                              }
                              alt="Temperature"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "0.5rem",
                              }}
                            />
                            <Typography>
                              <span>Temperature: </span>
                              <span
                                style={{
                                  color:
                                    parseFloat(
                                      item.reading.temperature.split(":")[1]
                                    ) <= 25.2
                                      ? "red"
                                      : "#00C17B",
                                }}
                              >
                                {item.reading.temperature.split(":")[0]}
                              </span>
                            </Typography>
                          </div>

                          <div
                            style={{
                              backgroundColor: "#f0f0f0",
                              borderRadius: "5px",
                              padding: "0.5rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={DropImage}
                              alt="Humidity"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "0.5rem",
                              }}
                            />
                            <Typography>
                              <span>Humidity: </span>
                              {item.reading.humidity}
                            </Typography>
                          </div>
                        </div>
                      </th>

                      <th
                        style={{
                          textAlign: "left",
                          width: "358px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            fontSize: "10px",
                            color: "white",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor:
                                item.connection === "ONLINE"
                                  ? item.battery === 100
                                    ? "#00C17B"
                                    : item.battery === 42
                                    ? "rgba(255, 153, 0, 1)"
                                    : item.battery === 18
                                    ? "rgba(240, 83, 72, 1)"
                                    : "#f0f0f0"
                                  : "rgb(0, 193, 123,1)",
                              padding: "0.5rem",
                              borderRadius: "5px",
                              marginRight: "0.5rem",
                              width: "9rem",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={batteryImg}
                              alt="Battery"
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "0.5rem",
                              }}
                            />
                            <Typography style={{ whiteSpace: "nowrap" }}>
                              <span>Battery: </span>
                              <span>{item.battery}%</span>
                            </Typography>
                          </div>

                          <div
                            style={{
                              backgroundColor:
                                item.connection === "ONLINE"
                                  ? "#00C17B"
                                  : "rgba(255, 153, 0, 1)",
                              padding: "0.5rem",
                              borderRadius: "5px",
                            }}
                          >
                            <Typography>{item.connection}</Typography>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </AccordionSummary>
            </Accordion>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tables;
