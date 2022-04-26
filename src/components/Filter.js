import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Filter() {
  const {
    submitFilter,
    cleanFilters,
    removeFilter,
    handleOrdernation,
    filter: { defaultColumns, filterByNumericValues } } = useContext(DataContext);
  const [selectedField, setSelectedField] = useState({
    column: defaultColumns[0],
    comparison: 'maior que',
    value: '0',
  });
  const [ordernation, setOrdernation] = useState({
    column: 'population',
    order: 'ASC',
  });

  useEffect(() => {
    setSelectedField((prevState) => ({
      ...prevState,
      column: defaultColumns[0],
    }));
  }, [defaultColumns]);

  const handleOrder = (value) => {
    setOrdernation((prevState) => ({
      ...prevState,
      order: value,
    }));
  };
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
        <div>
          <select
            onChange={ (e) => setOrdernation({ ...ordernation, column: e.target.value }) }
            data-testid="column-sort"
          >
            {
              ['population',
                'orbital_period',
                'diameter',
                'rotation_period',
                'surface_water']
                .map((column, index) => (
                  <option
                    key={ index }
                    value={ column }
                  >
                    {column}
                  </option>))
            }
          </select>
          <label htmlFor="ASC-RADIO">
            <input
              type="radio"
              onChange={ (e) => handleOrder(e.target.value) }
              checked={ ordernation.order === 'ASC' }
              data-testid="column-sort-input-asc"
              value="ASC"
              id="ASC-RADIO"
            />
            ASC
          </label>

          <label htmlFor="DESC-RADIO">
            <input
              type="radio"
              onChange={ (e) => handleOrder(e.target.value) }
              checked={ ordernation.order === 'DESC' }
              data-testid="column-sort-input-desc"
              value="DESC"
              id="DESC-RADIO"
            />
            DESC
          </label>

          <button
            data-testid="column-sort-button"
            onClick={ () => handleOrdernation(ordernation) }
            type="button"
          >
            {' '}
            ORDENAR
            {' '}

          </button>
        </div>

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
          filterByNumericValues.map((filter) => {
            const { column, value, comparison } = filter;
            return (
              <span key={ value + column + comparison } data-testid="filter">
                {column}
                {' '}
                {comparison}
                {' '}
                {value}
                {' '}
                <button
                  onClick={ () => removeFilter(filter) }
                  type="button"
                >
                  X
                </button>
              </span>
            );
          })
        }
      </div>
    </section>
  );
}
