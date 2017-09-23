/**
 * Created by Jia on 2017/9/23.
 */
import React from 'react';

class Message extends React.Component {
    render() {
        let message;
        if (this.props.gameOver) {
            message = "Game Over";
        }
        return (
            <div className="message">{message}</div>
        );
    }
}

export default Message;