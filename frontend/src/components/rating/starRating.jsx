// src/components/rating/starRating.jsx
import React from 'react';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const StarRating = ({ value, onChange }) => {
  return (
    <Rating
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      precision={1}
      max={5}
      emptyIcon={<StarBorderIcon sx={{ color: 'grey.500' }} />}
      icon={<StarIcon sx={{ color: '#ffd700' }} />}  // Gold color for filled stars
    />
  );
};

export default StarRating;