import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Point } from '../types';

interface PointInputProps {
  onAddPoint: (point: Point) => void;
}

function PointInput({ onAddPoint }: PointInputProps) {
  const [point, setPoint] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoint(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedInput = point.replace(/[^\d.,; \n-]/g, '');
    const pointStrings = sanitizedInput.split('\n');
    pointStrings.forEach(pointString => {
      const [x, y, z] = pointString.split(/[,; ]+/).map(parseFloat);
      onAddPoint({ x, y, z });
    });
    setPoint('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="point-input-form">
      <TextField
        className="point-input-field"
        label="X, Y, Z (逗号, 分号或空格区分)"
        value={point}
        onChange={handleChange}
        variant="outlined"
      />
      <Button 
        className="add-point-button"
        type="submit" 
        variant="contained" 
        color="primary"
        size="large"
      >
        添加点
      </Button>
    </Box>
  );
}

export default PointInput;
