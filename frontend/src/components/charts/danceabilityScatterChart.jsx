import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Paper, Typography } from '@mui/material';

const DanceabilityChart = ({ data }) => {
  // Transform data for the scatter plot
  const scatterData = data.map((song, index) => ({
    x: index,  // Using index for x-axis spread
    danceability: song.danceability,
    name: song.title
  }));

  return (
    <Paper sx={{ p: 2, height: 300, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        Danceability Distribution
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Index" 
            hide  // Hide the x-axis since we're just using it for spread
          />
          <YAxis 
            type="number" 
            dataKey="danceability" 
            name="Danceability" 
            domain={[0, 1]}
            label={{ value: 'Danceability', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            content={({ payload }) => {
              if (payload && payload.length) {
                const song = payload[0].payload;
                return (
                  <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
                    <Typography variant="body2">{song.name}</Typography>
                    <Typography variant="body2">
                      Danceability: {song.danceability.toFixed(2)}
                    </Typography>
                  </Paper>
                );
              }
              return null;
            }}
          />
          <Scatter 
            data={scatterData} 
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default DanceabilityChart;