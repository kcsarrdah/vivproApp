import React from 'react';
import { Box, Paper } from '@mui/material';
import SongTable from '../table/songTable';
import DanceabilityChart from '../charts/danceabilityScatterChart';
import DurationHistogram from '../charts/durationHistogram';
import AcousticsTempoCharts from '../charts/acousticsTempoCharts';

const DesktopView = ({ 
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
  return (
    <Box 
    data-testid="desktop-view" 
    sx={{ 
      display: 'flex', 
      flex: 1,
      gap: 2,
      p: 2,
    }}>
      {/* Left side - Table */}
      <Paper sx={{ flex: 2, p: 2 }}>
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

      {/* Right side - Charts */}
      <Paper sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'auto' }}>
        <DanceabilityChart data={songs} />
        <DurationHistogram data={songs} />
        <AcousticsTempoCharts data={songs} />
      </Paper>
    </Box>
  );
};

export default DesktopView;