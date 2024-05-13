import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import building from '../../assets/bluebuilding.png';
import bluefilter from '../../assets/bluefilter.png';
import arrow from '../../assets/arrow.png';
import buildingunit from '../../assets/buildingunits.png';
import devices from '../../assets/buildingdevices.png';
import alarms from '../../assets/buildingalarms.png';
import screws from '../../assets/buildingscrew.png';
import divide from '../../assets/break.png';
import th from '../../assets/thumbnail.png';
import back from '../../assets/back.png';
import Navbar from '../Navbar';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface Building {
  id: string;
  name: string;
  unitCount: number;
  deviceCount: number;
}

const Building = () => {
  const { isLargeScreen } = useSelector((state: RootState) => state.screenSize);
  const [data, setData] = useState<Building[]>([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [sortCategory, setSortCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const { propertyId } = useParams<{ propertyId: string }>();
  const [sorting,setSorting]=useState(false);

  async function getData() {
    try {
      const response = await axios.get<Building[]>(`http://localhost:8080/building/property/${propertyId}/list`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSorting(){
    setSorting(false);

  }

  useEffect(() => {
    getData();
  }, [sorting]);

  function SortData() {
    if (sortCategory && sortOrder) {
      let sortedData = [...data];
      switch (sortCategory) {
        case 'buildings':
          sortedData.sort((a, b) => {
            if (sortOrder === 'Ascending') {
              return a.name.localeCompare(b.name);
            } else if (sortOrder === 'Descending') {
              return b.name.localeCompare(a.name);
            }
            return 0;
          });
          break;
        case 'units':
        case 'devices':
          sortedData.sort((a, b) => {
            if (sortOrder === 'Ascending') {
              return a[sortCategory] - b[sortCategory];
            } else if (sortOrder === 'Descending') {
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
    setSorting(true);
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#EDF1F7]  flex flex-col mb-4 mx-4 rounded-t-lg relative top-[6rem]">
        <header className="flex flex-row justify-between bg-[white]  h-[3rem] rounded-t-lg items-center px-1">
          <div className="flex flex-row gap-1 order-1 items-center justify-center ">
            <img className="h-4 w-4" src={back} alt="" />
            <img src={building} alt="" className="h-6 w-6" />
            <div className="text-[#01337C]">Property Name</div>
          </div>

          <div className="flex flex-row gap-1 order-2">
            {sorting 
            &&
            <button onClick={handleSorting}className='text-red-600 mr-2'>clear sorting</button>
          }
            <button onClick={() => setShowSortModal(!showSortModal)} id="sortBy" className="flex flex-row items-center gap-2 justify-center bg-[#C0D9FF] p-1 rounded items-center justify-center">
              <div className="bg-[#C0D9FF]">SORT BY</div>
              <img className="h-6 w-6 " id="filter" src={bluefilter} alt="" />
            </button>
            <div id="count"></div>
          </div>
        </header>
        <div id="content" className="">
          <>
            <div className="lg:w-[100%]  2xl:w-[100%] sm:w-full xs:w-full rounded-lg w-[100%] flex justify-center">
              <table className="w-[98%] divide  -y divide-gray-200 border-separate border-spacing-y-3 md:m-4 lg:m-4 m-[10px] ">
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <Link
                      to={isLargeScreen ? `/building/${item.id}` : `/homemoreinfo/building/${item.id}`}
                      className="bg-[white] block"
                      key={index}
                    >
                      <tr className="bg-[white] w-[100%] flex justify-between">
                        <td style={{ lineHeight: '3px', color: 'rgba(0, 0, 0, 0.8)' }} className="rounded-l-xl px-6 py-4 whitespace-nowrap text-sm font-sm items-center flex">
                          <div className="flex flex-row items-center gap-1">
                            <img className="h-4 w-4" src={th} alt="" />
                            <div>Building {item.name}</div>
                          </div>
                        </td>
                        <td style={{ lineHeight: '3px', color: 'rgba(0, 0, 0, 0.8)' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm flex justify-end">
                          <div className="flex flex-row gap-1 items-center">
                            <div style={{ backgroundColor: 'rgba(255, 153, 0, 0.2)' }} className="h-10 w-10 bg-[rgba(255, 83, 73, 0.2)] rounded items-center justify-center flex">
                              <img className="h-6 w-6 " src={screws} alt="" />
                            </div>
                            <div style={{ backgroundColor: 'rgba(255, 83, 73, 0.2)' }} className="h-10 w-10 bg-[rgba(255, 83, 73, 0.2)] rounded items-center justify-center flex">
                              <img className="h-6 w-6 " src={alarms} alt="" />
                            </div>
                            <div className="flex flex-row gap-2 bg-[#EDF1F7] h-[2.5rem] items-center justify-center rounded w-[fit-content] p-2">
                              <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                                <img className="h-4 w-4" src={buildingunit} alt="" />
                                <div style={{ color: 'rgba(92, 98, 110, 0.7)' }} className="text-[rgba(92, 98, 110, 0.7)]">UNITS {item.unitCount}</div>
                              </div>
                              <img className="h-4 " src={divide} alt="" />
                              <div className="flex flex-row gap-1 items-center text-[rgba(92, 98, 110, 0.7)]">
                                <img className="h-4 w-4" src={devices} alt="" />
                                <div style={{ color: 'rgba(92, 98, 110, 0.7)' }} className="text-[rgba(92, 98, 110, 0.7)]">Devices {item.deviceCount}</div>
                              </div>
                            </div>
                            <img className="h-6 w-6 " src={arrow} alt="" />
                          </div>
                        </td>
                      </tr>
                    </Link>
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
                <option value="buildings">Building Name</option>
                <option value="units">Units</option>
                <option value="devices">Devices</option>
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
              <button></button>
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
  );
};

export default Building;
