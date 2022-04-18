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
    const { filterByName: { name } } = filter;
    setFilter((prevState) => ({
      ...prevState,
      filterByName: { name: filterValue },
    }));

    setData(data.filter((item) => item.name.includes(name)));
  };

  return (
    <DataContext.Provider value={ { data, handleSearch } }>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
