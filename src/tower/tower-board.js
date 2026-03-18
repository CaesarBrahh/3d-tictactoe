import * as THREE from 'three';

export function createBoard() {
	const board = new THREE.Group();
	let poles = [];

	// create base
	const base = new THREE.Mesh(
		new THREE.BoxGeometry(3, 3, 0.2),
		new THREE.MeshBasicMaterial({ color: 0x8b5a2b })
	);
	base.position.set(0, -1.5, 0);
	base.rotation.x = Math.PI / 2;
	board.add(base);

	// add all poles to base
	for (let x = -1; x < 2; x++) {
		for (let z = -1; z < 2; z++) {
			let pole = createPole();
			pole.position.set(x, 0.1, z);
			poles.push(pole);
			board.add(pole);
		}
	}

	return { board, poles };
}

function createPole() {
	const pole = new THREE.Mesh(
		new THREE.CylinderGeometry(0.08, 0.08, 3, 24),
		new THREE.MeshBasicMaterial({ color: 0xd9d9d9 })
	);

	// pole.position.y = 1.0;

	return pole;
}

export function createStars() {
  const starCount = 10000;
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    let x = (Math.random() - 0.5) * 80;
    let y = (Math.random() - 0.5) * 80;
    let z = (Math.random() - 0.5) * 80;

    while ((x >= -10 && x <= 10) && (y >= -10 && y <= 10) && (z >= -10 && z <= 10)) {
      x = (Math.random() - 0.5) * 80;
      y = (Math.random() - 0.5) * 80;
      z = (Math.random() - 0.5) * 80;
    }

    positions.push(x, y, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08
  });

  return new THREE.Points(geometry, material);
}
