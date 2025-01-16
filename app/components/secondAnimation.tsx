"use client"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export default function secondAnimation() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 18);

    let me;
    let mixer : THREE.AnimationMixer;
    const clock = new THREE.Clock();

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
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    renderer.setPixelRatio(0.75);
    renderer.domElement.style.imageRendering = 'pixelated';
    renderer.domElement.style.margin = 'auto';
    document.querySelector("#animation1")!.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    const controls = new OrbitControls(camera, renderer.domElement);

    loader.load("./model/me.glb", function (gltf) {
        me = gltf.scene;
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(me);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
        }

        scene.add(gltf.scene);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        const delta = clock.getDelta(); 
        if (mixer) {
            mixer.update(delta); 
        }

        renderer.render(scene, camera);
    }

    animate();
}
