import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SearchBar from '../common/searchBar';

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Song Playlist
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;