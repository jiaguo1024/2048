/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';

export class Tile extends React.Component {

    render() {
        let info = this.props.info;
        let classes = [];
        if (info.value !== 0) {
            classes.push("tile tile-" + info.value + " row-" + info.row + "-column-" + info.column);
            if (info.new) {
                classes.push("new");
            }
            if (info.merged) {
                classes.push("merged");
            }
            if (info.mergeHelper) {
                classes.push("merge-helper");
            }
        }
        if (info.rowFrom !== -1 && !info.merged) {
            if (info.rowFrom !== info.row)
                classes.push("from-row-" + info.rowFrom + "-to-" + info.row);
            if (info.columnFrom !== info.column)
                classes.push("from-column-" + info.columnFrom + "-to-" + info.column);
        }
        return (
            <span className={classes.join(" ")}>
                {this.props.info.value !== 0 ? this.props.info.value : ''}
            </span>
        );
    }
}

export class TileInfo {
    constructor(value, row, column) {
        this.value = value || 0;
        this.row = row === 0 ? 0 : row || -1;
        this.column = column === 0 ? 0 : column || -1;
        this.rowFrom = -1;
        this.columnFrom = -1;
        this.new = true;
        this.merged = false;
        this.mergeHelper = false;
    }

    static copy(other) {
        let result = new TileInfo(other.value, other.row, other.column);
        result.rowFrom = other.rowFrom;
        result.columnFrom = other.columnFrom;
        result.new = other.new;
        result.merged = other.merged;
        return result;
    }

    static clear(tile) {
        tile.rowFrom = -1;
        tile.columnFrom = -1;
        tile.new = false;
        tile.merged = false;
    }
}
