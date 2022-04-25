import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Filter() {
  const {
    submitFilter,
    cleanFilters,
    removeFilter,
    filter: { defaultColumns, filterByNumericValues } } = useContext(DataContext);
  const [selectedField, setSelectedField] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });

  return (
    <section>
      <div>
        <select
          data-testid="column-filter"
          onChange={ (e) => setSelectedField(
            { ...selectedField, column: e.target.value },
          ) }
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
          onChange={ (e) => setSelectedField(
            { ...selectedField, comparison: e.target.value },
          ) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          data-testid="value-filter"
          type="number"
          value={ selectedField.value }
          onChange={ (e) => setSelectedField(
            { ...selectedField, value: e.target.value },
          ) }

        />
        <button
          type="button"
          onClick={ () => submitFilter(selectedField) }
          data-testid="button-filter"
        >
          Filtrar

        </button>

        <button
          type="button"
          onClick={ () => cleanFilters() }
          data-testid="button-remove-filters"

        >
          Remover Filtros

        </button>
      </div>
      <div className="filters-applied">
        {
          filterByNumericValues.map(({ column, comparison, value }) => (
            <span key={ value + column + comparison } data-testid="filter">
              {column}
              {' '}
              {comparison}
              {' '}
              {value}
              {' '}
              <button onClick={ () => removeFilter(column) } type="button">X</button>
            </span>))
        }
      </div>
    </section>
  );
}
