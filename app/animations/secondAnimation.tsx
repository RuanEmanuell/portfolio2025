import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/Addons.js';

let me: THREE.Group<THREE.Object3DEventMap> | undefined;
let react: THREE.Group<THREE.Object3DEventMap> | undefined;
let java: THREE.Group<THREE.Object3DEventMap> | undefined;
let angular: THREE.Group<THREE.Object3DEventMap> | undefined;
let node: THREE.Group<THREE.Object3DEventMap> | undefined;

let mixer: THREE.AnimationMixer | undefined;

export async function secondAnimation() {
    const renderer = new THREE.WebGLRenderer();
    const clock = new THREE.Clock();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 15);
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
    
    loader.load('./model/react.glb', function (gltf) {
        react = gltf.scene;
        react.scale.set(0.4, 0.4, 0.4);
        scene.add(react);
    });

    loader.load('./model/node.glb', function (gltf) {
        node = gltf.scene;
        node.position.y = 1;
        node.scale.set(0.4, 0.4, 0.4);
        scene.add(node);
    });

    loader.load('./model/angular.glb', function (gltf) {
        angular = gltf.scene;
        angular.position.y = -2;
        angular.position.z = -2;
        angular.scale.set(0.4, 0.4, 0.4);
        scene.add(angular);
    });

    loader.load('./model/java.glb', function (gltf) {
        java = gltf.scene;
        java.position.y = -3;
        java.scale.set(0.4, 0.4, 0.4);
        scene.add(java);
    });

    loader.load('./model/me.glb', function (gltf) {
        me = gltf.scene;
        me.scale.set(1.4, 1.4, 1.4);
        me.position.y = -8;
        scene.add(me);

        mixer = new THREE.AnimationMixer(me);
        if (gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                const action = mixer!.clipAction(clip);
                action.play();
            });
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        
        const canvasWidth = renderer.domElement.width;

        if (react) {
            react!.position.x += 0.015;
            if (react.position.x > canvasWidth / 25.0) {
                react!.position.x = -(canvasWidth / 25.0);
            }
        }

        if (java) {
            java!.position.x += 0.016;
            if (java.position.x > canvasWidth / 25.0) {
                java!.position.x = -(canvasWidth / 25.0);
            }
        }

        if (angular) {
            angular!.position.x -= 0.017;
            if (angular.position.x < -(canvasWidth / 25.0)) {
                angular!.position.x = canvasWidth / 25.0;
            }
        }

        if (node) {
            node!.position.x -= 0.018;
            if (node.position.x < -(canvasWidth / 25.0)) {
                node!.position.x = canvasWidth / 25.0;
            }
        }

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", function () {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio / 4);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio / 4);
    renderer.domElement.style.imageRendering = 'pixelated';
    renderer.setClearColor(0x000000, 0);
    if (document.querySelector("#me-3dmodel")) {
        document.querySelector("#me-3dmodel")!.appendChild(renderer.domElement);
    }
}
