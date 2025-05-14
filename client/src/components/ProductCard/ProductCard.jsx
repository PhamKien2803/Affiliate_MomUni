// src/components/ProductCard/ProductCard.jsx
import styles from './ProductCard.module.scss';

function ProductCard({ name, tagline, price, image }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} />
        <button className={styles.fav}>♡</button>
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.price}>{price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
