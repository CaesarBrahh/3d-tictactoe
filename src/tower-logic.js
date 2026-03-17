import * as THREE from 'three';

// build board matrix
let boardMatrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];

// build piece matrix
let pieceMatrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];                 

// initialize player
let player = 'X';
document.getElementById("player").className = "player-x";

// build o and x pieces
const pieces = {};

// O piece
pieces.o = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.12, 16, 100), 
    new THREE.MeshBasicMaterial({ color: 0x008000 })
);
pieces.o_geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 100);

// X piece
const bar1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.16, 0.16),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
bar1.rotation.z = Math.PI / 4;

const bar2 = bar1.clone();
bar2.rotation.z = -Math.PI / 4;

const xPiece = new THREE.Group();
xPiece.add(bar1);
xPiece.add(bar2);

pieces.x = xPiece;

// define winning lines
const winningLines = [
  // x-axis
  [{x:0,y:0,z:0},{x:1,y:0,z:0},{x:2,y:0,z:0}],
  [{x:0,y:0,z:1},{x:1,y:0,z:1},{x:2,y:0,z:1}],
  [{x:0,y:0,z:2},{x:1,y:0,z:2},{x:2,y:0,z:2}],
  [{x:0,y:1,z:0},{x:1,y:1,z:0},{x:2,y:1,z:0}],
  [{x:0,y:1,z:1},{x:1,y:1,z:1},{x:2,y:1,z:1}],
  [{x:0,y:1,z:2},{x:1,y:1,z:2},{x:2,y:1,z:2}],
  [{x:0,y:2,z:0},{x:1,y:2,z:0},{x:2,y:2,z:0}],
  [{x:0,y:2,z:1},{x:1,y:2,z:1},{x:2,y:2,z:1}],
  [{x:0,y:2,z:2},{x:1,y:2,z:2},{x:2,y:2,z:2}],

  // y-axis
  [{x:0,y:0,z:0},{x:0,y:1,z:0},{x:0,y:2,z:0}],
  [{x:0,y:0,z:1},{x:0,y:1,z:1},{x:0,y:2,z:1}],
  [{x:0,y:0,z:2},{x:0,y:1,z:2},{x:0,y:2,z:2}],
  [{x:1,y:0,z:0},{x:1,y:1,z:0},{x:1,y:2,z:0}],
  [{x:1,y:0,z:1},{x:1,y:1,z:1},{x:1,y:2,z:1}],
  [{x:1,y:0,z:2},{x:1,y:1,z:2},{x:1,y:2,z:2}],
  [{x:2,y:0,z:0},{x:2,y:1,z:0},{x:2,y:2,z:0}],
  [{x:2,y:0,z:1},{x:2,y:1,z:1},{x:2,y:2,z:1}],
  [{x:2,y:0,z:2},{x:2,y:1,z:2},{x:2,y:2,z:2}],

  // z-axis
  [{x:0,y:0,z:0},{x:0,y:0,z:1},{x:0,y:0,z:2}],
  [{x:0,y:1,z:0},{x:0,y:1,z:1},{x:0,y:1,z:2}],
  [{x:0,y:2,z:0},{x:0,y:2,z:1},{x:0,y:2,z:2}],
  [{x:1,y:0,z:0},{x:1,y:0,z:1},{x:1,y:0,z:2}],
  [{x:1,y:1,z:0},{x:1,y:1,z:1},{x:1,y:1,z:2}],
  [{x:1,y:2,z:0},{x:1,y:2,z:1},{x:1,y:2,z:2}],
  [{x:2,y:0,z:0},{x:2,y:0,z:1},{x:2,y:0,z:2}],
  [{x:2,y:1,z:0},{x:2,y:1,z:1},{x:2,y:1,z:2}],
  [{x:2,y:2,z:0},{x:2,y:2,z:1},{x:2,y:2,z:2}],

  // diagonals in xy planes
  [{x:0,y:0,z:0},{x:1,y:1,z:0},{x:2,y:2,z:0}],
  [{x:0,y:2,z:0},{x:1,y:1,z:0},{x:2,y:0,z:0}],
  [{x:0,y:0,z:1},{x:1,y:1,z:1},{x:2,y:2,z:1}],
  [{x:0,y:2,z:1},{x:1,y:1,z:1},{x:2,y:0,z:1}],
  [{x:0,y:0,z:2},{x:1,y:1,z:2},{x:2,y:2,z:2}],
  [{x:0,y:2,z:2},{x:1,y:1,z:2},{x:2,y:0,z:2}],

  // diagonals in xz planes
  [{x:0,y:0,z:0},{x:1,y:0,z:1},{x:2,y:0,z:2}],
  [{x:0,y:0,z:2},{x:1,y:0,z:1},{x:2,y:0,z:0}],
  [{x:0,y:1,z:0},{x:1,y:1,z:1},{x:2,y:1,z:2}],
  [{x:0,y:1,z:2},{x:1,y:1,z:1},{x:2,y:1,z:0}],
  [{x:0,y:2,z:0},{x:1,y:2,z:1},{x:2,y:2,z:2}],
  [{x:0,y:2,z:2},{x:1,y:2,z:1},{x:2,y:2,z:0}],

  // diagonals in yz planes
  [{x:0,y:0,z:0},{x:0,y:1,z:1},{x:0,y:2,z:2}],
  [{x:0,y:0,z:2},{x:0,y:1,z:1},{x:0,y:2,z:0}],
  [{x:1,y:0,z:0},{x:1,y:1,z:1},{x:1,y:2,z:2}],
  [{x:1,y:0,z:2},{x:1,y:1,z:1},{x:1,y:2,z:0}],
  [{x:2,y:0,z:0},{x:2,y:1,z:1},{x:2,y:2,z:2}],
  [{x:2,y:0,z:2},{x:2,y:1,z:1},{x:2,y:2,z:0}],

  // space diagonals
  [{x:0,y:0,z:0},{x:1,y:1,z:1},{x:2,y:2,z:2}],
  [{x:0,y:0,z:2},{x:1,y:1,z:1},{x:2,y:2,z:0}],
  [{x:0,y:2,z:0},{x:1,y:1,z:1},{x:2,y:0,z:2}],
  [{x:0,y:2,z:2},{x:1,y:1,z:1},{x:2,y:0,z:0}]
];

