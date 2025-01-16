"use client"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default function firstAnimation() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(40, 20, -10);

    let table;
    let monitor;
    let chair;
    let pc;

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
    document.querySelector("#screen-0")!.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    loader.load("./model/table.glb", function (gltf) {
        table = gltf.scene;
        table.position.x = 15;
        scene.add(gltf.scene);
    });

    loader.load("./model/monitor.glb", function (gltf) {
        monitor = gltf.scene;
        monitor.position.x = 11.5;
        monitor.position.y = 4.25;
        monitor.position.z = -6;
        scene.add(gltf.scene);
    });

    loader.load("./model/chair.glb", function (gltf) {
        chair = gltf.scene;
        chair.rotation.y = -1.6;
        chair.position.x = 16;
        chair.position.z = -7;
        scene.add(gltf.scene);
    });

    loader.load("./model/pc.glb", function (gltf) {
        pc = gltf.scene;
        pc.position.y = 4.25;
        pc.position.x = 12.5;
        scene.add(gltf.scene);
    });

    const controls = new OrbitControls(camera, renderer.domElement);

    let startTime: number | null = null;
    const targetPosition = new THREE.Vector3(12, 8.75, -5.25);
    const initialPosition = camera.position.clone();
    const initialRotation = camera.rotation.clone();
    const targetRotation = new THREE.Euler(-1.56, 1.22, 1.56);
    const duration = 1000;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();


        if (startTime) {
            const elapsedTime = (performance.now() - startTime) / duration;
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

    animate();
}