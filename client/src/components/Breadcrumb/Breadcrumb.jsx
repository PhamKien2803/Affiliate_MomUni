// src/components/Breadcrumb/Breadcrumb.jsx
import styles from './Breadcrumb.module.scss';

function Breadcrumb({ path }) {
  // Example: path = ['Home', 'Body & Hand', 'Hand']
  return (
    <nav className={styles.breadcrumb}>
      {path.map((crumb, index) => (
        <span key={index}>
          {crumb}
          {index < path.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
