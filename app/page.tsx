"use client"

import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default function Home() {
  const [is3D, setIs3d] = useState(true);

  useEffect(() => {
    if(document.querySelector("#scene3D")){
      const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
  
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 20, -10);
  
    let table;
    let monitor;
  
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
  
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(0.25);
    renderer.domElement.style.imageRendering = 'pixelated';
    document.querySelector("#scene3D")!.appendChild(renderer.domElement);
  
    const loader = new GLTFLoader();
  
    loader.load("./model/table.glb", function (gltf: { scene: any; }) {
      table = gltf.scene;
      table.position.x = 15;
      scene.add(gltf.scene);
    });
  
    loader.load("./model/monitor.glb", function (gltf: { scene: any; }) {
      monitor = gltf.scene;
      monitor.position.x = -4;
      monitor.position.y = 3.5;
      monitor.position.z = -6;
      scene.add(gltf.scene);
    });
  
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 20;
    controls.maxDistance = 30;
    controls.maxPolarAngle = Math.PI / 4;
  
    let startTime: number | null = null;
    let targetPosition = new THREE.Vector3(-1, 8.75, -5.25);
    let initialPosition = camera.position.clone();
    let initialRotation = camera.rotation.clone();
    let targetRotation = new THREE.Euler(-1.56, 1.22, 1.56);
    let duration = 1000;

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
  
      if (startTime) {
        let elapsedTime = (performance.now() - startTime) / duration;
        if (elapsedTime < 1) {
          camera.position.lerpVectors(initialPosition, targetPosition, elapsedTime);
  
          camera.rotation.x = THREE.MathUtils.lerp(initialRotation.x, targetRotation.x, elapsedTime);
          camera.rotation.y = THREE.MathUtils.lerp(initialRotation.y, targetRotation.y, elapsedTime);
          camera.rotation.z = THREE.MathUtils.lerp(initialRotation.z, targetRotation.z, elapsedTime);
        } else {
          camera.position.copy(targetPosition);
          camera.rotation.copy(targetRotation);
        }
      }
  
      renderer.render(scene, camera);
    }
  
    setTimeout(() => {
      startTime = performance.now();
    }, 2000);

    setTimeout(() => {
        setIs3d(false);
    }, 3500);
  
    animate();
    }
  });

  return (
    <>
      {is3D && <div id="scene3D"></div>}
      {!is3D && <div id="scene2D" className="w-screen h-screen bg-black"></div>}
    </>
  );
}
