/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import Cell from './cell'

class Row extends React.Component {
    render() {
        return (
            <div className="row">
                {this.props.row.map(
                    (tile, i) => <Cell tile={tile} key={i}/>
                )}
            </div>
        )
    }
}

export default Row;