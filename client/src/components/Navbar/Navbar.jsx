// src/components/Navbar/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import TopBar from '../TopBar/TopBar';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

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
          <li><Link to="/blog" className="navLink">Read</Link></li>
          <li>Stores</li>
        </ul>
        <div className={styles.actions}>
          <span className={styles.search}>🔍</span>
          <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>Log in</span>
          <span>Cabinet</span>
          <span>Cart</span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
