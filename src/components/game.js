/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Board} from './board';
import {ControlPanel} from './control-panel';
import {TileInfo} from './tile';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: initData(4, 4)};
        this.move = this.move.bind(this);
    }

    move(direction) {
        let data = this.state.data.slice();
        data = merge(data, direction);
        this.postProcessing(data);
    }

    findEmptyCell(data) { // return list of index pairs [[i, j], [m, n]]
        let result = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j].value === 0) { result.push([i, j]); }
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
        addNewTile(data, i, j);
    }

    render() {
        return (
            <div className="game">
                <Board data={this.state.data}/>
                <ControlPanel move={this.move}/>
            </div>);
    }
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

function merge(data, direction) {
    // direction: 0-left, 1-up, 2-right, 3-down
    let result = data;
    for (let i = 0; i < direction; i++) {
        result = rotateLeft(result);
    }
    mergeLeft(result);
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

function mergeLeft(data) {
    for (let i = 0; i < data.length; i++) { mergeRowLeft(data[i]); }
}

function mergeRowLeft(row) {
    for (let i = 0; i < row.length; i++) {
        row[i].clear();
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
            } else {
                if (j++ !== i - 1) { // move to j
                    row[j].value = row[i].value;
                    row[j].rowFrom = row[i].row;
                    row[j].columnFrom = row[i].column;
                    row[i].value = 0;
                }
            }
        }
    }
}