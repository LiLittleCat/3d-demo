import React, { useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import PointInput from './components/PointInput';
import PointList from './components/PointList';
import ThreeScene from './components/ThreeScene';
import { Point } from './types';
import './App.css';

function App() {
  const [points, setPoints] = useState<Point[]>([]);

  const addPoint = (point: Point) => {
    setPoints([...points, point]);
  };

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, updatedPoint: Point) => {
    setPoints(points.map((p, i) => i === index ? updatedPoint : p));
  };

  return (
    <Container maxWidth={false} className="app-container">
      <Typography variant="h4" component="h1" className="app-title">
        3D 点坐标可视化
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
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
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="scene-container">
            <ThreeScene points={points} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
