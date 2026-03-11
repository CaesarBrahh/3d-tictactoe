import * as THREE from 'three';

// build board matrix
let board_matrix = [[[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]],
                    [[null, null, null], [null, null, null], [null, null, null]]];

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
    } else if (x == 1.5) {
        map_y = 1;
    } else {
        map_y = 2;
    }
}

// x = -1 --> 0; x = 0 --> 1; x = 1 --> 2


export function changeObject(obj) {
    if (obj) {
        if (player == 'x') {
            obj.geometry.dispose();
            obj.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

            player = 'o';
        } else {
            obj.geometry.dispose();
            obj.geometry = new THREE.ConeGeometry(0.1, 0.1, 32);

            player = 'x';
        }
        
        // if (player == 'x') {
        //     // change ball geometry
        //     obj.geometry.dispose();
        //     obj.geometry = new THREE.ConeGeometry(1, 1, 1);

        //     // change board logic

        //     // switch players
        //     player = 'o';
        // } else {
        //     // change ball geometry
        //     obj.geometry.dispose();
        //     obj.geometry = new THREE.BoxGeometry(1, 1, 1);

        //     // change board logic

        //     // switch players
        //     player = 'x';
        // }
    }
}