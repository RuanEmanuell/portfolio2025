"use client"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default function secondAnimation() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x24292E);

    let react: THREE.Group<THREE.Object3DEventMap>;

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(7.5, 7.5, 7.5);

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
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
    renderer.setPixelRatio(0.25);
    renderer.domElement.style.imageRendering = 'pixelated';
    document.querySelector("#screen-2")!.appendChild(renderer.domElement);
    document.querySelector("#screen-2")!.insertAdjacentHTML("beforeend", "<h3 class='text-[#367F93] text-4xl font-bold'>React</h3>");

    const loader = new GLTFLoader();

    loader.load("./model/react.glb", function (gltf) {
        react = gltf.scene;
        react.scale.set(1.75, 1.75, 1.75);
        react.position.y = -3;
        scene.add(gltf.scene);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 3;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        if (react) {
            react.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();
}