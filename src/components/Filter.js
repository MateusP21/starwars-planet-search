import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Filter() {
  const { submitFilter, filter: { defaultColumns } } = useContext(DataContext);
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
        {
          defaultColumns.map(
            (element, index) => (
              <option
                key={ index }
                value={ element }
              >
                {element}
              </option>),
          )
        }

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
