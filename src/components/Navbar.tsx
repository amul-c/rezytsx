import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import NotificationsIcon from "@mui/icons-material/Notifications";
import filterImg from "../assets/filter.png";
import { Button } from "@mui/material";
import PropertyImage from "../assets/property.png";
import { useLocation } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useURLParams } from "../UrlParamsContext"; 


export default function Navbar() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();
  const  params = useParams();



  
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const regex = /(\d+)/;
const matches =currentRoute.match(regex)
let id=1;
if (matches) {
   id = parseInt(matches[0]); 
  console.log(id); 
} 

 

  useEffect(() => {
    setCurrentRoute(location.pathname);
  
  
  }, [location.pathname])



 


  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-[rgba(216, 223, 234, 1)] fixed top-0 z-[999]">
      <AppBar position="fixed" sx={{ height: "fit-content",
          background: 'linear-gradient(231.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)'
          , fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center",  height: '100%' }}>
            <img src={PropertyImage} alt="icon" style={{ height: "20px", width: "20px", marginRight: "5px" }} />
            <div color="lightgray" style={{ fontWeight: 500 }}>Properties</div>
            <Typography color="white" sx={{ mx: 0.5 }}>&gt;</Typography>

  <div color="lightgray" style={{ fontWeight: 500 }}>Property Name</div>

        <Typography color="white" sx={{ mx: 0.5 }}>&gt;</Typography>
            {
              currentRoute ==`/buildings/${params.propertyId}` &&
          
               <>
              <div color="lightgray" style={{ fontWeight: 500 }}>Buildings</div></>
              
            }
             {
              currentRoute ==`/unit/${params.buildingId}/${params.unitId}` &&
          
               <>
              <div color="lightgray" style={{ fontWeight: 500 }}>Building {params.buildingId}</div>
              <Typography color="white" sx={{ mx: 0.5 }}>&gt;</Typography>
              <div color="lightgray" style={{ fontWeight: 500 }}>Unit {params.unitId}</div>

              </>
              
            }

{
              currentRoute ==`/tenant/${id}` &&
          
               <>
              <div color="lightgray" style={{ fontWeight: 500 }}>Tenants</div>
              

              </>
              
            }
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex", alignItems: "center" } }}>
            {isSmallScreen ? (
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>

                <div className='max-w-md mx-auto'>
                  <div className="relative flex items-center w-full h-10 rounded focus-within:shadow-lg  overflow-hidden bg-transparent border-[1px] border-[#6791D0] p-1">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <input
                      className="peer h-full w-full outline-none text-sm text-white-100 pr-2 bg-transparent"
                      type="text"
                      id="search"
                      placeholder="Search " />
                    <Button variant="contained" style={{ background: "white", color: "black", minWidth: "auto", padding: "1px 10px" }}>Properties</Button>
                    <img src={filterImg} alt="Filter" className="h-6 w-6" />
                  </div>
                </div>
              </Box>
            )}
            <IconButton size="medium" color="inherit">
              <Badge color="error"><MarkChatUnreadIcon style={{ color: "white" }} /></Badge>
            </IconButton>
            <IconButton size="medium" color="inherit">
              <Badge overlap="circular" badgeContent=" " variant="dot" sx={{ color: "white", "& .MuiBadge-dot": { backgroundColor: "white" } }}>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
