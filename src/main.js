/*
- create shape clicking to place x's and o's
- create 3d array to actually store the placement of x's and o's 
  - have a game checker function to determine whether there's a winner or loser
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBoard } from './board.js';

// initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  45, // field of view
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
camera.position.set(-1, 2, 2);
orbit.update();

// grid helper
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

// add board
const board = createBoard();
scene.add(board);

// rotate box
function animate(time) {

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);