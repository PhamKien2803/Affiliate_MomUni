// src/pages/CategoryPage.jsx
import Navbar from '../../components/Navbar/Navbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterBar from '../../components/FilterBar/FilterBar';
import Footer from '../../components/Footer/Footer';
import styles from './CategoryPage.module.scss';

function CategoryPage() {
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <Breadcrumb path={['Home', 'Body & Hand', 'Hand']} />
        <div>
          <h1>Hand</h1>
          <p>Hydrate, nourish and soften.<br />
            Modest instruments to which we owe our daily comforts, the hands deserve care befitting their unflinching service.</p>
        </div>
      </div>
      <FilterBar />
      <div className={styles.grid}>
        <ProductCard
          name="Reverence Aromatique Hand Wash"
          tagline="Fine-grain gel cleanser"
          price="$41.00"
          image="https://via.placeholder.com/250x250"
        />
        <ProductCard
          name="Resurrection Aromatique Hand Wash"
          tagline="Fine-grain gel cleanser"
          price="$41.00"
          image="https://via.placeholder.com/250x250"
        />
        <ProductCard
          name="Geranium Leaf Body Scrub"
          tagline="Cooling cleansing paste"
          price="$69.00"
          image="https://via.placeholder.com/250x250"
        />
        {/* Add more ProductCards as needed */}
      </div>
      <Footer />
    </div>
  );
}

export default CategoryPage;
