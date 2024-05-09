
import {
  Typography,
  Button,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
} from "@mui/material";
import { Sort } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import FireImage from "../../assets/images/image2.png";
import Header from "./Header.tsx";
import Tables from "./Tables.tsx";
import { sampleData } from "./Data.tsx";
import FilterIcon from "../../assets/images/filterIcon.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useState } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(() => ({
  appBar: {
    marginTop: "3rem",
    backgroundColor: "white",
    borderRadius: "0.7rem",
    width: "99%",
    margin: "0 1rem",
    marginLeft: "1rem",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  content: {
    marginLeft: "1rem",
    marginRight: "1rem",
    minHeight: "calc(100vh - 4rem)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#EDF1F7", // Set background color here
  },
  image: {
    width: 25,
    height: "auto",
    color: "black",
  },
  table: {
    marginLeft: "-6px",
    flexBasis: "calc(100% - -2rem)",
    margin: "-0.5rem 0",
    borderRadius: "0.5rem",
    marginRight: "1rem",
  },
  dataCount: {
    color: "darkblue",
    marginLeft: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function FireAlarm() {
  const classes = useStyles();
  const { isSmallScreen } = useSelector((state: RootState) => state.screenSize);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { propertyId, deviceName } = useParams<{ propertyId: string; deviceName: string }>();
 


  const sortData = () => {
    let sortedData = [...sampleData];

    function getTemperature(dataItem: any): number {
      const temperatureString =
        dataItem.READINGS[0].REDETAIL.split(":")[1].trim();
      return parseInt(temperatureString);
    }

    function getStatusDetail(dataItem: any): string {
      return dataItem.STATUS[0].STDETAIL;
    }

    if (sortCategory === "DEVICE_ID") {
      sortedData.sort((a: any, b: any) =>
        sortOrder === "Ascending"
          ? a.DEVICE_ID - b.DEVICE_ID
          : b.DEVICE_ID - a.DEVICE_ID
      );
    }
    if (sortCategory === "PROPERTY") {
      sortedData.sort((a: any, b: any) => {
        if (sortOrder === "Ascending") {
          return a.PROPERTY.localeCompare(b.PROPERTY);
        } else {
          return b.PROPERTY.localeCompare(a.PROPERTY);
        }
      });
    } else if (sortCategory === "INSTALLED_DATE") {
      sortedData.sort((a, b) =>
        sortOrder === "Ascending"
          ? new Date(a.INSTALLED_DATE).getTime() - new Date(b.INSTALLED_DATE).getTime()
          : new Date(b.INSTALLED_DATE).getTime() - new Date(a.INSTALLED_DATE).getTime()
      );
    }
     else if (sortCategory === "READINGS") {
      sortedData.sort((a: any, b: any) => {
        const aTemperature = getTemperature(a);
        const bTemperature = getTemperature(b);

        if (sortOrder === "Ascending") {
          return aTemperature - bTemperature;
        } else {
          return bTemperature - aTemperature;
        }
      });
    }

    if (sortCategory === "STATUS") {
      sortedData.sort((a: any, b: any) => {
        const aStatusDetail = getStatusDetail(a);
        const bStatusDetail = getStatusDetail(b);
    
        if (sortOrder === "Ascending") {
          return aStatusDetail.localeCompare(bStatusDetail);
        } else {
          return bStatusDetail.localeCompare(aStatusDetail);
        }
      });
    }
  };

  return (
    <>
      <AppBar
        position="static"
        className={classes.appBar}
        style={{
          borderRadius: isSmallScreen ? "0.5rem" : "0.5rem 0.5rem 0 0",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          width: "auto",
          backgroundColor:"white",
          marginTop:"6rem",
          position:"relative"
        }}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.heading}>
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
            <img src={FireImage} alt="Your Image" className={classes.image} />
            <Typography variant="h6" style={{ whiteSpace: "nowrap" }}>
              Fire Alarms
            </Typography>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", color: "black" }}
          >
            {isSmallScreen ? (
              <IconButton color="inherit" sx={{ padding: "8px" }}>
                <img
                  src={FilterIcon}
                  alt="Filter"
                  style={{ width: "46px", height: "46px", color: "darkblue" }}
                />
              </IconButton>
            ) : (
              <Badge color="secondary">
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
                  className={classes.dataCount}
                  style={{ marginLeft: "0.5rem" }}
                >
                  {sampleData.length}
                </Typography>
              </Badge>
            )}
          </div>
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
                <option value="">Device Id</option>
                <option value="name">Property Name</option>
                <option value="joined">Installed Date</option>
                <option value="propertyName">Readings</option>
                <option value="unitName">Status</option>
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
          backgroundColor: isSmallScreen ? "" : "#EDF1F7",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Header />
        <div className={classes.content}>
          <div className={classes.table}>
            <Tables />
          </div>
        </div>
      </div>
    </>
  );
}

export default FireAlarm;
