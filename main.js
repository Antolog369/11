import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 100000);
camera.position.set(-1069,248,-1324);
camera.quaternion.setFromEuler(new THREE.Euler(-1.66, -0.46, -1.77));

// scene
const scene = new THREE.Scene();

// spline scene
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/hHEyEP6c92Nucp5s/scene.splinecode',
  (splineScene) => {
    splineScene.scale.set(1.5,1.5,1.5)
    scene.add(splineScene);
  }
);


// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// scene settings
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
scene.background = new THREE.Color('#33333');
renderer.setClearAlpha(1);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.125;

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
  
}
