/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';
import {Button} from './button';

export class ControlPanel extends React.Component {

    render() {
        return (
            <div className="control-panel">
                <div>
                    <Button value="Up" direction={1} handleClick={this.props.move}/>
                </div>
                <div>
                    <Button value="Left" direction={0} handleClick={this.props.move}/>
                    <Button value="Down" direction={3} handleClick={this.props.move}/>
                    <Button value="Right" direction={2} handleClick={this.props.move}/>
                </div>
            </div>
        );
    }
}