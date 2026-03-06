import * as THREE from 'three';

// define points for line segments
const points = [
  // first board
  [new THREE.Vector3(-0.5, 1.5, 1), new THREE.Vector3(-0.5, -1.5, 1)],
  [new THREE.Vector3(0.5, 1.5, 1), new THREE.Vector3(0.5, -1.5, 1)],
  [new THREE.Vector3(-1.5, 0.5, 1), new THREE.Vector3(1.5, 0.5, 1)],
  [new THREE.Vector3(-1.5, -0.5, 1), new THREE.Vector3(1.5, -0.5, 1)],

  // second board (z+1)
  [new THREE.Vector3(-0.5, 1.5, 2), new THREE.Vector3(-0.5, -1.5, 2)],
  [new THREE.Vector3(0.5, 1.5, 2), new THREE.Vector3(0.5, -1.5, 2)],
  [new THREE.Vector3(-1.5, 0.5, 2), new THREE.Vector3(1.5, 0.5, 2)],
  [new THREE.Vector3(-1.5, -0.5, 2), new THREE.Vector3(1.5, -0.5, 2)],

  // connections
  [new THREE.Vector3(0.5, 0.5, 3), new THREE.Vector3(0.5, 0.5, 0)],
  [new THREE.Vector3(0.5, -0.5, 3), new THREE.Vector3(0.5, -0.5, 0)],
  [new THREE.Vector3(-0.5, -0.5, 3), new THREE.Vector3(-0.5, -0.5, 0)],
  [new THREE.Vector3(-0.5, 0.5, 3), new THREE.Vector3(-0.5, 0.5, 0)]
];

export function createBoard() {
  // create a group to hold all the lines into one object
  const board = new THREE.Group();

  // iterate through each points
  for (let i in points) {
    // create line segment
    const geometry = new THREE.BufferGeometry().setFromPoints(points[i]);
    const material = new THREE.LineBasicMaterial({ color: 0x800080 });
    const line = new THREE.Line(geometry, material);

    // add line segment
    board.add(line);
  }

  return board;
}
