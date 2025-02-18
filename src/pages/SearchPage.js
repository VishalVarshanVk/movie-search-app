import { useState, useEffect } from 'react';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [movieType, setMovieType] = useState('');

  const handleSearch = async (page = 1) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query, page, movieType);
      console.log('API Response:', data); // Debug log

      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
      // if (data.Response === 'True') {
      //   setError(null);
      // } else {
      //   setError(data.Error || 'No results found');
      //   setMovies([]);
      //   setTotalResults(0);
      // }
    } catch (err) {
      console.error('Search error:', err); // Debug log
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    handleSearch(newPage);
  };

  // Handle initial search
  const handleInitialSearch = () => {
    setCurrentPage(1);
    handleSearch(1);
  };

  // Effect to handle type change
  useEffect(() => {
    if (query.trim()) {
      handleSearch(currentPage);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        onSearch={handleInitialSearch}
        movieType={movieType}
        setMovieType={setMovieType}
      />

      {loading && (
        <div className="text-center py-8">
          <div className="text-blue-600 text-xl">Loading...</div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 text-center py-8">
          {error}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>

          {totalResults > 10 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / 10)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!loading && !error && movies.length === 0 && query && (
        <div className="text-center py-8 text-gray-600">
          No movies found. Try a different search term.
        </div>
      )}
    </div>
  );
}

export default SearchPage; 