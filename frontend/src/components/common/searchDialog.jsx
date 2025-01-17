import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getSongByTitle } from '../../services/api';

const SearchDialog = ({ open, onClose, searchTitle }) => {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && searchTitle) {
      const performSearch = async () => {
        try {
          setLoading(true);
          setError(null);
          const result = await getSongByTitle(searchTitle);
          setSearchResult(result);
          if (!result) {
            setError('No song found with this title');
          }
        } catch (err) {
          setError('Error searching for song');
          setSearchResult(null);
        } finally {
          setLoading(false);
        }
      };

      performSearch();
    }
  }, [open, searchTitle]);

  const handleClose = () => {
    setSearchResult(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Search Result
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {loading && <Typography>Searching...</Typography>}
        
        {error && (
          <Typography color="error">{error}</Typography>
        )}

        {searchResult && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">{searchResult.title}</Typography>
            <Box sx={{ mt: 1 }}>
              <Typography>Danceability: {searchResult.danceability}</Typography>
              <Typography>Energy: {searchResult.energy}</Typography>
              <Typography>Acousticness: {searchResult.acousticness}</Typography>
              <Typography>Tempo: {searchResult.tempo}</Typography>
              <Typography>Rating: {searchResult.star_rating || 'Not rated'}</Typography>
            </Box>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchDialog;