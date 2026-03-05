/*
- Tower of Hanoi type version
- General 3d version
*/
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

// initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  75, // field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

// initialize orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);

// axes helper
const axesHelper = new THREE.AxesHelper(3); // 5 represents length of axis
scene.add(axesHelper);

// move camera
camera.position.set(0, 2, 5);
orbit.update();

// add box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

// rotate box
function animate(time) {
  box.rotation.x = time/1000;
  box.rotation.y = time/1000;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);