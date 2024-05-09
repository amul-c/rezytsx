// URLParamsContext.js
import React, { createContext, useContext, useState } from 'react';
const URLParamsContext = createContext();

export const URLParamsProvider = ({ children }) => {
  const [params, setParams] = useState({});

  const updateParams = (newParams) => {
    setParams(newParams);
  };

  return (
    <URLParamsContext.Provider value={{ params, updateParams }}>
      {children}
    </URLParamsContext.Provider>
  );
};

export const useURLParams = () => useContext(URLParamsContext);
