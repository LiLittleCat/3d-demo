import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Color } from '@react-three/drei';
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
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </>
  );
}

function ThreeScene({ points }: ThreeSceneProps) {
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Canvas
        gl={{ alpha: false }} // 禁用 alpha 以确保背景色完全不透明
        camera={{ position: [0, 0, 5] }}
      >
        <color attach="background" args={['#1a1a1a']} /> {/* 设置暗色背景 */}
        <OrbitControls makeDefault />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Points points={points} />
        <gridHelper args={[10, 10, '#444444', '#222222']} /> {/* 调整网格颜色 */}
        <axesHelper args={[5]} /> {/* 可选：调整坐标轴大小 */}
      </Canvas>
    </div>
  );
}

export default ThreeScene;
