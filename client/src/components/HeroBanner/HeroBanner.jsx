// src/components/HeroBanner/HeroBanner.jsx
import styles from './HeroBanner.module.scss';

function HeroBanner() {
  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1>Eleos Aromatique Hand Balm</h1>
        <p>A new addition to our time-honoured range of Aromatique Hand Balms—Eleos joins Resurrection and Reverence.</p>
        <button className={styles.button}>Discover the formulation →</button>
      </div>
      <div className={styles.image}>
        <img src="https://fastly.picsum.photos/id/109/500/500.jpg?hmac=GuiA2DsStHyK2w6rKgYBfhpA764aHMZQJGGgLYo0Xb8" alt="Hand Balm" />
      </div>
    </div>
  );
}

export default HeroBanner;
