import React from 'react';
import { useGLTF } from '@react-three/drei';
import { Object3D } from 'three';
import '@/types/three-types';

const CarbonModel: React.FC = () => {
  const { scene } = useGLTF('/models/carbon_model.glb') as { scene: Object3D };
  return <primitive object={scene} />;
};

useGLTF.preload('/models/carbon_model.glb');

export default CarbonModel;
