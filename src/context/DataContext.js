import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // const [selectedFilter, setSelectedFilter] = useState('byColumnAndValues');
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    selectedFilter: '',
    filterByNumericValues: [

    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ENDPOINT);
      const json = await res.json();
      setData(json.results);
    };
    fetchData();
  }, []);

  const filterByPlanetName = (currentData) => {
    const { filterByName: { name } } = filter;
    const result = currentData.filter(
      (planet) => planet.name.toLowerCase().includes(name),
    );

    return result;
  };

  const handleSearch = (filterValue) => {
    setFilter((prevState) => ({
      ...prevState,
      selectedFilter: 'byName',
      filterByName: { name: filterValue },
    }));
  };

  const submitFilter = (userFilters) => {
    setFilter((prevState) => ({
      ...prevState,
      selectedFilter: 'byColumnAndValues',
      filterByNumericValues: [...prevState.filterByNumericValues, userFilters],
    }));
  };

  const filterByColumnAndValues = (currentData) => {
    const { filterByNumericValues } = filter;
    let selectedPlanet;
    const greaterThen = 'maior que';
    const lessThen = 'menor que';
    const equalThen = 'igual a';
    let result;
    let temp = [...currentData];
    filterByNumericValues.forEach((currentFilter) => {
      const { column, comparison, value } = currentFilter;
      result = temp.filter((planet) => {
        const filterOptions = {
          [equalThen]: planet[column] === (value) && planet,
          [lessThen]: planet[column] < Number(value) && planet,
          [greaterThen]: planet[column] > Number(value) && planet,
        };

        selectedPlanet = filterOptions[comparison];
        return selectedPlanet;
      });
      temp = result;
    });
    return temp;
  };

  const handleData = (type) => {
    if (!type) return data;
    const filterList = {
      byName: filterByPlanetName(data),
      byColumnAndValues: filterByColumnAndValues(data),
    };

    return filterList[type];
  };
  return (
    <DataContext.Provider
      value={ {
        data,
        handleData,
        handleSearch,
        filter,
        filterByPlanetName,
        filterByColumnAndValues,
        submitFilter,
      } }
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
