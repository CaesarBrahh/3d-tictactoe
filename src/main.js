/*
- fix board position
- add dots at position of board in 3d space
- create shape clicking to place x's and o's
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
const board = createBoard();
scene.add(board);

// build board matrix
let board_matrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];

// game logic
let player = 'x';
function animate(time) {
  renderer.render(scene, camera);

  // player clicks (record x, y, z values)

  // board matrix is modified
  //mod_board_matrix(x, y, z, player, board_matrix);

  // virtual board is modified

  // check for winner
  //is_winner(board_matrix);

  // player is changed
  /*
  if (player == 'x') {
    player = 'o';
  } else {
    player = 'x';
  }
  */
}

renderer.setAnimationLoop(animate);