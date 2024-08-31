import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Point } from '../types';

interface ThreeSceneProps {
  points: Point[];
}

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

function AxisLabels() {
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

function AxisArrows() {
  const { scene } = useThree();
  
  React.useEffect(() => {
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
  }, [scene]);

  return null;
}

function ThreeScene({ points }: ThreeSceneProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 75 }}
      style={{ background: '#1a1a1a' }}
    >
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Points points={points} />
      <gridHelper args={[100, 100, '#444444', '#222222']} />
      <AxisArrows />
      <AxisLabels />
    </Canvas>
  );
}

export default ThreeScene;
