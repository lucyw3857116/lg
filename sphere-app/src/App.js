import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Spheres from "./Sphere";
import CameraController from "./CameraController";

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0); // Track custom scroll
  const [center, setCenter] = useState(null); // Track clicked sphere's position

  // Handle scroll (wheel event)
  const handleScroll = (e) => {
    const scrollSpeed = 2; // Adjust scroll speed

    // Reset center on scroll
    setCenter(null);

    // Update scroll position
    setScrollPosition((prev) =>
      Math.min(60, Math.max(0, prev + e.deltaY * 0.01 * scrollSpeed))
    );
  };

  useEffect(() => {
    // Attach wheel listener to the document
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ height: "100vh" }}
      >
        {/* Background color */}
        <color attach="background" args={["black"]} />

        {/* Lighting */}
        <ambientLight intensity={0.75} />
        <directionalLight
          position={[-5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {/* Spheres */}
        <Spheres scrollPosition={scrollPosition} setCenter={setCenter} />

        {/* Camera Controller */}
        <CameraController center={center} scrollPosition={scrollPosition} />
      </Canvas>
    </div>
  );
};

export default App;
