import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Point, Line, Surface } from '../types';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { MyLine, MyPoint, MyPlane } from './MyComponets';

interface ThreeSceneProps {
  points: Point[];
  lines: Line[];
  surfaces: Surface[];
  focusElement: Point | Line | Surface | null;
  onResetView: () => void;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Points({ points }: { points: Point[] }) {
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

function Lines({ lines }: { lines: Line[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={2} // Number of vertices
              array={new Float32Array([
                line.start.x, line.start.y, line.start.z,
                line.end.x, line.end.y, line.end.z
              ])}
              itemSize={3} // Each vertex has 3 components (x, y, z)
            />
          </bufferGeometry>
          <lineBasicMaterial color="yellow" />
        </line>
      ))}
    </>
  );
}

function Surfaces({ surfaces }: { surfaces: Surface[] }) {
  return (
    <>
      {surfaces.map((surface, index) => (
        <mesh key={index} position={[surface.point.x, surface.point.y, surface.point.z]}>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial color="lightblue" side={THREE.DoubleSide} transparent opacity={0.5} />
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

function CameraController({ controlsRef, focusElement }: { controlsRef: React.RefObject<any>, focusElement: Point | Line | Surface | null }) {
  const { camera, gl } = useThree();
  useFrame(() => controlsRef.current.update());

  useEffect(() => {
    if (focusElement) {
      let focusPoint: Point;
      if ('x' in focusElement) {
        focusPoint = focusElement as Point;
      } else if ('start' in focusElement) {
        const line = focusElement as Line;
        focusPoint = {
          x: (line.start.x + line.end.x) / 2,
          y: (line.start.y + line.end.y) / 2,
          z: (line.start.z + line.end.z) / 2,
        };
      } else {
        focusPoint = (focusElement as Surface).point;
      }
      camera.position.set(focusPoint.x + 5, focusPoint.y + 5, focusPoint.z + 5);
      controlsRef.current.target.set(focusPoint.x, focusPoint.y, focusPoint.z);
    }
  }, [focusElement, camera, controlsRef]);

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />;
}

function ThreeScene({ points, lines, surfaces, focusElement, onResetView }: ThreeSceneProps) {
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
          camera={{ position: [5, 5, 5], fov: 100, near: 0.1, far: 10000 }}
          style={{ background: '#1a1a1a' }}
        >
          <CameraController controlsRef={controlsRef} focusElement={focusElement} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Points points={points} />
          <Lines lines={lines} />
          <Surfaces surfaces={surfaces} />
          {/*<gridHelper visible={showAxes}  args={[2000, 2000, '#444444', '#222222']} />*/}
          {/*<gridHelper visible={showAxes} args={[2000, 2000, '#444444', '#222222']} rotation={[Math.PI / 2, 0, 0]} />*/}
          {/*<gridHelper visible={showAxes} args={[2000, 2000, '#444444', '#222222']} rotation={[0, 0, Math.PI / 2]} />*/}
          <AxisArrows visible={showAxes} />
          <AxisLabels visible={showAxes} />
          {/* {-598.495409; -145.201744; 19.246379}

{-490.6269382036; -881.610935457; 40.2515697023}
{-922.9818606379; -811.6307535138; 27.668782065}
{-910.2241820963; -776.9872241474; -218.0167938667}
{-477.8695255836; -846.967359332; -205.4340388838} */}
<MyLine start={{x:-598.495409, y:-145.201744, z:19.246379}} end={{x:-490.6269382036, y:-881.610935457, z:40.2515697023}} type="segment"/>
<MyLine start={{x:-598.495409, y:-145.201744, z:19.246379}} end={{x:-922.9818606379, y:-811.6307535138, z:27.668782065}} type="segment"/>
<MyLine start={{x:-598.495409, y:-145.201744, z:19.246379}} end={{x:-910.2241820963, y:-776.9872241474, z:-218.0167938667}} type="segment"/>
<MyLine start={{x:-598.495409, y:-145.201744, z:19.246379}} end={{x:-477.8695255836, y:-846.967359332, z:-205.4340388838}} type="segment"/>

<MyLine start={{x:-490.6269382036, y:-881.610935457, z:40.2515697023}} end={{x:-922.9818606379, y:-811.6307535138, z:27.668782065}} type='segment'/>
<MyLine start={{x:-922.9818606379, y:-811.6307535138, z:27.668782065}} end={{x:-910.2241820963, y:-776.9872241474, z:-218.0167938667}} type='segment'/>
<MyLine start={{x:-910.2241820963, y:-776.9872241474, z:-218.0167938667}} end={{x:-477.8695255836, y:-846.967359332, z:-205.4340388838}} type='segment'/>
<MyLine start={{x:-477.8695255836, y:-846.967359332, z:-205.4340388838}} end={{x:-490.6269382036, y:-881.610935457, z:40.2515697023}} type='segment'/>

<MyPoint point={{x:-598.495409, y:-145.201744, z:19.246379}}/>
<MyPoint point={{x:-490.6269382036, y:-881.610935457, z:40.2515697023}}/>
<MyPoint point={{x:-922.9818606379, y:-811.6307535138, z:27.668782065}}/>
<MyPoint point={{x:-910.2241820963, y:-776.9872241474, z:-218.0167938667}}/>
<MyPoint point={{x:-477.8695255836, y:-846.967359332, z:-205.4340388838}}/>

<MyPlane point={new THREE.Vector3(1, 1, 1)} normal={new THREE.Vector3(1, 1, 1)} color="lightblue"/>

        </Canvas>
      </div>
    </ThemeProvider>
  );
}

export default ThreeScene;
