import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Line, Point } from '../types';

interface LineInputProps {
  onAddLine: (line: Line) => void;
  points: Point[];
}

function LineInput({ onAddLine, points }: LineInputProps) {
  const [lineType, setLineType] = useState<'segment' | 'ray' | 'line'>('segment');
  const [startPoint, setStartPoint] = useState<string>('');
  const [endPoint, setEndPoint] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [sx, sy, sz] = startPoint.split(/[,; ]+/).map(parseFloat);
    const [ex, ey, ez] = endPoint.split(/[,; ]+/).map(parseFloat);
    if (!isNaN(sx) && !isNaN(sy) && !isNaN(sz) && !isNaN(ex) && !isNaN(ey) && !isNaN(ez)) {
      onAddLine({
        type: lineType,
        start: { x: sx, y: sy, z: sz },
        end: { x: ex, y: ey, z: ez },
      });
      setStartPoint('');
      setEndPoint('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="line-input-form">
      <FormControl fullWidth margin="normal">
        <InputLabel>线类型</InputLabel>
        <Select
          label="线类型1"
          value={lineType}
          onChange={(e) => setLineType(e.target.value as 'segment' | 'ray' | 'line')}
        >
          <MenuItem value="segment">线段</MenuItem>
          <MenuItem value="ray">射线</MenuItem>
          <MenuItem value="line">直线</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className="line-input-field"
        label="起点 X, Y, Z (逗号, 分号或空格区分)"
        value={startPoint}
        onChange={(e) => setStartPoint(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        className="line-input-field"
        label="终点 X, Y, Z (逗号, 分号或空格区分)"
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        className="add-line-button"
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        添加线
      </Button>
    </Box>
  );
}

export default LineInput;