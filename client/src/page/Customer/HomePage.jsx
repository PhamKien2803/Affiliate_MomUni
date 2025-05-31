import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../components/Footer/Footer';

import styles from './HomePage.module.scss';
import ExpertFormSection from '../../components/ExpertFormSection/ExpertFormSection';

export default function HomePage() {
  /* Sample Data: 5 Products */
  const products = [
    {
      id: 1,
      name: 'Eleos Aromatique Hand Balm',
      tagline: 'Favoured formulation',
      price: '$25.00',
      image:
        'https://fastly.picsum.photos/id/48/300/300.jpg?hmac=-BMlSFQmT6-s5bzHB_HzRUp0RAyBMPBjtuEO9e9qJyg',
    },
    {
      id: 2,
      name: 'Resurrection Duet',
      tagline: 'Beloved formulation',
      price: '$130.00',
      image:
        'https://fastly.picsum.photos/id/551/300/300.jpg?hmac=LWVazeXVOTiBubPyE4TKWUtMT0BoiXmX_jZTGOo1XqM',
    },
    {
      id: 3,
      name: 'Majestic Melodies',
      tagline: 'Limited edition',
      price: '$95.00',
      image:
        'https://fastly.picsum.photos/id/88/300/300.jpg?hmac=hqOk1llBNb7n_z9FdbuqZHqpejGpz74XwzivoEmkQ_c',
    },
    {
      id: 4,
      name: 'Serene Garden Mist',
      tagline: 'Floral infusion',
      price: '$45.00',
      image:
        'https://fastly.picsum.photos/id/383/300/300.jpg?hmac=kHvlx_u4NdH5T113u1zp_vWeeO9r94Hn6U9IqLfuCXg',
    },
    {
      id: 5,
      name: 'Velvet Night Serum',
      tagline: 'Hydrating elixir',
      price: '$80.00',
      image:
        'https://fastly.picsum.photos/id/186/300/300.jpg?hmac=OfGuhQuWxF8XvoIT1uRTP-DT-Qx7VqgWi-cu2D9_KUE',
    },
  ];

  /* Carousel State and Logic */
  const totalItems = products.length;
  const itemsToShow = 3; // Always show 3
  const [startIndex, setStartIndex] = useState(0); // index of leftmost visible item
  const autoScrollRef = useRef(null);

  // Compute the indices of the 3 currently visible items (wrapping by modulo)
  const visibleIndices = [
    startIndex,
    (startIndex + 1) % totalItems,
    (startIndex + 2) % totalItems,
  ];

  // The “active” dot index corresponds to the center item in that 3-item window
  const activeDotIndex = visibleIndices[1];

  // Advance the startIndex by 1 (wrap around)
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  // Go backwards by 1
  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // Jump the window so that the clicked dot’s item becomes the center:
  // If dotIndex is the item we want as center, then startIndex = dotIndex - 1 (mod totalItems)
  const goToDot = (dotIndex) => {
    const newStart = (dotIndex - 1 + totalItems) % totalItems;
    setStartIndex(newStart);
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    autoScrollRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoScrollRef.current();
    };
    const interval = setInterval(play, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.component}>
      <Navbar />
      <HeroBanner />

      <section className={styles.productSection}>
        <h2>A selection of affection‐affirming gifts</h2>

        {/* Carousel Wrapper */}
        <div
          className={styles.carouselContainer}
          onMouseEnter={() => clearInterval(autoScrollRef.current)}
          onMouseLeave={() => {
            autoScrollRef.current = nextSlide;
          }}
        >
          {/* Visible Slide: Always show these 3 items */}
          <div className={styles.slide}>
            {visibleIndices.map((idx) => {
              const prod = products[idx];
              return (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  tagline={prod.tagline}
                  price={prod.price}
                  image={prod.image}
                />
              );
            })}
          </div>

          {/* Prev/Next arrows (always enabled, wrapping) */}
          <button
            className={`${styles.arrowButton} ${styles.prev}`}
            onClick={prevSlide}
            aria-label="Previous"
          >
            ⟨
          </button>
          <button
            className={`${styles.arrowButton} ${styles.next}`}
            onClick={nextSlide}
            aria-label="Next"
          >
            ⟩
          </button>
        </div>

        {/* Dots Indicator: one per item */}
        <div className={styles.dotsContainer}>
          {products.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${
                idx === activeDotIndex ? styles.activeDot : ''
              }`}
              onClick={() => goToDot(idx)}
            ></span>
          ))}
        </div>
      </section>

      <ExpertFormSection />
      <Footer />
    </div>
  );
}
