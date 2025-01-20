import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js';

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

export async function firstAnimation() {
    const renderer = new THREE.WebGLRenderer();

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(7.5, 5, 10);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./model/draco/");
  
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    
    for (let i = 0; i < models.length; i++) {
        loader.load(models[i].path, function (gltf) {
            models[i].model = gltf.scene;
            models[i].model!.scale.set(1, 1, 1);
            models[i].model!.position.y = -2;
            if (i == 0) {
                models[i].model!.position.x = 0;
            } else {
                models[i].model!.position.x = 100;
            }
            scene.add(models[i].model!);
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        if (models && models[index].model) {
            models[index].model!.rotation.y += 0.005;
        }

        renderer.render(scene, camera);
    }

    animate();

    function resizeRenderer() {
        const container = document.querySelector("#language-3dmodel") as HTMLElement;
        if (container) {
            const { clientWidth, clientHeight } = container;
            renderer.setSize(clientWidth, clientHeight);
            renderer.setClearColor(0x000000, 0);

            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();

            if (!container.contains(renderer.domElement)) {
                container.appendChild(renderer.domElement);
            }
        }
    }

    const containerObserver = setInterval(() => {
        const container = document.querySelector("#language-3dmodel");
        if (container) {
            clearInterval(containerObserver);
            resizeRenderer(); 
        }
    }, 100); 

    window.addEventListener("resize", resizeRenderer);
}

export function changeTechModel(i: number) {
    index = i;
    if (i >= 1) {
        models[index - 1].model!.position.x = 100;
    } else {
        models[models.length - 1].model!.position.x = 100;
    }
    models[index].model!.position.x = 0;
}
