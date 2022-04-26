import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import Filter from './Filter';

export default function Table() {
  const {
    data,
    handleData,
    filter: { selectedFilter } } = useContext(DataContext);
  const header = data.length > 0 && Object.keys(data[0])
    .filter((item) => item !== 'residents')
    .map((item) => item.replace('_', ''));

  return (
    <div>
      <Filter />
      <table>
        <thead>
          <tr>
            {header && header.map((head, index) => (
              <th key={ header + index }>
                {head}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0
              && handleData(selectedFilter).map((item) => {
                const { name,
                  rotation_period: rotationPeriod,
                  orbital_period: orbitalPeriod,
                  diameter,
                  climate,
                  gravity,
                  terrain,
                  surface_water: surfaceWater,
                  population,
                  films,
                  created,
                  edited, url } = item;

                return (
                  <tr key={ name }>
                    <td data-testid="planet-name">{name}</td>
                    <td>{rotationPeriod}</td>
                    <td>{orbitalPeriod}</td>
                    <td>{diameter}</td>
                    <td>{climate}</td>
                    <td>{gravity}</td>
                    <td>{terrain}</td>
                    <td>{surfaceWater}</td>
                    <td>{population}</td>
                    <td>{films}</td>
                    <td>{created}</td>
                    <td>{edited}</td>
                    <td>{url}</td>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
}
