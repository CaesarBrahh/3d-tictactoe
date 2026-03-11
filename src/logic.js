import * as THREE from 'three';

// build board matrix
let boardMatrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];

// initialize player
let player = 'x';

function isWinner(bm) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // check z-axis
            if (bm[i][j][0] == bm[i][j][1] && bm[i][j][1] == bm[i][j][2] && bm[i][j][0] != null) {
                return true;
            } 
            // check y-axis
            if (bm[i][0][j] == bm[i][1][j] && bm[i][1][j] == bm[i][2][j] && bm[i][0][j] != null) {
                return true;
            }
            // check x-axis
            if (bm[0][i][j] == bm[1][i][j] && bm[1][i][j] == bm[2][i][j] && bm[0][i][j] != null) {
                return true;
            }
        }

        // check face diagonals
        if (bm[0][i][0] == bm[1][i][0] && bm[1][i][0] == bm[2][i][0] && bm[0][i][j] != null) { // top left to bottom right
            return true;
        }
        if (bm[2][i][0] == bm[1][i][0] && bm[1][i][0] == bm[0][i][0] && bm[2][i][0] != null) { // bottom left to top right
            return true;
        }
    }

    // check diagonals across the x
    if (bm[0][0][0] == bm[1][1][1] && bm[1][1][1] == bm[2][2][2] && bm[0][0][0] != null) {
        return true;
    }
    if (bm[0][2][2] == bm[1][1][1] && bm[1][1][1] == bm[2][0][0] && bm[0][2][2] != null) {
        return true;
    }
    if (bm[0][2][0] == bm[1][1][1] && bm[1][1][1] == bm[2][0][2] && bm[0][2][0] != null) {
        return true;
    }
    if (bm[0][0][2] == bm[1][1][1] && bm[1][1][1] == bm[2][2][0] && bm[0][0][2] != null) {
        return true;
    }

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

    if (y == 2.5) {
        map_y = 0;
    } else if (y == 1.5) {
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

export function changeObject(obj) {
    if (obj) {
        // find board position
        const { map_x, map_y, map_z } = map(obj.position.x, obj.position.y, obj.position.z);

        // only make changes if position is open
        if (boardMatrix[map_x][map_y][map_z] == null) {
            // change board matrix
            boardMatrix[map_x][map_y][map_z] = player;

            // change geometry
            obj.geometry.dispose();

            if (player == 'x') {
                obj.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

                // switch players
                player = 'o';
            } else {
                obj.geometry = new THREE.ConeGeometry(0.1, 0.1, 32);

                // switch players
                player = 'x';
            }
            
            // testing
            console.log(boardMatrix);
        }

        // if (player == 'x') {
        //     // find board position

        //     // change board logic

        //     // change geometry
        //     obj.geometry.dispose();
        //     obj.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

        //     // switch players
        //     player = 'o';
        // } else {
        //     // find board position

        //     // change board logic

        //     // change geometry
        //     obj.geometry.dispose();
        //     obj.geometry = new THREE.ConeGeometry(0.1, 0.1, 32);

        //     // switch players
        //     player = 'x';
        // }
    }
}