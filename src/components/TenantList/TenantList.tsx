  import tenant from "../../assets/tenantwhole.png"
  import bluefilter from "../../assets/bluefilter.png"
  import box from "../../assets/box.png"
  import dustbin from "../../assets/dustbin.png"
  import beldon from "../../assets/belldon.png"
  import unit from "../../assets/unit.png"
  import divide from "../../assets/break.png"
  import { useEffect, useState } from "react";
  import axios from 'axios';
import { useParams } from "react-router-dom"
  const TenantList = () => {

  const [data,setData]=useState([]);
  const [showSortModal,setShowSortModal]=useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const {propertyId}=useParams();
    interface Header {
      name: string;
    }

    const tableHeaders: Header[] = [
      { name: "NAME" },
      { name: "ROLE" },
      { name: "JOINED" },
      { name: "PHONE" },
      { name: "EMAIL" },
      { name: "PROPERTY" },
      { name: "ACTION" },
    ];

       
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8080/tenant/property/${propertyId}`);
      
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    const handleDelete = async (id: number) => {
      try {
        await axios.delete(`http://localhost:8080/tenant/${id}`);
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      } catch (error) {
        console.error("Error deleting data:", error.message);
      }
    };
    useEffect(()=>{getData()},[])

    function SortData() {
      if (sortCategory && sortOrder) {
        let sortedData = [...data];
        switch (sortCategory) {
          case "Name":
            sortedData.sort((a, b) => {
              if (sortOrder === "Ascending") {
                return a.name.localeCompare(b.name);
              } else if (sortOrder === "Descending") {
                return b.name.localeCompare(a.name);
              }
              return 0;
            });
            break;
          case "Joined":
            sortedData.sort((a, b) => {
              const dateA = new Date(a.joined);
              const dateB = new Date(b.joined);
              if (sortOrder === "Ascending") {
                return dateA - dateB;
              } else if (sortOrder === "Descending") {
                return dateB - dateA;
              }
              return 0;
            });
            break;
          case "propertyName":
          case "unitName":
            sortedData.sort((a, b) => {
              if (sortOrder === "Ascending") {
                return a[sortCategory] - b[sortCategory];
              } else if (sortOrder === "Descending") {
                return b[sortCategory] - a[sortCategory];
              }
              return 0;
            });
            break;
          default:
            break;
        }
        setData(sortedData);
      }
      setShowSortModal(false);
    }
     
  


    return (
      <>

        <div className="bg-[#EDF1F7]  flex flex-col mb-4 mx-4 rounded-t-lg relative top-[6rem]">
          <header className="flex flex-row justify-between bg-[white]  h-[3rem] rounded-t-lg items-center px-1">
            <div className="flex flex-row gap-1 order-1 items-ceter justify-center">
              <img src={tenant} alt="" className="h-6 w-6" />
              <div className="text-[#01337C]">Tenant List</div>
            </div>

            <div className='flex flex-row gap-1 order-2'>
              <button onClick={()=>{setShowSortModal(!showSortModal)}}id="sortBy " className="flex flex-row items-center gap-2 justify-center bg-[#C0D9FF] p-1 rounded items-center justify-center">
                <div className="bg-[#C0D9FF]" >SORT BY</div>
                <img className="h-6 w-6 " id="filter" src={bluefilter} alt="" />
              </button>
              <div id="count"></div>
            </div>
          </header>

          <div id="content" className="">
            <>
              <div className=' lg:w-[100%]  2xl:w-[100%] sm:w-full xs:w-full rounded-lg w-[100%] flex justify-center'>
                <table className="w-[95%] divide  -y divide-gray-200 border-separate border-spacing-y-3 md:m-4 lg:m-4 m-[10px] ">
                  <thead className="bg-[#01337C] text-white-800 " style={{background: 'linear-gradient(231.98deg, #01337C 28.19%, #013A8C 28.2%, #013A8C 96.59%, #00C17B 119.39%)',
  }}>
                    <tr className="">
                      {tableHeaders.map((header) => (
                        <th
                          key={header.name} 
                          scope="col"
                          className= {` ${header.name=="NAME" && "rounded-l-lg"}  ${header.name=="ACTION" && "  rounded-r-lg text-end"} xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-3 text-start text-xs font-medium uppercase text-white`} 
                        >
                          {header.name}

                        </th>
                      ))}

                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data?.map((item, index) => (
                      <tr key={index} className="bg-[white]">
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="rounded-l-xl px-6 py-4 whitespace-nowrap text-sm font-sm ">{item.name}</td>
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-sm "><div className="bg-[#EDF1F7] h-[2rem] items-center flex justify-center">{item.role}</div></td> {/* Use item.role from data */}
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm ">{item.joined}</td>
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm  ">{item.phone}</td>
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm ">{item.email}</td>
                        <td style={{ lineHeight: '3px',color:'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm ">
                          <div className="flex flex-row gap-2 bg-[#EDF1F7] h-[2.5rem] items-center justify-center rounded w-[fit-content] p-2">
                          <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                          <img className="h-4 w-4" src={beldon} alt="" />
                          <div style={{color:'rgba(92, 98, 110, 0.7)'}} className="text-[rgba(92, 98, 110, 0.7)]"></div>
                          </div>
                          <img className="h-4 " src={divide} alt="" />

                          <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                          <img className="h-4 w-4" src={unit} alt="" />
                          <div  style={{color:'rgba(92, 98, 110, 0.7)'}}  className="text-[rgba(92, 98, 110, 0.7)]"></div>
                          </div>
                          </div>
                          </td>
                          <td style={{ lineHeight: '3px', verticalAlign: 'middle', textAlign: 'right' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm text-gray-800 rounded-r-xl">
      <div className="flex flex-row-reverse gap-2">
       
 <img className="h-6 w-6" src={box} alt="" style={{ margin: '0', padding: '0' }} />
 <button onClick={() => handleDelete(item.id)}>
<img className="h-6 w-6" src={dustbin} alt="" style={{ margin: '0', padding: '0' }} />
</button>  
      </div>
  </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
        {showSortModal && (
        <div className="w-[35rem] min-h-[10rem] bg-neutral-100 absolute top-[10rem] right-[2rem] rounded shadow-lg">
          <div className="font-semibold m-4 text-xl font-serif">Sorting</div>
          <div className="flex flex-row justify-center h-full gap-10">
            <form className="max-w-sm ">
              <select
                value={sortCategory}
                onChange={(e) => setSortCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a category</option>
                <option value="name">Name</option>
                <option value="joined">Joined</option>
                <option value="propertyName">Property Name</option>
                <option value="unitName">Unit Name</option>
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
            <button onClick={SortData} className="h-8 w-14 bg-blue-700 text-neutral-100 rounded">
              Apply
            </button>
            <button onClick={() => setShowSortModal(false)} className="bg-red-400 rounded h-8 w-14 text-neutral-100">
              Cancel
            </button>
          </div>
        </div>
      )}
      </>
    )
  }

  export default TenantList