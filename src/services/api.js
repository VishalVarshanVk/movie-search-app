import axios from 'axios';

const API_KEY = 'a651cb49'; // Your API key
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(
      `${BASE_URL}/?apikey=${API_KEY}`
    );
    console.log('API URL:', `${BASE_URL}/?apikey=${API_KEY}`); // Debug log
    return response.data;
  } catch (error) {
    console.error('API Error:', error); // Debug log
    throw new Error('Failed to fetch movies');
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(`${BASE_URL}/?apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error); // Debug log
    throw new Error('Failed to fetch movie details');
  }
}; 