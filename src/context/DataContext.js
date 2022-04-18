import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ENDPOINT);
      const json = await res.json();
      setData(json.results);
    };
    fetchData();
  }, []);

  const handleSearch = (filterValue) => {
    setFilter((prevState) => ({
      ...prevState,
      filterByName: { name: filterValue },
    }));
  };

  return (
    <DataContext.Provider value={ { data, handleSearch, filter } }>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
