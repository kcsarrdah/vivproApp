import { getSongs, updateRating, getSongByTitle } from './api';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('API Service Tests', () => {
  beforeEach(() => {
    // Clear mock data before each test
    jest.clearAllMocks();
  });

  describe('getSongs', () => {
    test('successfully fetches songs with pagination', async () => {
      const mockData = {
        items: [
          { id: 1, title: 'Song 1' },
          { id: 2, title: 'Song 2' }
        ],
        total: 2
      };

      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getSongs(0, 10);
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/songs?top=0&size=10');
    });

    test('handles network error', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getSongs(0, 10)).rejects.toThrow(errorMessage);
    });

    test('handles invalid parameters', async () => {
      await expect(getSongs(-1, -10)).rejects.toThrow();
    });

    test('handles empty response', async () => {
      const mockEmptyData = {
        items: [],
        total: 0
      };

      axios.get.mockResolvedValueOnce({ data: mockEmptyData });
      const result = await getSongs(0, 10);
      
      expect(result.items).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe('updateRating', () => {
    test('successfully updates song rating', async () => {
      const mockResponse = { message: 'Rating updated successfully' };
      axios.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await updateRating(1, 5);
      expect(result).toEqual(mockResponse);
      expect(axios.put).toHaveBeenCalledWith('http://localhost:8000/api/songs/rate/1', { rating: 5 });
    });

    test('handles invalid rating value', async () => {
      await expect(updateRating(1, 6)).rejects.toThrow();
      await expect(updateRating(1, -1)).rejects.toThrow();
    });

    test('handles non-existent song', async () => {
      axios.put.mockRejectedValueOnce(new Error('Song not found'));
      await expect(updateRating(999, 5)).rejects.toThrow('Song not found');
    });
  });

  describe('getSongByTitle', () => {
    test('successfully finds song by title', async () => {
      const mockSong = { id: 1, title: 'Test Song' };
      axios.get.mockResolvedValueOnce({ data: mockSong });

      const result = await getSongByTitle('Test Song');
      expect(result).toEqual(mockSong);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/songs/search?title=Test%20Song');
    });

    test('handles song not found', async () => {
      axios.get.mockResolvedValueOnce({ data: null });
      const result = await getSongByTitle('Non-existent Song');
      expect(result).toBeNull();
    });
  });
});