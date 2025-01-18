import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Header from './header';
import DesktopView from './desktopView';
import MobileView from './mobileView';
import { getSongs } from '../../services/api';

const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const sharedProps = {
    songs,
    setSongs,
    loading,
    error,
    paginationModel,
    setPaginationModel,
    totalRows,
    sortDirection,
    setSortDirection
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {isMobile ? <MobileView {...sharedProps} /> : <DesktopView {...sharedProps} />}
    </Box>
  );
};

export default Layout;