export function is_winner(bm) {
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

export function mod_board_matrix(x, y, z, player, bm) {
    bm[x][y][z] = player;
}