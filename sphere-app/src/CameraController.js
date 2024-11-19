import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CameraController = ({ center, scrollPosition }) => {
  useFrame(({ camera }) => {
    if (center) {
      // Smoothly move the camera to the clicked sphere
      camera.position.lerp(new THREE.Vector3(center[0], center[1], center[2] + 5), 0.1);
      camera.lookAt(new THREE.Vector3(...center));
    } else {
      // Reset camera to follow diagonal line
      camera.position.z = 5 - scrollPosition;
      camera.lookAt(new THREE.Vector3(scrollPosition * 0.1, 0, -scrollPosition));
    }
  });

  return null;
};

export default CameraController;
