
const GENRES = [
  'All',
  'Jazz',
  'Electronic',
  'Rock',
  'Classical'
]

function GenreFilterBar({ selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter-bar">
      {GENRES.map((genre) => (
        <button
          key={genre}
          type="button"
          className={
            selectedGenre === genre
              ? 'genre-button active'
              : 'genre-button'
          }
          onClick={() => onGenreChange(genre)}
          aria-pressed={selectedGenre === genre}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilterBar
