// src/pages/HomePage.jsx
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../components/Footer/Footer';

function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <section style={{ padding: '2rem' }}>
        <h2>A selection of affection-affirming gifts</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
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
      <Footer />
    </div>
  );
}

export default HomePage;
