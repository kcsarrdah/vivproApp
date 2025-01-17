import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Button } from '@mui/material';
import StarRating from '../rating/starRating';
import { updateRating } from '../../services/api';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { downloadCSV } from '../../utils/csvExport';
import DownloadIcon from '@mui/icons-material/Download';

const SongTable = ({ 
  songs, 
  setSongs, 
  loading, 
  error,
  paginationModel,
  setPaginationModel,
  totalRows,
  sortDirection,
  setSortDirection
}) => {

  const handleRatingChange = async (id, newValue) => {
    try {
      setSongs(songs.map(song => 
        song.id === id ? { ...song, star_rating: newValue } : song
      ));
      await updateRating(id, newValue);
    } catch (error) {
      setSongs(songs.map(song => 
        song.id === id ? { ...song, star_rating: song.star_rating } : song
      ));
    }
  };

  const handlePaginationModelChange = (newModel) => {
    setPaginationModel(newModel);
  };

  const handleSortChange = () => {
    const newDirection = 
      sortDirection === 'default' ? 'asc' : 
      sortDirection === 'asc' ? 'desc' : 'default';
    setSortDirection(newDirection);
  };

  const handleDownload = () => {
    downloadCSV(songs, 'song_playlist.csv');
  };

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 50,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'title', 
      headerName: 'Title', 
      flex: 2,
      minWidth: 200,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Title
          <IconButton
            size="small"
            onClick={handleSortChange}
          >
            {sortDirection === 'asc' && <ArrowUpwardIcon />}
            {sortDirection === 'desc' && <ArrowDownwardIcon />}
            {sortDirection === 'default' && <ImportExportIcon />}
          </IconButton>
        </Box>
      )
    },
    { 
      field: 'danceability', 
      headerName: 'Danceability', 
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'energy', 
      headerName: 'Energy', 
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'acousticness', 
      headerName: 'Acousticness', 
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'tempo', 
      headerName: 'Tempo', 
      width: 110,
      align: 'center',
      headerAlign: 'center',
    },
    { 
      field: 'star_rating', 
      headerName: 'Rating', 
      width: 200,
      renderCell: (params) => (
        <StarRating 
          value={params.value || 0} 
          onChange={(newValue) => handleRatingChange(params.row.id, newValue)}
        />
      ),
      align: 'center',
      headerAlign: 'center',
    }
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            }
          }}
        >
          Download CSV
        </Button>
      </Box>
      <DataGrid
        rows={songs}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[10]}
        rowCount={totalRows}
        paginationMode="server"
        disableColumnMenu
        slots={{
          container: 'div',
        }}
        slotProps={{
          container: {
            style: { 
              height: 'fit-content',
              minHeight: '400px'
            }
          }
        }}
      />
    </Box>
  );
};

export default SongTable;