
import { useState } from 'react'

import { ALBUMS } from '../data/albums'

import CatalogHero from '../components/CatalogHero'
import GenreFilterBar from '../components/GenreFilterBar'
import AlbumGrid from '../components/AlbumGrid'

function CatalogPage({ onAddToCart }) {
  const [selectedGenre, setSelectedGenre] = useState('All')

  const filteredAlbums =
    selectedGenre === 'All'
      ? ALBUMS
      : ALBUMS.filter((album) => album.genre === selectedGenre)

  return (
    <main className="catalog-page">
      <CatalogHero />

        <section id="collection" className="catalog-section">
        <div className="catalog-heading">
          <h2>Explore Our Collection</h2>
          <p>Discover something worth listening to.</p>
        </div>

        <GenreFilterBar
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />

        <AlbumGrid
          albums={filteredAlbums}
          onAddToCart={onAddToCart}
        />
      </section>
    </main>
  )
}

export default CatalogPage
