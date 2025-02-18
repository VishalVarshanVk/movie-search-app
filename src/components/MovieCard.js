import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <img
          className="w-full h-96 object-cover"
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">{movie.Title}</h2>
          <p className="text-gray-600 mt-2">{movie.Year}</p>
          <p className="text-gray-500 mt-1">{movie.Type}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard; 