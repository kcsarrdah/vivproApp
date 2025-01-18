import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';
import SongTable from '../table/songTable';
import DanceabilityChart from '../charts/danceabilityScatterChart';
import DurationHistogram from '../charts/durationHistogram';
import AcousticsTempoCharts from '../charts/acousticsTempoCharts';

const MobileView = ({ 
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
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
    data-testid="mobile-view" 
    sx={{ flex: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Songs" />
        <Tab label="Charts" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {value === 0 && (
          <Paper sx={{ p: 2 }}>
            <SongTable 
              songs={songs}
              setSongs={setSongs}
              loading={loading}
              error={error}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              totalRows={totalRows}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          </Paper>
        )}
        {value === 1 && (
          <Paper 
            sx={{ 
              p: 2,
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
              maxHeight: 'calc(100vh - 150px)',  // Adjust based on your needs
              overflowY: 'auto'
            }}
          >
            <DanceabilityChart data={songs} />
            <DurationHistogram data={songs} />
            <AcousticsTempoCharts data={songs} />
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MobileView;