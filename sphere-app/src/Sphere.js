import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Spheres = ({ scrollPosition, setCenter }) => {
  const PLANETS = [
    { name: "Mercury", size: 1, position: [-2, 0, -5], color: "gray" },
    { name: "Venus", size: 1, position: [-1.5, 0.5, -10], color: "yellow" },
    { name: "Earth", size: 1, position: [-1, 0.5, -15], color: "blue" },
    { name: "Mars", size: 1, position: [-0.5, 0.25, -20], color: "red" },
    { name: "Jupiter", size: 1, position: [0, -0.5, -30], color: "orange" },
    { name: "Saturn", size: 1, position: [0.5, -1, -40], color: "goldenrod" },
    { name: "Uranus", size: 1, position: [1, -1.5, -50], color: "lightblue" },
    { name: "Neptune", size: 1, position: [1.5, -2, -60], color: "darkblue" },
  ];

  const sphereRefs = useRef([]);
  const [moons, setMoons] = useState(null);

  // Initialize 4 React refs for the moons
  const moonRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  // Rotate spheres and moons
  useFrame(() => {
    // Rotate planets
    sphereRefs.current.forEach((ref) => {
      if (ref) ref.rotation.y += 0.005;
    });

    // Rotate moons around the selected planet
    if (moons?.position) {
      const time = Date.now() * 0.0005; // Slower time multiplier for rotation
      const orbitRadius = 2.5;
      moonRefs.current.forEach((moonRef, index) => {
        if (moonRef.current) {
          const angle = (index * Math.PI) / 2 + time; // Position moons at 90° intervals
          moonRef.current.position.set(
            moons.position[0] + Math.cos(angle) * orbitRadius,
            moons.position[1] + Math.sin(angle) * orbitRadius,
            moons.position[2]
          );
        }
      });
    }
  });

  const handleClick = (planetPosition) => {
    setCenter(planetPosition);
    setMoons({
      position: planetPosition,
    });
  };

  return (
    <>
      {/* Planets */}
      {PLANETS.map((planet, index) => (
        <mesh
          key={index}
          position={planet.position}
          castShadow
          onClick={() => handleClick(planet.position)} // Handle click
          ref={(ref) => (sphereRefs.current[index] = ref)} // Attach ref for rotation
        >
          <sphereGeometry args={[planet.size, 128, 128]} />
          <meshPhysicalMaterial
            color={planet.color}
            roughness={0.3}
            metalness={0.7}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      ))}

      {/* Moons */}
      {moons &&
        moonRefs.current.map((moonRef, index) => (
          <mesh key={index} ref={moonRef}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial color="white" roughness={0.6} metalness={0.3} />
            {/* Labels */}
            <Text
              position={[0, 0.3, 0]} // Slightly above the moon
              fontSize={0.15}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {index + 1}
            </Text>
          </mesh>
        ))}
    </>
  );
};

export default Spheres;
