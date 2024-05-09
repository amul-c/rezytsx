import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface KPIData {
  KPI: string;
  T3: string | number;
  TGT: string | number;
  PROJECTION: string | number;
}

const KPI = ({propertyId}) => {
  const [kpidata, setKpiData] = useState<KPIData[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`http://localhost:8080/kpi/property/${propertyId}`);
        const mappedData: KPIData[] = response.data.flatMap((item) => [
          {
            KPI: 'Gallons',
            T3: item.gallons['T-3'],
            TGT: item.gallons.TGT,
            PROJECTION: item.gallons.Projection
          },
          {
            KPI: 'Expenses',
            T3: item.expenses['T-3'],
            TGT: item.expenses.TGT,
            PROJECTION: item.expenses.Projection
          },
          {
            KPI: 'Revenue',
            T3: item.revenue['T-3'],
            TGT: item.revenue.TGT,
            PROJECTION: item.revenue.Projection
          }
        ]);
        setKpiData(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className='bg-white lg:w-[100%] xl:w-[50%] 2xl:w-[50%] sm:w-full xs:w-full rounded-lg w-[100%]'>
        <div className='m-2 text-[#01337C]'>KPI</div>
        <table className="w-[95%] divide  -y divide-gray-200 border-separate border-spacing-y-3 md:m-4 lg:m-4 m-[10px]">
          <thead className="bg-[#01337C] text-white-800">
            <tr>
              <th scope="col" className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 rounded-l-xl px-6 py-3 text-start text-xs font-medium uppercase text-white"></th>
              <th scope="col" className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-3 text-start text-xs font-medium uppercase text-white">T-3</th>
              <th scope="col" className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-3 text-start text-xs font-medium uppercase text-white">TGT</th>
              <th scope="col" className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-3 text-start text-xs font-medium uppercase text-white rounded-r-xl">Projection</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kpidata?.map((item, index) => (
              <tr key={index} className="bg-[#EDF1F7]">
                <td style={{ lineHeight: '3px' }} className="rounded-l-xl px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.KPI}</td>
                <td style={{ lineHeight: '3px' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{item.T3}</td>
                <td style={{ lineHeight: '3px' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm text-gray-800">{item.TGT}</td>
                <td style={{ lineHeight: '3px' }} className="xl:px-6 lg:px-6 sm:px-2 xs:px-2 py-4 whitespace-nowrap text-sm text-gray-800 rounded-r-xl">{item.PROJECTION}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default KPI;
