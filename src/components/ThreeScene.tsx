import React, { useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Point } from '../types';
import { Button, ThemeProvider, createTheme } from '@mui/material';

interface ThreeSceneProps {
  points: Point[];
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Points({ points }: ThreeSceneProps) {
  return (
    <>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      ))}
    </>
  );
}

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
  
  React.useEffect(() => {
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

function CameraController({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const { camera, gl } = useThree();
  useFrame(() => controlsRef.current.update());
  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

function ThreeScene({ points }: ThreeSceneProps) {
  const [showAxes, setShowAxes] = useState(true);
  const controlsRef = useRef<any>(null);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
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
          camera={{ position: [5, 5, 5], fov: 75 }}
          style={{ background: '#1a1a1a' }}
        >
          <CameraController controlsRef={controlsRef} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Points points={points} />
          <gridHelper args={[100, 100, '#444444', '#222222']} />
          <AxisArrows visible={showAxes} />
          <AxisLabels visible={showAxes} />
        </Canvas>
      </div>
    </ThemeProvider>
  );
}

export default ThreeScene;
