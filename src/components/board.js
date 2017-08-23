/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Row} from './row'

export class Board extends React.Component {
    render() {
        return (
            <div className="board">
                {this.props.data.map(
                    (row, i) => <Row row={row} key={i}/>
                )}
            </div>
        )
    }
}