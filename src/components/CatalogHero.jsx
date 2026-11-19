
import { Link } from 'react-router-dom'

function CatalogHero() {
  return (
    <section className="catalog-hero">
      <div className="hero-content">
        <p className="hero-eyebrow">THE VINYL EXPERIENCE</p>

        <h1>
          Rediscover the
          <br />
          Art of Listening.
        </h1>

        <p className="hero-description">
          Explore a curated collection of timeless records,
          legendary artists, and unforgettable sounds.
        </p>

        <Link to="#collection" className="hero-button">
          Explore Collection
        </Link>
      </div>

      <div className="hero-decoration" aria-hidden="true">
        <div className="vinyl-record">
          <div className="vinyl-center"></div>
        </div>
      </div>
    </section>
  )
}

export default CatalogHero
