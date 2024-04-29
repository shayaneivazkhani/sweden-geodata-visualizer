import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

import "../styles/pageStyles/Shayan.css";

const ThreeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, cube;

    const height = window.innerHeight - (window.innerHeight/4);
    const width = window.innerWidth - (window.innerWidth/4);

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);

    // Cube setup
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
};


const Shayan = () => {
    
    const body_style = {
        height: "100%",
    };
    const animation_style = {
        marginLeft: "50px",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <div className="shayan_main">
                    <h2>Shayan Page</h2>  
                </div>
                <div style={animation_style}>
                    <ThreeAnimation/>
                </div>
                
                <div className="shayan_main">
                    <h2>Lololo</h2>  
                </div>
            </div>
        </React.Fragment>
    );
};

export default Shayan;
