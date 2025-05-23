// src/pages/ProductPage.jsx
import Navbar from '../../components/Navbar/Navbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Footer from '../../components/Footer/Footer';
import styles from './ProductPage.module.scss';

function ProductPage() {
  return (
    <div>
      <Navbar />
      <Breadcrumb path={['Home', 'Kits & Travel', 'Body & Hand Care Kits']} />
      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <img src="https://via.placeholder.com/300x300" alt="Resurrection Duet" />
        </div>
        <div className={styles.info}>
          <h1>Resurrection Duet</h1>
          <p className={styles.price}>$131.00</p>
          <button className={styles.addBtn}>Add to cart</button>
          <button className={styles.saveBtn}>Save to cabinet</button>
          <div className={styles.details}>
            <h3>About this duet</h3>
            <p>Exceptional formulations for hands, with citrus, woody and herbaceous aromatics.</p>
            <h3>Contents</h3>
            <p>Resurrection Aromatique Hand Wash, Resurrection Aromatique Hand Balm</p>
          </div>
        </div>
      </div>
      <div className={styles.highlights}>
        <div>
          <strong>Pay with Apple Pay</strong>
          <p>Apple Pay is a swift and secure way to make a payment at checkout.</p>
        </div>
        <div>
          <strong>Complimentary gift wrapping</strong>
          <p>It is a pleasure to offer gift wrapping for all orders.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductPage;
