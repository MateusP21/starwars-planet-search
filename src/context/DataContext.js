import React, { createContext, useState, useEffect } from 'react';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ENDPOINT);
      const json = await res.json();
      setData(json.results);
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={ { data } }>
      {children}
    </DataContext.Provider>
  );
};
