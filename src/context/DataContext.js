import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const greaterThen = 'maior que';
  const lessThen = 'menor que';
  const equalThen = 'igual a';
  const [filter, setFilter] = useState({
    filterByName: {
      name: '',
    },
    selectedFilter: '',
    order: {
      column: '',
      sort: '',
    },
    filterByNumericValues: [],
    defaultColumns: ['population',
      'rotation_period',
      'diameter',
      'orbital_period',
      'surface_water'],
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(ENDPOINT);
      const json = await res.json();
      // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
      const dataSorted = json.results.sort(
        (current, next) => current.name.localeCompare(next.name),
      );
      setData(dataSorted);
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

  const handleOrdernation = (selectedOrder) => {
    setFilter((prevState) => ({
      ...prevState,
      order: {
        column: selectedOrder.column,
        sort: selectedOrder.order,
      },
    }));

    const unknownValues = data.filter(
      (planet) => planet[selectedOrder.column] === 'unknown',
    );

    if (selectedOrder.order === 'ASC') {
      const ascOrdernation = data.filter(
        (planet) => planet[selectedOrder.column] !== 'unknown',
      ).sort((current, next) => (
        Number(current[selectedOrder.column]) - Number(next[selectedOrder.column])));
      setData([...ascOrdernation, ...unknownValues]);
    } else {
      const descOrdernation = data.filter(
        (planet) => planet[selectedOrder.column] !== 'unknown',
      ).sort((current, next) => (
        Number(next[selectedOrder.column]) - Number(current[selectedOrder.column])));
      setData([...descOrdernation, ...unknownValues]);
    }
  };

  const submitFilter = (userFilters) => {
    setFilter((prevState) => ({
      ...prevState,
      selectedFilter: 'byColumnAndValues',
      filterByNumericValues: [...prevState.filterByNumericValues, userFilters],
      defaultColumns: prevState
        .defaultColumns
        .filter((column) => column !== userFilters.column),
    }));
  };

  const cleanFilters = () => {
    setFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: [],
    }));
  };

  const removeFilter = (currentFilter) => {
    setFilter((prevState) => ({
      ...prevState,
      filterByNumericValues: prevState
        .filterByNumericValues.filter(({ column }) => column !== currentFilter.column),
      defaultColumns: [...prevState.defaultColumns, currentFilter.column],
    }));
  };

  const filterByColumnAndValues = (currentData) => {
    const { filterByNumericValues } = filter;
    let temp = filterByPlanetName(currentData);
    filterByNumericValues.forEach((currentFilter) => {
      const { column, comparison, value } = currentFilter;
      temp = temp.filter((planet) => {
        const filterOptions = {
          [equalThen]: planet[column] === (value) && planet,
          [lessThen]: planet[column] < Number(value) && planet,
          [greaterThen]: planet[column] > Number(value) && planet,
        };

        return filterOptions[comparison];
      });
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
        handleOrdernation,
        filter,
        cleanFilters,
        removeFilter,
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
