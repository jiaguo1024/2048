/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import Board from './board';
import {TileInfo} from './tile';
import InputHandler from '../inputHandler';
import Dashboard from './dashboard';
import Message from './message';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
        this.move = this.move.bind(this);
        this.restart = this.restart.bind(this);
        this.inputHandler = new InputHandler(this.move);
    }

    componentDidMount() {
        this.inputHandler.registerListeners(document.getElementsByClassName("board")[0]);
    }

    componentWillUnmount() {
        this.inputHandler.removeListeners(document.getElementsByClassName("board")[0]);
    }

    getInitState(restart) {
        let state = {
            data: initData(4, 4),
            score: 0,
            gameOver: false
        };
        if (restart) return state;
        let cache = localStorage.getItem("state");
        if (cache) {
            cache = JSON.parse(cache);
            setDataAsNew(cache.data);
            return cache;
        }
        return state;
    }

    move(direction) {
        let data = this.state.data.slice();
        let moveInfo = new MoveInfo();
        data = merge(data, direction, moveInfo);
        if (!moveInfo.moved) return;
        let gameOver = false;
        let movable = true;
        let slots = findEmptyCell(data);
        if (slots.length > 0) addTile(slots, data);
        if (slots.length <= 1) {
            movable = checkMovable(data);
        }
        if (!movable) {
            gameOver = true;
        }
        this.setState({
            data: data,
            score: this.state.score + moveInfo.score,
            gameOver: gameOver
        });
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    restart() {
        this.setState(this.getInitState(true));
    }

    render() {
        return (
            <div className="game">
                <Dashboard score={this.state.score} gameOver={this.state.gameOver} restart={this.restart}/>
                <Message gameOver={this.state.gameOver}/>
                <Board data={this.state.data}/>
            </div>);
    }
}

function findEmptyCell(data) { // return list of index pairs [[i, j], [m, n]]
    let result = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (data[i][j].value === 0) { result.push([i, j]); }
        }
    }
    return result;
}

// precondition: all cells are full, no zeros
function checkMovable(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (i > 0 && data[i][j].value === data[i-1][j].value) {
                return true;
            }
            if (j > 0 && data[i][j].value === data[i][j-1].value) {
                return true;
            }
        }
    }
    return false;
}

function addTile(index, data) {
    let [i, j] = index[Math.floor(Math.random() * index.length)];
    addNewTile(data, i, j);
}

function addNewTile(data, row, column) {
    return data[row][column] = new TileInfo(Math.random() < 0.9 ? 2 : 4, row, column);
}

function initData(rows, columns) {
    const max = rows * columns;
    const x = Math.floor(Math.random() * max);
    let y = Math.floor(Math.random() * max);
    while (x === y) { y = Math.floor(Math.random() * max); }
    let data = [];
    for (let i = 0; i < rows; i++) {
        data.push([]);
        for (let j = 0; j < columns; j++) {
            data[i].push(new TileInfo(0, i, j));
        }
    }
    addNewTile(data, Math.floor(x/rows), x%columns);
    addNewTile(data, Math.floor(y/rows), y%columns);
    return data;
}

function setDataAsNew(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            data[i][j].new = true;
            data[i][j].rowFrom = -1;
            data[i][j].columnFrom = -1;
        }
    }
    return data;
}

function merge(data, direction, moveInfo) {
    // direction: 0-left, 1-up, 2-right, 3-down
    let result = data;
    for (let i = 0; i < direction; i++) {
        result = rotateLeft(result);
    }
    mergeLeft(result, moveInfo);
    for (let i = direction; i < 4; i++) {
        result = rotateLeft(result);
    }
    return result;
}

function rotateLeft(data) {
    let result = [];
    for (let i = data[0].length - 1; i >= 0; i--) {
        let row = [];
        for (let j = 0; j < data.length; j++) { row.push(data[j][i]); }
        result.push(row);
    }
    return result;
}

function mergeLeft(data, moveInfo) {
    for (let i = 0; i < data.length; i++) {
        mergeRowLeft(data[i], moveInfo);
    }
}

// merge left one row in place, only modify attributes, no swapping/new/remove object
function mergeRowLeft(row, moveInfo) {
    for (let i = 0; i < row.length; i++) {
        TileInfo.clear(row[i]);
        if (row[i].value === 0) continue;
        let j = i - 1;
        while (j >= 0 && row[j].value === 0) { // stop if reach bound or reach a tile
            j--;
        }
        if (j === -1) { // reached bound, safe to move to left most slot
            if (i === 0) continue;
            row[0].value = row[i].value;
            row[0].rowFrom = row[i].row;
            row[0].columnFrom = row[i].column;
            row[i].value = 0;
            moveInfo.moved = true;
        }
        else { // reached a tile
            // merge
            if (row[j].value === row[i].value && !row[j].merged) {
                // score += row[j].value;
                row[j].value += row[i].value;
                row[j].merged = true;
                row[j].rowFrom = row[i].row;
                row[j].columnFrom = row[i].column;
                row[i].value = 0;
                moveInfo.score += row[j].value;
                moveInfo.moved = true;
            } else {
                if (j++ !== i - 1) { // move to j
                    row[j].value = row[i].value;
                    row[j].rowFrom = row[i].row;
                    row[j].columnFrom = row[i].column;
                    row[i].value = 0;
                    moveInfo.moved = true;
                }
            }
        }
    }
}

class MoveInfo {
    constructor() {
        this.score = 0;
        this.moved = false;
    }
}

export default Game;