
import { Vector3 } from 'three';
import { Point } from '../types';
import { Line } from '@react-three/drei';
import * as THREE from 'three';


function MyLine({start, end, type}:{start:Point, end:Point, type?:"line" | "ray" | "segment"}) {

    let startPoint = new Vector3(start.x, start.y, start.z);
    let endPoint = new Vector3(end.x, end.y, end.z);

    switch(type){
      case "line":
        startPoint = endPoint.clone().add(startPoint.normalize().multiplyScalar(1000));
        endPoint = startPoint.clone().add(endPoint.normalize().multiplyScalar(1000));
        break;
      case "ray":
        endPoint = startPoint.clone().add(endPoint.normalize().multiplyScalar(1000));
        break;
      case "segment":
        break;
      default:
        throw new Error("Invalid line type");
    }
    return (
      <Line
        points={[startPoint, endPoint]}
        color="green"
        lineWidth={1}
        dashed={false}
      />
    );
  }

  function MyPoint( {point}:{point:Point} ) {
    return (
      <mesh position={[point.x, point.y, point.z]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  }

  function MyPlane({ point, normal, color }: { point: Vector3, normal: Vector3, color: string }) {

    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.normalize());

    return (
      <mesh quaternion={quaternion} position={point}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    );
  }


  export { MyLine, MyPoint, MyPlane };