// src/components/Navbar/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Navbar.module.scss';
import TopBar from '../TopBar/TopBar';

export default function Navbar() {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLoginClick = () => {
    navigate('/login');
  };

  // List of main menu items and their dummy dropdown content
  const menuItems = [
    { label: 'Skin Care',    dropdownContent: 'Skin Care Content Here' },
    { label: 'Body & Hand',  dropdownContent: 'Body & Hand Content Here' },
    { label: 'Hair',         dropdownContent: 'Hair Content Here' },
    { label: 'Fragrance',    dropdownContent: 'Fragrance Content Here' },
    { label: 'Home',         dropdownContent: 'Home Content Here' },
    { label: 'Kits & Travel',dropdownContent: 'Kits & Travel Content Here' },
    { label: 'Gifts',        dropdownContent: 'Gifts Content Here' },
    { label: 'Stores',       dropdownContent: 'Stores Content Here' },
  ];

  return (
    <header>
      <TopBar />
      <nav className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logo}>Aēsop.</div>

        {/* Main Menu */}
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.label}
              className={styles.menuItem}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {item.label}

              {/* Full‐width Dropdown Panel */}
              <div
                className={`${styles.dropdownPanel} ${
                  hoveredItem === item.label ? styles.visible : ''
                }`}
              >
                {/* Top row: mini categories + placeholder image */}
                <div className={styles.dropdownTop}>
                  <div className={styles.miniCategories}>
                    <h4>Category</h4>
                    <a href="#">minicategory1</a>
                    <a href="#">minicategory2</a>
                    <a href="#">minicategory3</a>
                    <a href="#">minicategory4</a>
                  </div>
                  <div className={styles.dropdownImage}>
                    <img
                      src="https://via.placeholder.com/300x180.png?text=Image"
                      alt="Placeholder"
                    />
                  </div>
                </div>

                {/* Bottom row: some product placeholders */}
                <div className={styles.dropdownProducts}>
                  <div className={styles.productPlaceholder}>
                    Product 1
                  </div>
                  <div className={styles.productPlaceholder}>
                    Product 2
                  </div>
                  <div className={styles.productPlaceholder}>
                    Product 3
                  </div>
                  <div className={styles.productPlaceholder}>
                    Product 4
                  </div>
                </div>
              </div>
            </li>
          ))}

          {/* “Read” as a Link without a dropdown panel */}
          <li className={styles.menuItem}>
            <Link to="/blog" className={styles.navLink}>
              Read
            </Link>
          </li>
        </ul>

        {/* Search bar + (Log in / Cabinet / Cart) */}
        <div className={styles.actions}>
          {/* Search input */}
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
            />
          </div>

          <span onClick={handleLoginClick} className={styles.loginLink}>
            Log in
          </span>
          <span className={styles.icon}>Cabinet</span>
          <span className={styles.icon}>Cart</span>
        </div>
      </nav>
    </header>
  );
}
