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
import { Paper, Typography } from '@mui/material';

const DurationHistogram = ({ data }) => {
  // Convert duration from milliseconds to seconds and create histogram data
  const prepareDurationData = (songs) => {
    // Convert durations to seconds
    const durationsInSeconds = songs.map(song => Math.floor(song.duration_ms / 1000));
    
    // Create bins for histogram
    const binSize = 30; // 30-second intervals
    const bins = {};
    
    durationsInSeconds.forEach(duration => {
      const binIndex = Math.floor(duration / binSize) * binSize;
      bins[binIndex] = (bins[binIndex] || 0) + 1;
    });

    // Convert bins to array format for Recharts
    return Object.entries(bins).map(([binStart, count]) => ({
      duration: `${binStart}-${parseInt(binStart) + binSize}s`,
      count: count,
      binStart: parseInt(binStart)
    })).sort((a, b) => a.binStart - b.binStart);
  };

  const histogramData = prepareDurationData(data);

  return (
    <Paper sx={{ p: 2, height: 300, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        Song Duration Distribution
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={histogramData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="duration"
            label={{ value: 'Duration (seconds)', position: 'bottom' }}
          />
          <YAxis
            label={{ 
              value: 'Number of Songs', 
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
                      Duration: {label}
                    </Typography>
                    <Typography variant="body2">
                      Songs: {payload[0].value}
                    </Typography>
                  </Paper>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default DurationHistogram;