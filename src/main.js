/*
- Tower of Hanoi type version
- General 3d version
*/
import * as THREE from 'three';

// initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);