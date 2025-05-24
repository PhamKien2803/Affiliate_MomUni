// src/pages/HomePage.jsx
import { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../components/Footer/Footer';

import styles from './HomePage.module.scss';
import ExpertFormSection from '../../components/ExpertFormSection/ExpertFormSection';

function HomePage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we’ll just log the email and show a dummy success message.
    console.log('Received email:', email);
    setMessage('Thank you! We have received your email.');
    setEmail(''); // clear the input
  };

  return (
    <div className={styles.component}>
      <Navbar />
      <HeroBanner />

      <section className={styles.productSection}>
        <h2>A selection of affection‐affirming gifts</h2>
        <div className={styles.productGrid}>
          <ProductCard
            name="Eleos Aromatique Hand Balm"
            tagline="Favoured formulation"
            price="$25.00"
            image="https://fastly.picsum.photos/id/48/300/300.jpg?hmac=-BMlSFQmT6-s5bzHB_HzRUp0RAyBMPBjtuEO9e9qJyg"
          />
          <ProductCard
            name="Resurrection Duet"
            tagline="Beloved formulation"
            price="$130.00"
            image="https://fastly.picsum.photos/id/551/300/300.jpg?hmac=LWVazeXVOTiBubPyE4TKWUtMT0BoiXmX_jZTGOo1XqM"
          />
          <ProductCard
            name="Majestic Melodies"
            tagline="Limited edition"
            price="$95.00"
            image="https://fastly.picsum.photos/id/88/300/300.jpg?hmac=hqOk1llBNb7n_z9FdbuqZHqpejGpz74XwzivoEmkQ_c"
          />
        </div>
      </section>


      <ExpertFormSection />

      <Footer />
    </div>
  );
}

export default HomePage;
