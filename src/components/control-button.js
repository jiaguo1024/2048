/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';

export class ControlButton extends React.Component {
    render() {
        return <button onClick={() => this.props.handleClick()}>{this.props.value}</button>;
    }
}