import React from 'react';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <Search />
      <Table />
    </DataProvider>
  );
}

export default App;
