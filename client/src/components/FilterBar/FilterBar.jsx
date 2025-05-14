// src/components/FilterBar/FilterBar.jsx
import styles from './FilterBar.module.scss';

function FilterBar() {
  return (
    <div className={styles.filterBar}>
      <label>Filter by:</label>
      <select>
        <option>All</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>
    </div>
  );
}

export default FilterBar;
