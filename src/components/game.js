/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Board} from './board';
import {ControlPanel} from './control-panel';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: initData(4, 4)};
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    moveUp() {
        let data = this.state.data.slice();
        data = mergeUp(data);
        this.postProcessing(data);
    }

    moveDown() {
        let data = this.state.data.slice();
        data = mergeDown(data);
        this.postProcessing(data);
    }

    moveLeft() {
        let data = this.state.data.slice();
        data = mergeLeft(data);
        this.postProcessing(data);
    }

    moveRight() {
        let data = this.state.data.slice();
        data = mergeRight(data);
        this.postProcessing(data);
    }

    findEmptyCell(data) { // return list of index pairs [[i, j], [m, n]]
        let result = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] === 0) { result.push([i, j]); }
            }
        }
        return result;
    }

    postProcessing(data) {
        let slots = this.findEmptyCell(data);
        if (this.hasChanged(data) && slots.length > 0) {
            this.addTile(slots, data);
        } else {
            // TODO: board is full, check game over

        }
        this.setState({data: data});
    }

    hasChanged(data) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] !== this.state.data[i][j]) { return true; }
            }
        }
        return false;
    }

    addTile(index, data) {
        let [i, j] = index[Math.floor(Math.random() * index.length)];
        data[i][j] = getNewTile();
    }


    render() {
        return (
            <div className="game">
                <Board data={this.state.data}/>
                <ControlPanel moveUp={this.moveUp} moveDown={this.moveDown}
                              moveLeft={this.moveLeft} moveRight={this.moveRight}/>
            </div>);
    }
}

function getNewTile() {
    return Math.random() < 0.9 ? 2 : 4;
}

function initData(rows, columns) {
    const max = rows * columns;
    const x = Math.floor(Math.random() * max);
    let y = Math.floor(Math.random() * max);
    while (x === y) { y = Math.floor(Math.random() * max); }
    let data = [];
    for (let i = 0; i < rows; i++) {
        data.push([]);
        for (let j = 0; j < columns; j++) { data[i].push(0); }
    }
    data[Math.floor(x/rows)][x%columns] = getNewTile();
    data[Math.floor(y/rows)][y%columns] = getNewTile();
    return data;
}

function mergeLeft(data) {
    for (let i = 0; i < data.length; i++) { data[i] = mergeRowLeft(data[i]); }
    return data;
}


function mergeRight(data) {
    reflex(data);
    mergeLeft(data);
    reflex(data);
    return data;
}

function mergeUp(data) {
    let result = rotateLeft(data);
    result = mergeLeft(result);
    result = rotateRight(result);
    return result;
}

function mergeDown(data) {
    let result = rotateRight(data);
    result = mergeLeft(result);
    result = rotateLeft(result);
    return result;
}

function reflex(data) {
    for (let i = 0; i < data.length; i++) {
        let left = 0, right = data[0].length - 1, temp = 0;
        while (left < right) {
            temp = data[i][left];
            data[i][left] = data[i][right];
            data[i][right] = temp;
            left++; right--;
        }
    }
}

function rotateRight(data) {
    let result = [];
    for (let i = 0; i < data[0].length; i++) {
        let row = [];
        for (let j = data.length - 1; j >= 0 ; j--) { row.push(data[j][i]); }
        result.push(row);
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

function mergeRowLeft(row) {
    let nums = row.filter((i) => i !== 0);
    let result = nums.length === 1 ? nums.slice() : [];
    for (let i = 1; i < nums.length;) {
        if (nums[i-1] !== nums[i]) {
            result.push(nums[i-1]);
            if (i === nums.length - 1) { result.push(nums[i]); }
            i++;
        }
        else {
            result.push(nums[i] * 2);
            if (i === nums.length - 2) { result.push(nums[i+1]); }
            i += 2;
        }
    }
    for (let i = result.length; i < row.length; i++) { result.push(0); }
    return result;
}