function highlightWinner(pieces) {
    if (pieceMatrix[pieces[0][0]][pieces[0][1]][pieces[0][2]].isGroup) {
        // first piece
        pieceMatrix[pieces[0][0]][pieces[0][1]][pieces[0][2]].children.forEach(child => {
            child.material.color.set(0xffe535);
        });

        // second piece
        pieceMatrix[pieces[1][0]][pieces[1][1]][pieces[1][2]].children.forEach(child => {
            child.material.color.set(0xffe535);
        });

        // third piece
        pieceMatrix[pieces[2][0]][pieces[2][1]][pieces[2][2]].children.forEach(child => {
            child.material.color.set(0xffe535);
        });
    } else {
        // first piece
        pieceMatrix[pieces[0][0]][pieces[0][1]][pieces[0][2]].material.color.set(0xffe535);

        // // second piece
        pieceMatrix[pieces[1][0]][pieces[1][1]][pieces[1][2]].material.color.set(0xffe535);

        // // third piece
        pieceMatrix[pieces[2][0]][pieces[2][1]][pieces[2][2]].material.color.set(0xffe535);
    }
}

function isWinner() {
    for (let points of winningLines) {
        if (boardMatrix[points[0].x][points[0].y][points[0].z] == boardMatrix[points[1].x][points[1].y][points[1].z] && boardMatrix[points[1].x][points[1].y][points[1].z] == boardMatrix[points[2].x][points[2].y][points[2].z] && boardMatrix[points[0].x][points[0].y][points[0].z] != null) {
            highlightWinner([[points[0].x, points[0].y, points[0].z], [points[1].x, points[1].y, points[1].z], [points[2].x, points[2].y, points[2].z]]);
            return true;
        }
    }
}

function map(x, z) {
    let map_x = null;
    let map_z = null;

    if (x === -1) {
        map_x = 0;
    } else if (x === 0) {
        map_x = 1;
    } else {
        map_x = 2;
    }

    if (z === -1) {
        map_z = 0;
    } else if (z === 0) {
        map_z = 1;
    } else {
        map_z = 2;
    }

    return { map_x, map_z };
}

function updatePlayerUI(player) {
    let playerSpan = document.getElementById("player");

    playerSpan.textContent = player;

    if (player == "X") {
        playerSpan.className = "player-x";
    } else {
        playerSpan.className = "player-o";
    }
}

function unmap(y) {
    if (y === 0) {
        return -1;
    } else if (y === 1) {
        return 0;
    } else {
        return 1;
    }
}

export function changeObject(obj, board) {
    if (obj) {
        // known positions
        const { map_x, map_z } = map(obj.position.x, obj.position.z);
        let map_y = null;
        console.log("world:", obj.position.x, obj.position.z);
        console.log("mapped:", map_x, map_z);

        // loop through that object to find lowest y, else do nothing
        for (let y = 0; y < 3; y++) {
            if (boardMatrix[map_x][y][map_z] == null) {
                // set y
                map_y = y;
                break;
            }
        }

        if (map_y != null) {
            //change board matrix
            boardMatrix[map_x][map_y][map_z] = player;

            let replacementPiece;
            // change players
            if (player == 'X') {
                player = 'O';

                // add geometry
                replacementPiece = pieces.x.clone();
                replacementPiece.children.forEach(child => {
                    child.material = child.material.clone();
                }); 
            } else {
                player = 'X';

                // add geometry
                replacementPiece = pieces.o.clone();
                replacementPiece.material = replacementPiece.material.clone();
            }

            // replace piece
            replacementPiece.position.set(obj.position.x, unmap(map_y), obj.position.z);
            board.add(replacementPiece); 
            pieceMatrix[map_x][map_y][map_z] = replacementPiece;

            // modify on-screen player display
            updatePlayerUI(player);
        }
    }

    // check if winner
    return !isWinner();
}

// restart
document.getElementById("butt").addEventListener("click", () => {
  location.reload();
});