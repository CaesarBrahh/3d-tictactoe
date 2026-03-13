/*
aesthetics arc:
- apply missed isWinner() checks

- add a golden glow around the winning objects
  - "play again" button

- mobile compatability

tower arc:
*/
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createBoard, createStars } from './board.js';
import { changeObject } from './logic.js';

// initialize renderer
const canvas = document.querySelector('#board');
const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas, 
  antialias: true });
const rect = canvas.getBoundingClientRect();
renderer.setSize(rect.width, rect.height, false);

// initialize scene
const scene = new THREE.Scene();

// initialize camera
const camera = new THREE.PerspectiveCamera(
  45, // field of view
  rect.width / rect.height, // aspect ratio
  0.1, // near clipping plane
  100 // far clipping plane
);
camera.updateProjectionMatrix();

// initialize orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
orbit.enableZoom = false;
orbit.enablePan = false;

// move camera
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// add visual elements to scene
scene.background = new THREE.Color(0x0f172a);
const stars = createStars();
scene.add(stars);

// add board
const { board, balls } = createBoard();
scene.add(board);

// initialize raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// gameplay
let hoveredObject = null;
let gameState = true;
function animate(time) {
  renderer.render(scene, camera);

  // rotate stars and board
  stars.rotation.y += 0.0005;

  // raycaster
  if (gameState) {
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
      hoveredObject.material.color.set(0x987ab4);
    } else {
      if (hoveredObject) {
        hoveredObject.material.color.set(0xffffff);
        hoveredObject = null;
      }
    }
  }
}
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setAnimationLoop(animate);

window.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

window.addEventListener('click', () => gameState = changeObject(hoveredObject, board));