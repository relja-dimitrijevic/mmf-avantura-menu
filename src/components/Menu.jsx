import React from 'react';
import './Menu.css';  // Remove the Filters import since it's no longer used

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgError, setImgError] = React.useState(false);
  const handleError = () => setImgError(true);

  if (imgError) {
    return (
      <div
        className={className}
        style={{
          background: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Image not found
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={handleError} />;
};

function Menu({ categories, loading }) {  // Updated: Only categories and loading props (removed allCategories, selectedFilters, onFilterChange)
  if (loading) return <p>Loading menu...</p>;
  if (!Array.isArray(categories) || categories.length === 0) {  // Updated: Check categories instead of allCategories
    return <p>No categories available.</p>;
  }

  return (
    <section className="menu">
      {/* Removed Filters component - it's now in Navigation */}
      <div className="menu-content">
        {categories.map((category) => (
          <div key={category.name} className="category-section">
            <ImageWithFallback
              src={category.backgroundImage}
              alt={category.name}
              className="category-bg"
            />
            <div className="category-overlay">
              <h2 className="category-header">{category.name}</h2>
              <ul className="category-items">
                {category.items.map((item, index) => (
                  <li key={index} className="menu-item">
                    <span>{item.name}</span>
                    <span>{item.price} RSD</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;