import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchDialog from '../common/searchDialog';
import { getSongByTitle } from '../../services/api';

// Mock the API call
jest.mock('../../services/api');

describe('SearchDialog Component', () => {
  const mockSong = {
    id: 1,
    title: 'Test Song',
    danceability: 0.5,
    energy: 0.6,
    acousticness: 0.3,
    tempo: 120,
    star_rating: 4,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dialog when open', () => {
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="Test Song" />);
    expect(screen.getByText('Search Result')).toBeInTheDocument();
  });

  test('shows loading state while searching', async () => {
    getSongByTitle.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="Test Song" />);
    
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  test('displays song details when found', async () => {
    getSongByTitle.mockResolvedValueOnce(mockSong);
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="Test Song" />);

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
      expect(screen.getByText(/Danceability: 0.5/)).toBeInTheDocument();
      expect(screen.getByText(/Energy: 0.6/)).toBeInTheDocument();
      expect(screen.getByText(/Acousticness: 0.3/)).toBeInTheDocument();
      expect(screen.getByText(/Tempo: 120/)).toBeInTheDocument();
      expect(screen.getByText(/Rating: 4/)).toBeInTheDocument();
    });
  });

  test('shows error when song not found', async () => {
    getSongByTitle.mockResolvedValueOnce(null);
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="Nonexistent Song" />);

    await waitFor(() => {
      expect(screen.getByText('No song found with this title')).toBeInTheDocument();
    });
  });

  test('shows error when API call fails', async () => {
    getSongByTitle.mockRejectedValueOnce(new Error('API Error'));
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="Test Song" />);

    await waitFor(() => {
      expect(screen.getByText('Error searching for song')).toBeInTheDocument();
    });
  });

  test('closes dialog when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<SearchDialog open={true} onClose={mockOnClose} searchTitle="Test Song" />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('does not perform search if searchTitle is empty', async () => {
    render(<SearchDialog open={true} onClose={jest.fn()} searchTitle="" />);
    
    expect(getSongByTitle).not.toHaveBeenCalled();
    expect(screen.queryByText('Searching...')).not.toBeInTheDocument();
  });
});
