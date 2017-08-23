/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';

export class Tile extends React.Component {
    render() {
        return (
            <div className={"tile tile-" + this.props.value}>
                {this.props.value}
            </div>
        );
    }
}