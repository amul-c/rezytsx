import webcam from '../assets/webcam.png'
import footage from '../assets/footagecroped.png'
import { useState } from 'react'
import './Footage.css'
import { Expand } from '@mui/icons-material'


const FootageContainer = () => {

  const [expand, setExpand] = useState(true);


  function handleExpand() {
    setExpand(!expand);
  }


  return (
    <>
      <div id="footageContainer" className="md:w-[100%] lg:w-[100%] sm:w-[100%]">
        <div
          id="navbar"
          className="w-[100%] h-[3rem] bg-blue rounded-lg  flex items-center"
          style={{
            backgroundColor: "darkblue",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{ order: "1" }}
            className=" mx-1 gap-[1rem] flex items-center"
          >
            <img className="w-6 h-6" src={webcam} alt="" />
            <div style={{ color: "white" }} className="">
              Live Footage
            </div>
          </div>
          <button onClick={handleExpand} className='order-2'>
            {!expand ?

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 color-[white] mr-2"
                style={{ color: "white", order: "2" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                />
              </svg>
              : <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 color-[white] mr-2"
              style={{ color: "white", order: "2" }}>
                <path strokeLinecap="round" 
                strokeLinejoin="round"
                 d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
                 />
              </svg>}

          </button>
        </div>

        {expand &&
          <div className=" mt-[4px] flex flex-col gap-2 transition-all" id="footage">
            <div id="boxes" className='flex lg:flex-row gap-2 sm:flex-col xs:flex-col '><img style={{ width: "100%" }} src={footage} alt="" />
              <img style={{ width: "100%" }} src={footage} alt="" />
            </div>
            <div id="boxes" className='flex lg:flex-row gap-2 sm:flex-col xs:flex-col'><img style={{ width: "100%" }} src={footage} alt="" />
              <img style={{ width: "100%" }} src={footage} alt="" />
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default FootageContainer