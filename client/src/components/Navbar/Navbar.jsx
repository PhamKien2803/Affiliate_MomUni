// src/components/Navbar/Navbar.jsx
import styles from './Navbar.module.scss';
import TopBar from '../TopBar/TopBar';

function Navbar() {
  return (
    <header>
      <TopBar />
      <nav className={styles.navbar}>
        <div className={styles.logo}>Aēsop.</div>
        <ul className={styles.menu}>
          <li>Skin Care</li>
          <li>Body & Hand</li>
          <li>Hair</li>
          <li>Fragrance</li>
          <li>Home</li>
          <li>Kits & Travel</li>
          <li>Gifts</li>
          <li>Read</li>
          <li>Stores</li>
        </ul>
        <div className={styles.actions}>
          <span className={styles.search}>🔍</span>
          <span>Log in</span>
          <span>Cabinet</span>
          <span>Cart</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
