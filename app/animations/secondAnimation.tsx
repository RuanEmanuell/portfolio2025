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
    camera.position.set(0, 3, 15);
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
        react.position.x = 4;
        react.position.y = -4;
        react.scale.set(0.7, 0.7, 0.7);
        scene.add(react);
    });

    loader.load('./model/node.glb', function (gltf) {
        node = gltf.scene;
        node.position.x = 4;
        node.position.y = 2;
        node.scale.set(0.7, 0.7, 0.7);
        scene.add(node);
    });

    loader.load('./model/angular.glb', function (gltf) {
        angular = gltf.scene;
        angular.position.x = -5;
        angular.position.y = 0;
        angular.position.z = -2;
        angular.scale.set(0.7, 0.7, 0.7);
        scene.add(angular);
    });

    loader.load('./model/java.glb', function (gltf) {
        java = gltf.scene;
        java.position.x = -4;
        java.position.y = -5;
        java.position.z = -2;
        java.scale.set(0.7, 0.7, 0.7);
        scene.add(java);
    });

    loader.load('./model/me.glb', function (gltf) {
        me = gltf.scene;
        me.scale.set(2.5, 2.5, 2.5);
        me.position.y = -14;
        scene.add(me);

        mixer = new THREE.AnimationMixer(me);
        if (gltf.animations.length > 0) {
            gltf.animations.forEach((clip) => {
                const action = mixer!.clipAction(clip);
                action.play();
            });
        }
    });

    const movingUp = { angular: true, java: true, node: true, react: true };

    function animate() {
        requestAnimationFrame(animate);
    
        if (angular) {
            if (movingUp.angular) {
                angular.position.y += 0.01; 
                if (angular.position.y >= 0) { 
                    movingUp.angular = false;
                }
            } else {
                angular.position.y -= 0.01; 
                if (angular.position.y <= -1) { 
                    movingUp.angular= true;
                }
            }
        }    

        if (react) {
            if (movingUp.react) {
                react.position.y += 0.011; 
                if (react.position.y >= -3) { 
                    movingUp.react = false;
                }
            } else {
                react.position.y -= 0.011; 
                if (react.position.y <= -4) { 
                    movingUp.react= true;
                }
            }
        }    

        if (node) {
            if (movingUp.node) {
                node.position.y += 0.01; 
                if (node.position.y >= 3) { 
                    movingUp.node = false;
                }
            } else {
                node.position.y -= 0.01; 
                if (node.position.y <= 2) { 
                    movingUp.node= true;
                }
            }
        }    

        if (java) {
            if (movingUp.java) {
                java.position.y += 0.011; 
                if (java.position.y >= -4) { 
                    movingUp.java = false;
                }
            } else {
                java.position.y -= 0.011; 
                if (java.position.y <= -5) { 
                    movingUp.java= true;
                }
            }
        }    

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        renderer.render(scene, camera);
    }

    animate();

    function resizeRenderer() {
        const container = document.querySelector("#me-3dmodel") as HTMLElement;
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
        const container = document.querySelector("#me-3dmodel");
        if (container) {
            clearInterval(containerObserver);
            resizeRenderer(); 
        }
    }, 100); 

    window.addEventListener("resize", resizeRenderer);
}
