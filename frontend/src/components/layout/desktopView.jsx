import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const DesktopView = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flex: 1,
      gap: 2,
      p: 2,
    }}>
      {/* Left side - Table */}
      <Paper sx={{ flex: 2, p: 2 }}>
        <Typography variant="h6">Songs Table</Typography>
        {/* Table component will go here */}
      </Paper>

      {/* Right side - Charts */}
      <Paper sx={{ flex: 1, p: 2 }}>
        <Typography variant="h6">Visualizations</Typography>
        {/* Charts will go here */}
      </Paper>
    </Box>
  );
};

export default DesktopView;