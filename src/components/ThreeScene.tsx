import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Point, Segment, Surface, SurfaceWithPoints } from '../types';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { PointsComponent, SegmentsComponent, SurfacesComponent, SegmentComponent, PointComponent, SurfaceComponent } from './MyComponets';

interface ThreeSceneProps {
  points: Point[];
  segments: Segment[];
  surfaces: (Surface | SurfaceWithPoints)[];
  focusElement: Point | Segment | Surface | SurfaceWithPoints | null;
  onResetView: () => void;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function AxisLabels({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <>
      <Text position={[5.5, 0, 0]} fontSize={0.5} color="red">
        X
      </Text>
      <Text position={[0, 5.5, 0]} fontSize={0.5} color="green">
        Y
      </Text>
      <Text position={[0, 0, 5.5]} fontSize={0.5} color="blue">
        Z
      </Text>
      <Text position={[0.3, 0.3, 0.3]} fontSize={0.5} color="white">
        O
      </Text>
    </>
  );
}

function AxisArrows({ visible }: { visible: boolean }) {
  const { scene } = useThree();
  
  useEffect(() => {
    if (!visible) return;

    const xArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(0, 0, 0),
      5,
      0xff0000
    );
    const yArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 0),
      5,
      0x00ff00
    );
    const zArrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      5,
      0x0000ff
    );

    scene.add(xArrow);
    scene.add(yArrow);
    scene.add(zArrow);

    return () => {
      scene.remove(xArrow);
      scene.remove(yArrow);
      scene.remove(zArrow);
    };
  }, [scene, visible]);

  return null;
}

function CameraController({ controlsRef, focusElement }: { controlsRef: React.RefObject<any>, focusElement: Point | Segment | Surface | null }) {
  const { camera, gl } = useThree();
  useFrame(() => controlsRef.current.update());

  useEffect(() => {
    if (focusElement) {
      let focusPoint: Point;
      if ('x' in focusElement) {
        focusPoint = focusElement as Point;
      } else if ('start' in focusElement) {
        const segment = focusElement as Segment;
        focusPoint = {
          x: (segment.start.x + segment.end.x) / 2,
          y: (segment.start.y + segment.end.y) / 2,
          z: (segment.start.z + segment.end.z) / 2
        };
      } else if ('point' in focusElement && 'normal' in focusElement) {
        focusPoint = (focusElement as Surface).point;
      } else {
        focusPoint = (focusElement as SurfaceWithPoints).points[0];
      }
      camera.position.set(focusPoint.x + 5, focusPoint.y + 5, focusPoint.z + 5);
      controlsRef.current.target.set(focusPoint.x, focusPoint.y, focusPoint.z);
    }
  }, [focusElement, camera, controlsRef]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

function ThreeScene({ points, segments, surfaces, focusElement, onResetView }: ThreeSceneProps) {
  const [showAxes, setShowAxes] = useState(true);
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      onResetView();  // 调用父组件的重置函数
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          display: 'flex',
          gap: '10px'
        }}>
          <Button
            variant="outlined"
            size="small"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowAxes(!showAxes)}
          >
            {showAxes ? '隐藏坐标轴' : '显示坐标轴'}
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={resetView}
          >
            重置视图
          </Button>
        </div>
        <Canvas
          camera={{ position: [5, 5, 5], fov: 100, near: 0.1, far: 1000 }}
          style={{ background: '#1a1a1a' }}
        >
          <CameraController controlsRef={controlsRef} focusElement={focusElement} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <PointsComponent points={points} />
          <SegmentsComponent segments={segments} />
          <SurfacesComponent surfaces={surfaces} />
          {/*<gridHelper visible={showAxes}  args={[2000, 2000, '#444444', '#222222']} />*/}
          {/*<gridHelper visible={showAxes} args={[2000, 2000, '#444444', '#222222']} rotation={[Math.PI / 2, 0, 0]} />*/}
          {/*<gridHelper visible={showAxes} args={[2000, 2000, '#444444', '#222222']} rotation={[0, 0, Math.PI / 2]} />*/}
          <AxisArrows visible={showAxes} />
          <AxisLabels visible={showAxes} />
        </Canvas>
      </div>
    </ThemeProvider>
  );
}

export default ThreeScene;
