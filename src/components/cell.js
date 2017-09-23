/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Tile} from './tile';
import {TileInfo} from './tile';

export class Cell extends React.Component {
    render() {
        let tiles = [this.props.tile];
        if (this.props.tile.merged) {
            let helper = TileInfo.copy(this.props.tile);
            helper.value /= 2;
            helper.mergeHelper = true;
            helper.merged = false;
            tiles.push(helper);
        }
        return (
            <div className="cell">
                {tiles.map(
                    (tile, i) => <Tile info={tile} key={i}/>
                )}
            </div>
        );
    }
}