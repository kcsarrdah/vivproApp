import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './components/layout/layout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout />

    </ThemeProvider>
  );
}

export default App;