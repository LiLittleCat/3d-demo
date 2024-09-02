import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { Point, Segment, Surface, SurfaceWithPoints } from '../types';

import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { calculateNormal } from './util';

// Point Component
function PointComponent( {point}:{point:Point} ) {
  const color = point.color || "hotpink";
  return (
    <mesh position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// Segment Component
function SegmentComponent({segment}:{segment:Segment}) {
  const color = segment.color || "green";
  const start = new THREE.Vector3(segment.start.x, segment.start.y, segment.start.z);
  const end = new THREE.Vector3(segment.end.x, segment.end.y, segment.end.z);
    return (
      <Line
        points={[start, end]}
        color={color}
        lineWidth={1}
        dashed={false}
      />
    );
  }


  // Surface Component
    function SurfaceComponent({surface}:{surface:Surface | SurfaceWithPoints}) {
      let point: THREE.Vector3;
    let normal: THREE.Vector3;
    let color: string;
    let width: number;
    let height: number;

    if ('point' in surface && 'normal' in surface) {
      // 原有的输入方式
      point = new THREE.Vector3(surface.point.x, surface.point.y, surface.point.z);
      normal = new THREE.Vector3(surface.normal.x, surface.normal.y, surface.normal.z);
      color = surface.color || Math.floor(Math.random()*16777215).toString(16);
      width = surface.width || 10;
      height = surface.height || 10;
    } else {
      // 新的输入方式：三个点确定面，可能带有颜色
      const [p1, p2, p3] = surface.points;
      point = new THREE.Vector3(p1.x, p1.y, p1.z);
      const calculatedNormal = calculateNormal(p1, p2, p3);
      normal = new THREE.Vector3(calculatedNormal.x, calculatedNormal.y, calculatedNormal.z);
      color = surface.color || Math.floor(Math.random()*16777215).toString(16);
      width = surface.width || 10;
      height = surface.height || 10;
    }

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.normalize());

    return (
      <>
        <mesh quaternion={quaternion} position={point}>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
        <ArrowsComponent 
          visible={true}
          dir={normal}
          origin={point}
          length={5}
          color={color}
        />
      </>
    );
  }

  // Points Component
  function PointsComponent({points}:{points:Point[]}) {
    return (
      <group>
        {points.map((point, index) => (
          <PointComponent key={index} point={point} />
        ))}
      </group>
    );
  }

  // Segments Component
  // Segments Component
  function SegmentsComponent({segments = []}:{segments?:Segment[]}) {
    return (
      <group>
        {segments.map((segment, index) => (
          <SegmentComponent key={index} segment={segment} />
        ))}
      </group>
    );
  }

  // Surfaces Component
  function SurfacesComponent({surfaces}:{surfaces:Surface[]}) {
    return (
      <group>
        {surfaces.map((surface, index) => (
          <SurfaceComponent key={index} surface={surface} />
        ))}
      </group>
    );
  }
  
  /**
   * Arrow Component
   * @param visible 
   * @param dir 
   * @param origin 
   * @param length 
   * @param color 
   * @returns 
   */
  function ArrowsComponent({ visible, dir, origin, length, color }: { visible: boolean, dir:Point, origin:Point, length:number, color:string }) {
    const { scene } = useThree();
    
    useEffect(() => {
      if (!visible) return;
  
      const xArrow = new THREE.ArrowHelper(
        new THREE.Vector3(dir.x, dir.y, dir.z),
        new THREE.Vector3(origin.x, origin.y, origin.z),
        length,
        color
      );
  
      scene.add(xArrow);
  
      return () => {
        scene.remove(xArrow);
      };
    }, [scene, visible, dir.x, dir.y, dir.z, origin.x, origin.y, origin.z, length, color]);
  
    return null;
  }
  

  export { PointsComponent, SegmentsComponent, SurfacesComponent, PointComponent, SegmentComponent, SurfaceComponent, ArrowsComponent};