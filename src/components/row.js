/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Cell} from './cell'

export class Row extends React.Component {
    render() {
        return (
            <div className="row">
                {this.props.row.map(
                    (element, i) => <Cell value={element} key={i}/>
                )}
            </div>
        )
    }
}