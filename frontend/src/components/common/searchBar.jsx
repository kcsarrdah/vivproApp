import React, { useState } from 'react';
import { OutlinedInput, InputAdornment, IconButton, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchDialog from './searchDialog';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setDialogOpen(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <OutlinedInput
        size="small"
        placeholder="Search songs..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={handleKeyPress}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        disabled={!searchValue.trim()}
        data-testid="sort-button"
      >
        Get Song
      </Button>

      <SearchDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        searchTitle={searchValue}
      />
    </Box>
  );
};

export default SearchBar;