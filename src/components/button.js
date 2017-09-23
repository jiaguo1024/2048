/**
 * Created by Jia on 2017/8/22.
 */
import React from 'react';

class Button extends React.Component {
    render() {
        return (
            <button className={this.props.className} onClick={this.props.handleClick}>
                {this.props.text}
            </button>
        );
    }
}

export default Button;