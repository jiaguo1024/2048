/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Tile} from './tile'

export class Cell extends React.Component {
    render() {
        return (
            <div className="cell">
                <Tile info={this.props.tile}/>
            </div>
        );
    }
}