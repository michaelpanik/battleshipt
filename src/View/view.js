import { STATUS_CODE } from '../helpers'

/**
 * View class interacts with DOM
 * 
 * @access public
 */
export default class View {
    /**
     * Constructs a View instance
     */
    constructor() {
        this.app = document.getElementById('app')
    }

    /**
     * Renders a Board to the DOM
     * 
     * @param {Board} board Board to render in the DOM
     */
    drawBoard(board) {
        if (!this.boardExists(board.name)) {
            this.app.innerHTML += `<div class="board" id="${board.name}"></div>`
        }

        const tiles = board.tiles.map(row => {
            return row.map(tile => {
                const className = typeof tile === 'object' ? 'tile--ship' : ''
                return `<div class="tile ${className}"></div>`
            }).join('')
        }).join('')
        
        document.getElementById(board.name).innerHTML = tiles
    }

    updateBoard(board) {
        const boardNode = document.getElementById(board.name),
              tileNodes = boardNode.childNodes

        board.tiles.forEach((row, ri) => {
            row.forEach((tile, ti) => {
                if (typeof tile === 'object') {
                    tileNodes[(ri*10)+ti].classList.add('tile--ship')
                    // console.log()
                }
            })
        })
    }

    /**
     * Checks to see if a board object exists in the DOM
     * 
     * @param {number} boardId pseudo-UUID of the Board to look for
     * 
     * @returns {boolean} Does the board exist?
     */
    boardExists(boardId) {
        return document.getElementById(boardId) !== null ? true : false
    }

    /**
     * Sets which board object is active
     * 
     * @param {number} boardIndex Index of the board to make active
     */
    setActiveBoard(boardIndex) {
        const boards = document.querySelectorAll('.board')

        boards.forEach(e => {
            e.classList.remove('board--active')
        })

        boards[boardIndex].classList.add('board--active')
    }

    /**
     * Adds a class to a tile DOM node
     * 
     * @param {number} status status code to set the tile class based on
     * @param {DOMNode} tile DOM node of the tile to update
     */
    setTileClass(status, tile) {
        switch (status) {
            case STATUS_CODE.hit:
            case STATUS_CODE.sunk:
            case STATUS_CODE.gameover:
                tile.classList.add('tile--hit')
                break;
            
            case STATUS_CODE.miss:
                tile.classList.add('tile--miss')
                break;
            
            case STATUS_CODE.ship:
                tile.classList.add('tile--ship')
                break;
        
            default:
                break;
        }
    }
}