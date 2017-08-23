/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {ControlButton} from './control-button';

export class ControlPanel extends React.Component {

    render() {
        return (
            <div className="control-panel">
                <div>
                    <ControlButton value="Up" handleClick={this.props.moveUp}/>
                </div>
                <div>
                    <ControlButton value="Left" handleClick={this.props.moveLeft}/>
                    <ControlButton value="Down" handleClick={this.props.moveDown}/>
                    <ControlButton value="Right" handleClick={this.props.moveRight}/>
                </div>
            </div>
        );
    }
}