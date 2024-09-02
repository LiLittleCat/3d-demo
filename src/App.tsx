import { useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import PointInput from "./components/PointInput";
import SegmentInput from "./components/SegmentInput.tsx";
import SurfaceInput from "./components/SurfaceInput";
import PointList from "./components/PointList";
import SegmentList from "./components/SegmentList.tsx";
import SurfaceList from "./components/SurfaceList";
import ThreeScene from "./components/ThreeScene";
import { Point, Segment, Surface, SurfaceWithPoints } from "./types";
import "./App.css";

function App() {
  // const [points, setPoints] = useState<Point[]>([]);
  // const [segments, setSegments] = useState<Segment[]>([]);
  // const [surfaces, setSurfaces] = useState<Surface[]>([]);

  {
    /* {-598.495409; -145.201744; 19.246379}

{-490.6269382036; -881.610935457; 40.2515697023}
{-922.9818606379; -811.6307535138; 27.668782065}
{-910.2241820963; -776.9872241474; -218.0167938667}
{-477.8695255836; -846.967359332; -205.4340388838} */
  }

  const [points, setPoints] = useState<Point[]>([
    { x: -598.495409, y: -145.201744, z: 19.246379 },
    { x: -490.6269382036, y: -881.610935457, z: 40.2515697023 },
    { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
    { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
    { x: -477.8695255836, y: -846.967359332, z: -205.4340388838 },
  ]);
  const [segments, setSegments] = useState<Segment[]>([
    {
      start: { x: -598.495409, y: -145.201744, z: 19.246379 },
      end: { x: -490.6269382036, y: -881.610935457, z: 40.2515697023 },
    },
    {
      start: { x: -598.495409, y: -145.201744, z: 19.246379 },
      end: { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
    },
    {
      start: { x: -598.495409, y: -145.201744, z: 19.246379 },
      end: { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
    },
    {
      start: { x: -598.495409, y: -145.201744, z: 19.246379 },
      end: { x: -477.8695255836, y: -846.967359332, z: -205.4340388838 },
    },
    {
      start: { x: -490.6269382036, y: -881.610935457, z: 40.2515697023 },
      end: { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
    },
    {
      start: { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
      end: { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
    },
    {
      start: { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
      end: { x: -477.8695255836, y: -846.967359332, z: -205.4340388838 },
    },
    {
      start: { x: -477.8695255836, y: -846.967359332, z: -205.4340388838 },
      end: { x: -490.6269382036, y: -881.610935457, z: 40.2515697023 },
    },
  ]);
  const [surfaces, setSurfaces] = useState<(Surface | SurfaceWithPoints)[]>([
    {
      point: { x: -598.495409, y: -145.201744, z: 19.246379 },
      normal: { x: 1, y: 1, z: 1 },
      color: "lightblue",
      width: 100,
      height: 100,
    },
    {
      points: [
        { x: -490.6269382036, y: -881.610935457, z: 40.2515697023 },
        { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
        { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
      ],
      color: "lightblue",
    },
    {
      points: [
        { x: -477.8695255836, y: -846.967359332, z: -205.4340388838 },
        { x: -910.2241820963, y: -776.9872241474, z: -218.0167938667 },
        { x: -922.9818606379, y: -811.6307535138, z: 27.668782065 },
      ],
      color: "lightblue",
    },
  ]);

  const [focusElement, setFocusElement] = useState<
    Point | Segment | Surface | SurfaceWithPoints | null
  >(null);

  const addPoint = (point: Point) => {
    setPoints([...points, point]);
  };

  const deletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
  };

  const updatePoint = (index: number, updatedPoint: Point) => {
    setPoints(points.map((p, i) => (i === index ? updatedPoint : p)));
  };

  const addSegment = (segment: Segment) => {
    setSegments([...segments, segment]);
  };

  const deleteSegment = (index: number) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  const addSurface = (surface: Surface) => {
    setSurfaces([...surfaces, surface]);
  };

  const deleteSurface = (index: number) => {
    setSurfaces(surfaces.filter((_, i) => i !== index));
  };

  const handleFocusElement = (
    element: Point | Segment | Surface | SurfaceWithPoints,
  ) => {
    setFocusElement(null);
    setTimeout(() => setFocusElement(element), 0);
  };

  const handleResetView = () => {
    setFocusElement(null);
  };

  return (
    <Container maxWidth={false} disableGutters className="app-container">
      <Typography variant="h4" component="h1" className="app-title">
        3D 可视化工具
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
              添加新线段
            </Typography>
            <SegmentInput onAddSegment={addSegment} />
          </Paper>
          <Paper elevation={3} className="list-section">
            <Typography variant="h6" gutterBottom>
              线段列表
            </Typography>
            <SegmentList
              segments={segments}
              onDeleteSegment={deleteSegment}
              onFocusSegment={handleFocusElement}
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
              segments={segments}
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
