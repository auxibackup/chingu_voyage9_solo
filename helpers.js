var init = function _init() {
    data = [];
    currentPlayer = 1;
    displayHeader.style.backgroundImage = `var(--player${currentPlayer}-gradient)`;

    // Initialize grid && data
    for(let i = 0; i < ROW; ++i){
        let rowDiv = document.createElement('div');

        rowDiv.className = 'row'

        data.push([])
        for(let j = 0; j < COL; ++j){
            let coin = document.createElement('div');
            let coinLabel = document.createElement('p');

            coin.className = 'coin';
            coinLabel.className = 'label'

            coin.setAttribute('row_idx', i);
            coin.setAttribute('col_idx', j);
            coinLabel.textContent = `[${i}-${j}]`;

            coin.append(coinLabel);
            rowDiv.append(coin);

            data[i].push(0)
        }
        grid.append(rowDiv);
    }
}

var reset = function _reset() {
    currentPlayer = 1;

    gameoverHeader.style.display = 'none';
    displayHeader.textContent = `Player ${currentPlayer}, please select a coin slot.`;
    displayHeader.style.backgroundImage = `var(--player${currentPlayer}-gradient)`;
    grid.querySelectorAll('.coin').forEach( coin => coin.className = 'coin');

    for(let r = 0; r < ROW; ++r){
        for(let c = 0; c < COL; ++c){
            data[r][c] = 0;
        }
    }
}

var checkHorizontal = function _checkHorizontal(board, player){
    for(let r = 0; r < ROW; ++r){
        for(let c = 0; c < COL-3; ++c){
            if(board[r][c] === player && 
                board[r][c+1] === player && 
                    board[r][c+2] === player && 
                        board[r][c+3] === player)
                            return true;
        }
    }
    return false;
}
var checkVertical = function _checkVertical(board, player){
    for(let c = 0; c < COL; ++c){
        for(let r = 0; r < ROW-3; ++r){
            if(board[r][c] === player && 
                board[r+1][c] === player && 
                    board[r+2][c] === player && 
                        board[r+3][c] === player)
                            return true;
        }
    }
}

var checkDiagonalForward = function _checkDiagonal(board, player){
    for(let c = 0; c < COL-3; ++c){
        for(let r = 0; r < ROW-3; ++r){
            if(board[r][c] === player &&
                board[r+1][c+1] === player && 
                    board[r+2][c+2] === player && 
                        board[r+3][c+3] === player)
                            return true;
        }
    }
    return false;
}
var checkDiagonalReverse = function _checkDiagonalReverse(board, player){
    for(let c = 0; c < COL-3; ++c){
        for(let r = 3; r < ROW; ++r){
            if(board[r][c] === player &&
                board[r-1][c+1] === player && 
                    board[r-2][c+2] === player && 
                        board[r-3][c+3] === player)
                            return true;
        }
    }
}


var isWinningPiece = function _isWinningPiece(board, player)
{
    if(checkHorizontal(board, player) || 
        checkVertical(board, player) || 
            checkDiagonalForward(board, player) || 
                checkDiagonalReverse(board, player))
                    return true;

    return false;
}
