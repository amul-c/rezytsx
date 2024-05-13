import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
} from "@mui/material";
import { Sort } from "@mui/icons-material";
import BuilImg from "../../assets/images/bluebuil.png";
import BuilHeader from "./BuilHeader";
import BuilTables from "./BuilTables";
import FilterIcon from "../../assets/images/filterIcon.png";
import PropertyImg from "../../assets/images/bluebuil.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import MobileNavbar from "../MobileNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";

interface UnitData {
  id: number;
  name: string;
  installedDate: string;
  reading: {
    temperature: string;
  };
  tenantName: string;
}
function BuilNav() {
  const { isSmallScreen, isLargeScreen } = useSelector(
    (state: RootState) => state.screenSize
  );
  const [data, setData] = useState<UnitData[]>([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const {buildingId} = useParams();
  const [sorting,setSorting]=useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:8080/unit/building/${buildingId}/list`);
        setBuildingData(response.data);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  function handleSorting(){
    setSorting(false);

  }

  const sortData = () => {
    if (sortCategory && sortOrder) {
      let sortedData = [...data];
      switch (sortCategory) {
        case "id":
          sortedData.sort((a, b) => {
            return sortOrder === "Ascending" ? a.id - b.id : b.id - a.id;
          });
          break;
        case "name":
          sortedData.sort((a, b) => {
            return sortOrder === "Ascending"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
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
            const aName = a.tenantName || "";
            const bName = b.tenantName || "";
            return sortOrder === "Ascending"
              ? aName.localeCompare(bName)
              : bName.localeCompare(aName);
          });
          break;
        case "reading":
          sortedData.sort((a, b) => {
            const aTemperature =
              a.reading && a.reading.temperature
                ? parseFloat(a.reading.temperature)
                : null;
            const bTemperature =
              b.reading && b.reading.temperature
                ? parseFloat(b.reading.temperature)
                : null;

            if (aTemperature === null && bTemperature === null) return 0;
            if (aTemperature === null)
              return sortOrder === "Ascending" ? 1 : -1;
            if (bTemperature === null)
              return sortOrder === "Ascending" ? -1 : 1;
            if (sortOrder === "Ascending") {
              return aTemperature - bTemperature;
            } else {
              return bTemperature - aTemperature;
            }
          });
          break;
        default:
          break;
      }
      setData(sortedData);
    }
    setSorting(true);
    setShowSortModal(false)
  };

  return (
    <>
      {isLargeScreen ? <Navbar /> : <MobileNavbar />}
      <div className="relative top-[3rem]">
        <AppBar
          position="static"
          style={{
            borderRadius: isSmallScreen ? "0.5rem" : "0.5rem 0.5rem 0 0",
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
            width: "auto",
            backgroundColor: "white",
            position: "relative",
            marginTop: "3rem",
            margin: "98 1rem",
            boxShadow: "none",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", color: "black" }}
            >
              {isSmallScreen ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={PropertyImg}
                    alt="Your Image"
                    style={{ width: "24px", marginRight: "8px", color: "blue" }}
                  />
                  <Typography variant="h6" style={{ color: "darkblue" }}>
                    Units
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{
                      marginLeft: "8px",
                      color: "darkblue",
                      fontSize: "1.3rem",
                    }}
                  ></Typography>
                </div>
              ) : (
                <>
                  <svg
                    style={{ color: "darkblue", marginRight: "10px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  <img
                    src={BuilImg}
                    alt="Fire Icon"
                    style={{ width: 25, height: "auto", color: "black" }}
                  />{" "}
                  <Typography variant="h6" style={{ marginLeft: "0.5rem" }}>
                    Building A
                  </Typography>
                </>
              )}
            </div>
            {isSmallScreen ? (
              <IconButton color="inherit" sx={{ padding: "8px" }}>
                <img
                  src={FilterIcon}
                  alt="Filter"
                  style={{ width: "46px", height: "46px", color: "darkblue" }}
                />
              </IconButton>
            ) : (
              <>
                <Badge color="secondary">
                {sorting 
            &&
            <button onClick={handleSorting}className='text-red-600 mr-2'>clear sorting</button>
          }
                  <Button
                    onClick={() => setShowSortModal(true)}
                    style={{
                      backgroundColor: "rgba(192, 217, 255, 1)",
                      color: "darkblue",
                    }}
                    endIcon={<Sort />}
                  >
                    Sort By
                  </Button>
                  <Typography
                    style={{
                      marginLeft: "0.5rem",
                      color: "darkblue",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></Typography>
                </Badge>
              </>
            )}
          </Toolbar>
        </AppBar>

        {showSortModal && (
          <div className="w-[35rem] min-h-[10rem] bg-neutral-100 absolute top-[10rem] right-[2rem] rounded shadow-lg z-50">
            <div className="font-semibold m-4 text-xl font-serif">Sorting</div>
            <div className="flex flex-row justify-center h-full gap-10">
              <form className="max-w-sm ">
                <select
                  value={sortCategory}
                  onChange={(e) => setSortCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose Category</option>
                  <option value="id">UNIT</option>
                  <option value="name">Devices</option>
                  <option value="installedDate">Installed Date</option>
                  <option value="reading">Readings</option>
                  <option value="tenantName">Tenant Name</option>
                </select>
              </form>

              <form className="max-w-sm ">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Choose sorting order</option>
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>
              </form>
            </div>
            <div className="flex flex-row gap-2 absolute bottom-1 right-1 m-2">
              <button
                onClick={sortData}
                className="h-8 w-14 bg-blue-700 text-neutral-100 rounded"
              >
                Apply
              </button>
              <button
                onClick={() => setShowSortModal(false)}
                className="bg-red-400 rounded h-8 w-14 text-neutral-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "0.5rem",
            backgroundColor: isSmallScreen ? "" : "#EDF1F7",
            marginLeft: "1.5rem",
            marginRight: "1.5rem",
            overflow: "hidden",
            height: "100%",
          }}
        >
          <BuilHeader />{" "}
          <div
            style={{
              marginLeft: "1rem",
              marginRight: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                marginLeft: "-6px",
                flexBasis: "calc(100% - -2rem)",
              
                borderRadius: "0.5rem",
                marginRight: "1rem",
              }}
            >
              <BuilTables sortCategory={sortCategory} sortOrder={sortOrder} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuilNav;