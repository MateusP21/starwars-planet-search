import React from 'react';
import './App.css';
import './index.css';
import Search from './components/Search';
import Table from './components/Table';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <DataProvider>
      <div className="container">
        <Search />
        <Table />
      </div>

    </DataProvider>
  );
}

export default App;
