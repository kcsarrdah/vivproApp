import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import SongTable from '../table/songTable';
import DanceabilityChart from '../charts/danceabilityScatterChart';
import DurationHistogram from '../charts/durationHistogram';
import { getSongs } from '../../services/api';
import AcousticsTempoCharts from '../charts/acousticsTempoCharts';

const DesktopView = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sortDirection, setSortDirection] = useState('default');

  const fetchData = async (page, pageSize) => {
    try {
      setLoading(true);
      const top = page * pageSize;
      const data = await getSongs(top, pageSize);
      let sortedSongs = [...data.items];

      // Apply sorting based on direction
      switch (sortDirection) {
        case 'asc':
          sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'desc':
          sortedSongs.sort((a, b) => b.title.localeCompare(a.title));
          break;
        default:
          sortedSongs = data.items;
      }

      setSongs(sortedSongs);
      setTotalRows(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, sortDirection]);

  return (
    <Box sx={{ 
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