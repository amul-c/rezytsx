import exclamation from "../assets/exclamation.png"
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import searchicon from "../assets/searchicon.png"
import newmsg from "../assets/newmsg.png"
import newnotification from "../assets/newnotification.png"
import back from "../assets/whiteback.png"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const MobileNavbar = () => {
  const location = useLocation();
  const params = useParams();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoute(location.pathname);


  }, [location.pathname])


  return (
    <>
      <div
        className='w-[100%] h-[2.9rem] rounded-b-lg fixed z-[2] top-0'
        style={{
          background: 'linear-gradient(231.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)',
        }}

      >
        <div className='flex justify-between items-center h-full px-1'>

          {
          currentRoute === `/homemoreinfo/${params.propertyId}` ? (
            <div className="flex flex-row gap-2">
              <Link to={"/"}>
                <button><img className="h-3 w-3" src={back} alt="" /></button>
              </Link>
         
              <div className='text-white order-1'>More Info</div>
            </div>
          ) : currentRoute ===`/unitmoreinfo/${params.unitId}` ? (
            <div className="flex flex-row gap-2">
              <Link to={"unit"}>
                <button><img className="h-3 w-3" src={back} alt="" /></button>
              </Link>
              <div className='text-white order-1'>More Info</div>
            </div>
          ) : 
          
          currentRoute ===`/homemoreinfo/building/${params.buildingName}/${params.unitId}` ?
          (
             <div>Building {params.buildingName}</div>
          )
          :
          (
            <div className='text-white order-1'>Property Name</div>
          )}




          {currentRoute == "/" || currentRoute == `/homemoreinfo/unit/${params.unitId}`?
            (
              <Link className="order-2 " to={currentRoute === "/" ? `/homemoreinfo` : "/unitmoreinfo"}>
                <button className='bg-[#FFFFFF] flex flex-row gap-1 rounded items-center '>
                  <img className="h-6 w-6 p-1" src={exclamation} alt="" />
                  <div className='p-1 text-sm'>MORE INFO</div>
                </button>
              </Link>
            )
            :
            currentRoute == `/homemoreinfo/${params.propertyId}` || currentRoute == `/unitmoreinfo/${params.propertyId}` ?

              (
                <></>
              )
              :
              (

                <div className="flex flex-row gap-2 order-2">
                  <button><img className="h-6 w-6" src={searchicon} alt="" /></button>
                  <button><img className="h-6 w-6" src={newmsg} alt="" /></button>
                  <button><img className="h-6 w-6" src={newnotification} alt="" /></button>
                </div>
              )


          }
        </div>
      </div>

    </>
  )
}

export default MobileNavbar