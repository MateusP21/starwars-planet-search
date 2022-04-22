import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Filter() {
  const { submitFilter } = useContext(DataContext);
  const [userFilters, setUserFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  const handleUserFilters = ({ target }) => {
    const { name, value } = target;
    setUserFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ handleUserFilters }
        value={ userFilters.column }
        name="column"
        id=""
      >
        <option value="population">population</option>
        <option value="rotation_period">rotation_period</option>
        <option value="diameter">diameter</option>
        <option value="orbital_period">orbital_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ handleUserFilters }
        value={ userFilters.comparison }
        name="comparison"
        id=""
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ userFilters.value }
        onChange={ handleUserFilters }
        name="value"
      />
      <button
        type="button"
        onClick={ () => submitFilter(userFilters) }
        data-testid="button-filter"
      >
        Filtrar

      </button>
    </div>
  );
}
