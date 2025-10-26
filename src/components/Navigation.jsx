import React, { useState } from 'react';
import './Navigation.css';

function Navigation({ allCategories = [], selectedFilters = [], onFilterChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((s) => !s);

  const toggleCategory = (categoryName) => {
    const next = selectedFilters.includes(categoryName)
      ? selectedFilters.filter((c) => c !== categoryName)
      : [...selectedFilters, categoryName];

    if (typeof onFilterChange === 'function') onFilterChange(next);
  };

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      <div
        className="nav-burger"
        onClick={toggleMenu}
        role="button"
        aria-label="Toggle navigation menu"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') toggleMenu();
        }}
      >
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`burger-line ${isMenuOpen ? 'open' : ''}`}></div>
      </div>

      {isMenuOpen && (
        <div className="nav-dropdown" role="menu">
          <div className="nav-actions">
            <button
              onClick={() => {
                alert('Open Galerija (Gallery)');
                setIsMenuOpen(false);
              }}
            >
              Gallery
            </button>

            <button
              onClick={() => {
                alert('Subscribe to Newsletter');
                setIsMenuOpen(false);
              }}
            >
              Newsletter
            </button>
          </div>

          <div className="nav-filters">
            {!Array.isArray(allCategories) || allCategories.length === 0 ? (
              <p className="no-filters">No categories available</p>
            ) : (
              <div
                className="nav-filters-list"
                style={{ maxHeight: '40vh', overflowY: 'auto', paddingRight: '0.5rem' }}
              >
                {allCategories.map((cat) => {
                  const checked = selectedFilters.includes(cat.name);
                  return (
                    <label
                      key={cat.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        padding: '6px 0',
                      }}
                    >
                      <input
                        type="checkbox"
                        value={cat.name}
                        checked={checked}
                        onChange={() => toggleCategory(cat.name)}
                      />
                      <span>{cat.name}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;