import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation.jsx';
import Menu from './components/Menu.jsx';
import './App.css';

function App() {
  const [menuData, setMenuData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TEMP: force fresh fetch (remove later)
    localStorage.removeItem('menuData');

    const loadMenu = async () => {
      const cached = localStorage.getItem('menuData');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setMenuData(parsed);
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem('menuData');
        }
      }

      try {
        const res = await fetch('/menu.json');
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data.categories)) throw new Error('Invalid JSON format');
        setMenuData(data.categories);
        localStorage.setItem('menuData', JSON.stringify(data.categories));
        setLoading(false);
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const filteredCategories =
    selectedFilters.length === 0
      ? menuData
      : menuData.filter((cat) => selectedFilters.includes(cat.name));

  if (error) return <p>Error loading menu: {error}</p>;

  return (
    <div className="app">
      <div className='blur'>
        <Navigation
          allCategories={menuData || []}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
        />
        <Menu
          categories={filteredCategories}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;