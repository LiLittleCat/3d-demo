import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Segment } from "../types";

interface SegmentInputProps {
  onAddSegment: (segment: Segment) => void;
}

function SegmentInput({ onAddSegment }: SegmentInputProps) {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [sx, sy, sz] = startPoint.split(/[,; ，]+/).map(parseFloat);
    const [ex, ey, ez] = endPoint.split(/[,; ，]+/).map(parseFloat);
    if (
      !isNaN(sx) &&
      !isNaN(sy) &&
      !isNaN(sz) &&
      !isNaN(ex) &&
      !isNaN(ey) &&
      !isNaN(ez)
    ) {
      onAddSegment({
        start: { x: sx, y: sy, z: sz },
        end: { x: ex, y: ey, z: ez },
      });
      setStartPoint("");
      setEndPoint("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="line-input-form">
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
        添加线段
      </Button>
    </Box>
  );
}

export default SegmentInput;
