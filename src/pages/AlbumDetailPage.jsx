
import { useParams, Link } from 'react-router-dom'
import { ALBUMS } from '../data/albums'

function AlbumDetailPage({ onAddToCart }) {
  const { albumId } = useParams()

  const album = ALBUMS.find((item) => item.id === albumId)

  if (!album) {
    return (
      <main className="album-detail-page">
        <h1>Album Not Found</h1>
        <p>Sorry, we couldn't find that record.</p>
        <Link to="/">Return to Collection</Link>
      </main>
    )
  }

  return (
    <main className="album-detail-page">
      <Link to="/" className="back-link">
        &larr; Back to Collection
      </Link>

      <div className="album-detail-container">
        <div className="album-detail-image">
          <img src={album.image} alt={album.title} />
        </div>

        <div className="album-detail-info">
          <span className="album-genre">{album.genre}</span>

          <h1>{album.title}</h1>

          <h2>{album.artist}</h2>

          <p className="album-description">
            {album.description}
          </p>

          <p className="detail-price">
            ${album.price.toFixed(2)}
          </p>

          <p className="stock-status">
            {album.stock > 0
              ? `${album.stock} copies available`
              : 'Out of Stock'}
          </p>

          <button
            type="button"
            className="add-to-cart-button"
            onClick={() => onAddToCart(album)}
            disabled={album.stock < 1}
          >
            {album.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <section className="album-specifications">
            <h3>Record Specifications</h3>

            <dl>
              <div>
                <dt>Catalog Number</dt>
                <dd>{album.specs.catalogNumber}</dd>
              </div>

              <div>
                <dt>Vinyl Weight</dt>
                <dd>{album.specs.weight}</dd>
              </div>

              <div>
                <dt>Playback Speed</dt>
                <dd>{album.specs.speed}</dd>
              </div>

              <div>
                <dt>Record Label</dt>
                <dd>{album.specs.label}</dd>
              </div>
            </dl>
          </section>

          <section className="album-tracklist">
            <h3>Tracklist</h3>

            <ol>
              {album.tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  )
}

export default AlbumDetailPage
