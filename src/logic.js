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
    new THREE.BoxGeometry(0.8, 0.15, 0.15),
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

function issWinner() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // check z-axis
            if (boardMatrix[i][j][0] == boardMatrix[i][j][1] && boardMatrix[i][j][1] == boardMatrix[i][j][2] && boardMatrix[i][j][0] != null) {
                highlightWinner([[i, j, 0], [i, j, 1], [i, j, 2]]);
                return true;
            } 
            // check y-axis
            if (boardMatrix[i][0][j] == boardMatrix[i][1][j] && boardMatrix[i][1][j] == boardMatrix[i][2][j] && boardMatrix[i][0][j] != null) {
                highlightWinner([[i, 0, j], [i, 1, j], [i, 2, j]]);
                return true;
            }
            // check x-axis
            if (boardMatrix[0][i][j] == boardMatrix[1][i][j] && boardMatrix[1][i][j] == boardMatrix[2][i][j] && boardMatrix[0][i][j] != null) {
                highlightWinner([[0, i, j], [1, i, j], [2, i, j]]);
                return true;
            }
        }

        // check front-back diagonals
        if (boardMatrix[0][i][0] == boardMatrix[1][i][0] && boardMatrix[1][i][0] == boardMatrix[2][i][0] && boardMatrix[0][i][0] != null) { // top left to bottom right
            highlightWinner([[0, i, 0], [1, i, 0], [2, i, 0]]);
            return true;
        }
        if (boardMatrix[2][i][0] == boardMatrix[1][i][0] && boardMatrix[1][i][0] == boardMatrix[0][i][0] && boardMatrix[2][i][0] != null) { // bottom left to top right
            highlightWinner([[2, i, 0], [1, i, 0], [0, i, 0]]);
            return true;
        }

        // check top-down diagonals
        if (boardMatrix[i][0][0] == boardMatrix[1][i][1] && boardMatrix[1][i][1] == boardMatrix[2][i][2] && boardMatrix[i][0][0] != null) {
            highlightWinner([[i, 0, 0], [i, 1, 1], [i, 2, 2]]);
            return true;
        }
        if (boardMatrix[i][0][2] == boardMatrix[i][1][1] && boardMatrix[i][1][1] == boardMatrix[0][2][0] && boardMatrix[i][0][2] != null) {
            highlightWinner([[i, 0, 2], [i, 1, 1], [i, 2, 0]]);
            return true;
        }

        // check right-left diagonals
    }

    // check diagonals across the x
    if (boardMatrix[0][0][0] == boardMatrix[1][1][1] && boardMatrix[1][1][1] == boardMatrix[2][2][2] && boardMatrix[0][0][0] != null) {
        highlightWinner([[0, 0, 0], [1, 1, 1], [2, 2, 2]]);
        return true;
    }
    if (boardMatrix[0][2][2] == boardMatrix[1][1][1] && boardMatrix[1][1][1] == boardMatrix[2][0][0] && boardMatrix[0][2][2] != null) {
        highlightWinner([[0, 2, 2], [1, 1, 1], [2, 0, 0]]);
        return true;
    }
    if (boardMatrix[0][2][0] == boardMatrix[1][1][1] && boardMatrix[1][1][1] == boardMatrix[2][0][2] && boardMatrix[0][2][0] != null) {
        highlightWinner([[0, 2, 0], [1, 1, 1], [2, 0, 2]]);
        return true;
    }
    if (boardMatrix[0][0][2] == boardMatrix[1][1][1] && boardMatrix[1][1][1] == boardMatrix[2][2][0] && boardMatrix[0][0][2] != null) {
        highlightWinner([[0, 0, 2], [1, 1, 1], [2, 2, 0]]);
        return true;
    }

    console.log(boardMatrix);
    console.log(pieceMatrix);
    return false;
}

function map(x, y, z) {
    let map_x = null;
    let map_y = null;
    let map_z = null;

    if (x == -1) {
        map_x = 0;
    } else if (x == 0) {
        map_x = 1;
    } else {
        map_x = 2;
    }

    if (y == -1) {
        map_y = 0;
    } else if (y == 0) {
        map_y = 1;
    } else {
        map_y = 2;
    }

    if (z == -1) {
        map_z = 0;
    } else if (z == 0) {
        map_z = 1;
    } else {
        map_z = 2;
    }

    return { map_x, map_y, map_z };
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

export function changeObject(obj, board) {
    if (obj) {
        // find board position
        const { map_x, map_y, map_z } = map(obj.position.x, obj.position.y, obj.position.z);

        // only make changes if position is open
        if (boardMatrix[map_x][map_y][map_z] == null) {
            // change board matrix
            boardMatrix[map_x][map_y][map_z] = player;

            // change geometry
            obj.geometry.dispose();

            // switch players
            let replacementPiece;
            if (player == 'X') {
                replacementPiece = pieces.x.clone();
                replacementPiece.children.forEach(child => {
                    child.material = child.material.clone();
                });               
                player = 'O';
            } else {
                replacementPiece = pieces.o.clone()
                replacementPiece.material = replacementPiece.material.clone();
                player = 'X';
            }

            // replace piece
            replacementPiece.position.copy(obj.position);
            board.remove(obj);
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