import React, { createContext, useState, useContext } from 'react';

const URLParamsContext = createContext();

const URLParamsProvider = ({ children }) => {
  const [urlParams, setURLParams] = useState({});

  const updateURLParams = (newParams) => {
    setURLParams(newParams);
  };

  return (
    <URLParamsContext.Provider value={{ urlParams, updateURLParams }}>
      {children}
    </URLParamsContext.Provider>
  );
};

const useURLParams = () => useContext(URLParamsContext);

export { URLParamsProvider, useURLParams };
