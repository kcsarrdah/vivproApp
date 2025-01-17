import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';

const MobileView = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flex: 1 }}>
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
            <Typography variant="h6">Songs Table</Typography>
            {/* Table component will go here */}
          </Paper>
        )}
        {value === 1 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Visualizations</Typography>
            {/* Charts will go here */}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default MobileView;