import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
        // if (data.Response === 'True') {
        // } else {
        //   setError(data.Error);
        // }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!movie) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-96"
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
              alt={movie.Title}
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900">{movie.Title}</h1>
            <p className="mt-2 text-gray-600">{movie.Year} • {movie.Runtime}</p>
            <p className="mt-2 text-gray-600">{movie.Genre}</p>
            <p className="mt-4 text-gray-700">{movie.Plot}</p>
            <div className="mt-4">
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writers:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
            </div>
            <div className="mt-4">
              <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails; 