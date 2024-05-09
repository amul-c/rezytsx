import menu from "../assets/Menu.png"
import dashboard from "../assets/dashboard.png"
import profile from "../assets/profile.png"
const MobileFooter = () => {
  return (
    <>
      <div style={{ backgroundColor: 'rgb(222 235 255)',gap:'29px' }} className='h-[3rem] fixed bottom-0 rounded-t-lg z-4 flex flex-row  w-[100%] justify-around '>
        <button className='items-center flex flex-col order-1 py-1 hover:bg-gray-400 w-[33%]'>
          <img className='h-6 w-6   ' src={menu} alt="" />
          <div className='text-sm'>Menu</div>
        </button>

        <button className='items-center flex flex-col order-2 py-1 w-[33%] hover:bg-gray-400'>
          <img className='h-6 w-6 ' src={dashboard} alt="" />
          <div className='text-sm'>Dashboard</div>
        </button>

        <button className='items-center flex flex-col order-3 py-1 w-[33%] hover:bg-gray-400'>
          <img className='h-6 w-6 ' src={profile} alt="" />
          <div className='text-sm'>Profile</div>
        </button>
      </div>
    </>
  )
}

export default MobileFooter