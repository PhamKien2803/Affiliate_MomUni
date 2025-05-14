// src/components/Footer/Footer.jsx
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <p>Help</p>
          <p>Contact Us</p>
        </div>
        <div>
          <p>Company</p>
          <p>Our Story</p>
        </div>
        <div>
          <p>Legal</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <p className={styles.copy}>© Aēsop</p>
    </footer>
  );
}

export default Footer;
