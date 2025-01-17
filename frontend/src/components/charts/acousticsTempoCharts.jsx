import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const AcousticsTempoCharts = ({ data }) => {
  // Prepare data for acoustics (sorting by acousticness value)
  const acousticsData = [...data].sort((a, b) => b.acousticness - a.acousticness);

  // Prepare data for tempo (sorting by tempo value)
  const tempoData = [...data].sort((a, b) => b.tempo - a.tempo);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Acoustics Chart */}
      <Paper sx={{ p: 2, height: 300, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Acousticness Values
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={acousticsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="title"
              tick={false} // Hide individual labels for cleaner look
              label={{ value: 'Songs', position: 'bottom' }}
            />
            <YAxis
              domain={[0, 1]}
              label={{ 
                value: 'Acousticness', 
                angle: -90, 
                position: 'insideLeft'
              }}
            />
            <Tooltip 
              content={({ payload, label }) => {
                if (payload && payload.length) {
                  return (
                    <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
                      <Typography variant="body2">
                        Song: {payload[0].payload.title}
                      </Typography>
                      <Typography variant="body2">
                        Acousticness: {payload[0].value.toFixed(3)}
                      </Typography>
                    </Paper>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="acousticness" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Tempo Chart */}
      <Paper sx={{ p: 2, height: 300, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Tempo Distribution
        </Typography>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={tempoData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="title"
              tick={false}
              label={{ value: 'Songs', position: 'bottom' }}
            />
            <YAxis
              label={{ 
                value: 'Tempo (BPM)', 
                angle: -90, 
                position: 'insideLeft'
              }}
            />
            <Tooltip 
              content={({ payload, label }) => {
                if (payload && payload.length) {
                  return (
                    <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
                      <Typography variant="body2">
                        Song: {payload[0].payload.title}
                      </Typography>
                      <Typography variant="body2">
                        Tempo: {payload[0].value.toFixed(1)} BPM
                      </Typography>
                    </Paper>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="tempo" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AcousticsTempoCharts;