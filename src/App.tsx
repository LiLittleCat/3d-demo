import React, { useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import PointInput from './components/PointInput';
import LineInput from './components/LineInput';
import SurfaceInput from './components/SurfaceInput';
import PointList from './components/PointList';
import LineList from './components/LineList';
import SurfaceList from './components/SurfaceList';
import ThreeScene from './components/ThreeScene';
import { Point, Line, Surface } from './types';
import './App.css';

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [surfaces, setSurfaces] = useState<Surface[]>([]);
  const [focusElement, setFocusElement] = useState<Point | Line | Surface | null>(null);

  const addPoint = (point: Point) => {
    setPoints([...points, point]);
  };

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, updatedPoint: Point) => {
    setPoints(points.map((p, i) => i === index ? updatedPoint : p));
  };

  const addLine = (line: Line) => {
    setLines([...lines, line]);
  };

  const deleteLine = (index: number) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const addSurface = (surface: Surface) => {
    setSurfaces([...surfaces, surface]);
  };

  const deleteSurface = (index: number) => {
    setSurfaces(surfaces.filter((_, i) => i !== index));
  };

  const handleFocusElement = (element: Point | Line | Surface) => {
    setFocusElement(null);
    setTimeout(() => setFocusElement(element), 0);
  };

  const handleResetView = () => {
    setFocusElement(null);
  };

  return (
    <Container maxWidth={false} disableGutters className="app-container">
      <Typography variant="h4" component="h1" className="app-title">
        3D 点、线、面可视化工具
      </Typography>
      <Grid container spacing={2} className="main-content">
        <Grid item xs={12} md={4} className="left-panel">
          <Paper elevation={3} className="input-section">
            <Typography variant="h6" gutterBottom>
              添加新点
            </Typography>
            <PointInput onAddPoint={addPoint} />
          </Paper>
          <Paper elevation={3} className="list-section">
            <Typography variant="h6" gutterBottom>
              点列表
            </Typography>
            <PointList
              points={points}
              onDeletePoint={deletePoint}
              onUpdatePoint={updatePoint}
              onFocusPoint={handleFocusElement}
            />
          </Paper>
          <Paper elevation={3} className="input-section">
            <Typography variant="h6" gutterBottom>
              添加新线
            </Typography>
            <LineInput onAddLine={addLine} points={points} />
          </Paper>
          <Paper elevation={3} className="list-section">
            <Typography variant="h6" gutterBottom>
              线列表
            </Typography>
            <LineList
              lines={lines}
              onDeleteLine={deleteLine}
              onFocusLine={handleFocusElement}
            />
          </Paper>
          <Paper elevation={3} className="input-section">
            <Typography variant="h6" gutterBottom>
              添加新面
            </Typography>
            <SurfaceInput onAddSurface={addSurface} />
          </Paper>
          <Paper elevation={3} className="list-section">
            <Typography variant="h6" gutterBottom>
              面列表
            </Typography>
            <SurfaceList
              surfaces={surfaces}
              onDeleteSurface={deleteSurface}
              onFocusSurface={handleFocusElement}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} className="right-panel">
          <Paper elevation={3} className="scene-container">
            <ThreeScene 
              points={points} 
              lines={lines}
              surfaces={surfaces}
              focusElement={focusElement} 
              onResetView={handleResetView}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
