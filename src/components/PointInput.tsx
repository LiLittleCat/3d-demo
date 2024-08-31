import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Point } from '../types';

interface PointInputProps {
  onAddPoint: (point: Point) => void;
}

function PointInput({ onAddPoint }: PointInputProps) {
  const [point, setPoint] = useState<Point>({ x: 0, y: 0, z: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPoint({ ...point, [name]: parseFloat(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPoint(point);
    setPoint({ x: 0, y: 0, z: 0 });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="point-input-form">
      <TextField
        className="point-input-field"
        name="x"
        label="X"
        type="number"
        value={point.x}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        className="point-input-field"
        name="y"
        label="Y"
        type="number"
        value={point.y}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        className="point-input-field"
        name="z"
        label="Z"
        type="number"
        value={point.z}
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
