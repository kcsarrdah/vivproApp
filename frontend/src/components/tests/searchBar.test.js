import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../common/searchBar';

describe('SearchBar Component', () => {
  test('renders search input', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search songs...')).toBeInTheDocument();
  });

  test('handles input change', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search songs...');
    await userEvent.type(input, 'test song');
    expect(input.value).toBe('test song');
  });

  test('opens dialog when search button is clicked', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search songs...');
    const searchButton = screen.getByRole('button', { name: /get song/i });

    await userEvent.type(input, 'test song');
    fireEvent.click(searchButton);

    // Assert that the dialog is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('handles Enter key press', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search songs...');
    
    await userEvent.type(input, 'test song{enter}');

    // Assert that the dialog is opened
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('disables search button when input is empty', () => {
    render(<SearchBar />);
    const searchButton = screen.getByRole('button', { name: /get song/i });
    expect(searchButton).toBeDisabled();
  });

  test('enables search button when input has value', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search songs...');
    const searchButton = screen.getByRole('button', { name: /get song/i });

    await userEvent.type(input, 'test song');
    expect(searchButton).not.toBeDisabled();
  });
});
