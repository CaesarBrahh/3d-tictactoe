/*
- have clicks be registered
- have clicks change ball into an x or o
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBoard } from './board.js';
import { is_winner, mod_board_matrix } from './logic.js';

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
camera.position.set(-10, 8, 0);
orbit.update();

// grid helper
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

// add board
const { board, balls } = createBoard();
scene.add(board);

// build board matrix
let board_matrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// game logic
let player = 'x';
let hoveredObject = null;
function animate(time) {
  renderer.render(scene, camera);

  // raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(balls);

  if (intersects.length > 0) {
    const obj = intersects[0].object;

    if (hoveredObject !== obj) {
      // change hoveredObject back to base object
      if (hoveredObject) {
        hoveredObject.material.color.set(0xffffff);
      }

      // change hoveredObject to current object
      hoveredObject = obj;
    } 

    // change color of hovered object
    hoveredObject.material.color.set(0xff0000);
  } else {
    if (hoveredObject) {
      hoveredObject.material.color.set(0xffffff);
    }
  }
}

renderer.setAnimationLoop(animate);

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});