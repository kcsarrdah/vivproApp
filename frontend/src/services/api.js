import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

// Export individual functions instead of an object
export const loadInitialData = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/songs/load-data`);
    return response.data;
  } catch (error) {
    console.error('Error loading initial data:', error);
    throw error;
  }
};

export const getSongs = async (top = 0, size = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/songs?top=${top}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching songs:', error);
    throw error;
  }
};

export const updateRating = async (songId, rating) => {
  try {
    const response = await axios.put(`${BASE_URL}/songs/rate/${songId}`, {
      rating: rating
    });
    return response.data;
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
};

export const getSongByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/songs/search?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching song:', error);
    throw error;
  }
};