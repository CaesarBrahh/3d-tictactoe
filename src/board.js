import * as THREE from 'three';

// define points for line segments
const points = [
  // first board
  [new THREE.Vector3(-0.5, 1, 1.5), new THREE.Vector3(-0.5, 1, -1.5)],
  [new THREE.Vector3(0.5, 1, 1.5), new THREE.Vector3(0.5, 1, -1.5)],
  [new THREE.Vector3(-1.5, 1, 0.5), new THREE.Vector3(1.5, 1, 0.5)],
  [new THREE.Vector3(-1.5, 1, -0.5), new THREE.Vector3(1.5, 1, -0.5)],

  // second board (z+1)
  [new THREE.Vector3(-0.5, 2, 1.5), new THREE.Vector3(-0.5, 2, -1.5)],
  [new THREE.Vector3(0.5, 2, 1.5), new THREE.Vector3(0.5, 2, -1.5)],
  [new THREE.Vector3(-1.5, 2, 0.5), new THREE.Vector3(1.5, 2, 0.5)],
  [new THREE.Vector3(-1.5, 2, -0.5), new THREE.Vector3(1.5, 2, -0.5)],

  // connections
  [new THREE.Vector3(0.5, 3, 0.5), new THREE.Vector3(0.5, 0, 0.5)],
  [new THREE.Vector3(0.5, 3, -0.5), new THREE.Vector3(0.5, 0, -0.5)],
  [new THREE.Vector3(-0.5, 3, -0.5), new THREE.Vector3(-0.5, 0, -0.5)],
  [new THREE.Vector3(-0.5, 3, 0.5), new THREE.Vector3(-0.5, 0, 0.5)]
];

const ball_positions = [
                        // first plane 
                        {x: 1, y: 2.5, z: 1}, {x: 1, y: 2.5, z: 0}, {x: 1, y: 2.5, z: -1},
                        {x: 1, y: 1.5, z: 1}, {x: 1, y: 1.5, z: 0}, {x: 1, y: 1.5, z: -1},
                        {x: 1, y: 0.5, z: 1}, {x: 1, y: 0.5, z: 0}, {x: 1, y: 0.5, z: -1},

                        // second plane 
                        {x: 0, y: 2.5, z: 1}, {x: 0, y: 2.5, z: 0}, {x: 0, y: 2.5, z: -1},
                        {x: 0, y: 1.5, z: 1}, {x: 0, y: 1.5, z: 0}, {x: 0, y: 1.5, z: -1},
                        {x: 0, y: 0.5, z: 1}, {x: 0, y: 0.5, z: 0}, {x: 0, y: 0.5, z: -1},

                        // third plane 
                        {x: -1, y: 2.5, z: 1}, {x: -1, y: 2.5, z: 0}, {x: -1, y: 2.5, z: -1},
                        {x: -1, y: 1.5, z: 1}, {x: -1, y: 1.5, z: 0}, {x: -1, y: 1.5, z: -1},
                        {x: -1, y: 0.5, z: 1}, {x: -1, y: 0.5, z: 0}, {x: -1, y: 0.5, z: -1},
                      ];

function create_balls() {
  const balls = [];

  for (let i = 0; i < 27; i++) {
    const geometry = new THREE.SphereGeometry(0.1, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

    balls.push(new THREE.Mesh(geometry, material));
    balls[i].position.set(ball_positions[i].x, ball_positions[i].y, ball_positions[i].z);
  }

  return balls;
}

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

  let balls = create_balls();
  
  for (let ball of balls) {
    board.add(ball);
  }

  return { board, balls };
}
