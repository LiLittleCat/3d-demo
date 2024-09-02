import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Surface } from "../types";

interface SurfaceInputProps {
  onAddSurface: (surface: Surface) => void;
}

function SurfaceInput({ onAddSurface }: SurfaceInputProps) {
  const [point, setPoint] = useState<string>("");
  const [normal, setNormal] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [px, py, pz] = point.split(/[,; ，]+/).map(parseFloat);
    const [nx, ny, nz] = normal.split(/[,; ，]+/).map(parseFloat);
    if (
      !isNaN(px) &&
      !isNaN(py) &&
      !isNaN(pz) &&
      !isNaN(nx) &&
      !isNaN(ny) &&
      !isNaN(nz)
    ) {
      onAddSurface({
        point: { x: px, y: py, z: pz },
        normal: { x: nx, y: ny, z: nz },
      });
      setPoint("");
      setNormal("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="surface-input-form"
    >
      <TextField
        className="surface-input-field"
        label="平面上的点 X, Y, Z (逗号, 分号或空格区分)"
        value={point}
        onChange={(e) => setPoint(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        className="surface-input-field"
        label="法向量 X, Y, Z (逗号, 分号或空格区分)"
        value={normal}
        onChange={(e) => setNormal(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        className="add-surface-button"
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
      >
        添加面
      </Button>
    </Box>
  );
}

export default SurfaceInput;
