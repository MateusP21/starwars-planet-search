import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function Search() {
  const { handleSearch } = useContext(DataContext);

  return (
    <div>
      <input
        onChange={ (e) => handleSearch(e.target.value) }
        type="text"
        data-testid="name-filter"
      />
    </div>
  );
}
