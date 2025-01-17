"use client"

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let javascript: THREE.Group<THREE.Object3DEventMap> | undefined;
let react: THREE.Group<THREE.Object3DEventMap> | undefined;
let java: THREE.Group<THREE.Object3DEventMap> | undefined;
let angular: THREE.Group<THREE.Object3DEventMap> | undefined;
let node: THREE.Group<THREE.Object3DEventMap> | undefined;
let reactnative: THREE.Group<THREE.Object3DEventMap> | undefined;
let sql: THREE.Group<THREE.Object3DEventMap> | undefined;

let index = 0;

const models = [
    { model: javascript, path: "./model/javascript.glb" },
    { model: java, path: "./model/java.glb" },
    { model: react, path: "./model/react.glb" },
    { model: angular, path: "./model/angular.glb" },
    { model: node, path: "./model/node.glb" },
    { model: reactnative, path: "./model/reactnative.glb" },
    { model: sql, path: "./model/sql.glb" },
];

export function secondAnimation() {
    const scene = new THREE.Scene();

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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(0.25);
    renderer.domElement.style.imageRendering = 'pixelated';
    renderer.setClearColor(0x000000, 0);
    document.querySelector("#language-3dmodel")!.appendChild(renderer.domElement);

    const loader = new GLTFLoader();

    for (let i = 0; i < models.length; i++) {
        loader.load(models[i].path, function (gltf) {
            models[i].model = gltf.scene;
            models[i].model!.scale.set(0.9, 0.9, 0.9);
            models[i].model!.position.y = -1.75;
            if (i == 0) {
                models[i].model!.position.x = 0;
            } else {
                models[i].model!.position.x = 100;
            }
            scene.add(gltf.scene);
        });
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 12;
    controls.maxDistance = 12;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI / 3;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();

        if (models && models[index].model) {
            models[index].model!.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();
}

export function changeTechModel(i: number) {
    index = i;
    if(i>= 1){
        models[index - 1].model!.position.x = 100;
    } else {
        models[models.length - 1].model!.position.x = 100;
    }
    models[index].model!.position.x = 0;
}