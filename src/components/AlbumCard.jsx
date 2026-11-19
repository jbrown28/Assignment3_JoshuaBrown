
import { Link } from 'react-router-dom'

function AlbumCard({ album, onAddToCart }) {
  return (
    <article className="album-card">
      <Link
        to={`/album/${album.id}`}
        className="album-image-link"
      >
        <img
          src={album.image}
          alt={`${album.title} by ${album.artist}`}
          className="album-image"
        />
      </Link>

      <div className="album-card-content">
        <span className="album-genre">{album.genre}</span>

        <h3>
          <Link to={`/album/${album.id}`}>
            {album.title}
          </Link>
        </h3>

        <p className="album-artist">{album.artist}</p>

        <div className="album-card-footer">
          <strong className="album-price">
            ${album.price.toFixed(2)}
          </strong>

          <button
            type="button"
            className="add-to-cart-button"
            onClick={() => onAddToCart(album)}
            disabled={album.stock < 1}
          >
            {album.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default AlbumCard
