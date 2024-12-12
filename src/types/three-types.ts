
import { Object3D } from 'three';
import { ReactThreeFiber } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    primitive: ReactThreeFiber.Object3DNode<Object3D, typeof Object3D>
  }
}